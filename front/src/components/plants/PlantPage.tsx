import { Dayjs } from "dayjs";
import { PlantCard } from "../cards/PlantCard";
import { useState } from "react";
import { NewPlantModal } from "../modals/plants/NewPlantModal";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_PLANT_TO_SEASON } from "../../graphQL/mutations";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Plant {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
}

interface PlantPageProps {
  plantCount: number | undefined;
  plants: Plant[] | undefined;
}

export const PlantPage = ({
  plantCount,
  plants,
  refetch,
  updateSeasonData,
}: PlantPageProps) => {
  const { id } = useParams();
  const [creatingNewPlant, setCreatingNewPlant] = useState(false);
  const [plantView, setPlantView] = useState<PlantView>({
    currentPlant: {
      harvestDate: null,
      id: "",
      name: "",
      plantingDate: null,
      variety: "",
    },
    isEditing: false,
    isOpen: false,
  });

  const [addPlantToSeason] = useMutation(ADD_PLANT_TO_SEASON, {
    onCompleted: () => {
      setCreatingNewPlant(false);
      refetch().then(({ data }) => {
        // setAllSeasonData(data.getSeasonById);
        updateSeasonData(data);
      });
    },
  });

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: {},
  });

  const addNewPlant = async (data: FieldValues) => {
    try {
      // had a brutal time dealing with the promise for the toast...
      const plantPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await addPlantToSeason({
              variables: {
                seasonId: id,
                name: data.plantName,
                variety: data.variety,
              },
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // Fake Delay for dev, might keep..
      });

      await toast.promise(plantPromise, {
        pending: "Adding plant...🌱",
        success: "Plant added successfully 🪴",
        error: "Failed to add plant 😞",
      });

      reset();
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
    }
  };

  // const handleNewPlantClose = () => {
  //   setPlantView({ ...plantView, isOpen: false });
  // };

  const handlePlantSelect = (plant: CurrentPlantData) => {
    console.log("selecting", plant);
    setPlantView({ ...plantView, currentPlant: { ...plant }, isOpen: true });

    setValue("variety", plant.variety);
    setValue("name", plant.name);
    setValue("id", plant.id);

    //Sometimes our planting date will be null so we need to make it into a string to matter what
    setValue(
      "plantingDate",
      plant.plantingDate ? plant.plantingDate.toString() : ""
    );
    setValue(
      "harvestDate",
      plant.harvestDate ? plant.harvestDate.toString() : ""
    );
  };

  return (
    <>
      <div className="flex justify-between p-[10px] w-fit">
        <h2 className="text-2xl font-bold text-left mr-[30px]">My Plants</h2>
        <button
          onClick={() => setCreatingNewPlant(true)}
          className="rounded-md text-sm font-medium border
        border-input bg-background hover:bg-accent hover:text-accent-foreground
        h-10 px-4 py-2 "
        >
          Add New Plant
        </button>
      </div>
      {/* {plantCount ? ( */}
      <PlantCard
        plants={plants}
        handlePlantSelect={handlePlantSelect}
        // setCreatingNewPlant={setCreatingNewPlant}
      />
      {/* ) : (
          <EditButton text="Add New Plant" setState={setCreatingNewPlant} />
        )} */}

      <NewPlantModal
        register={register}
        handleSubmit={handleSubmit}
        addNewPlant={addNewPlant}
        isOpen={creatingNewPlant}
        handleNewPlantClose={setCreatingNewPlant}
      />
    </>
  );
};
