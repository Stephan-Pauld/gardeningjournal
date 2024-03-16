import { Dayjs } from "dayjs";
import { PlantCard } from "../cards/PlantCard";
import { useState } from "react";
import { NewPlantModal } from "../modals/plants/NewPlantModal";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_PLANT_TO_SEASON, EDIT_PLANT } from "../../graphQL/mutations";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PlantDetailsModal } from "../modals/plants/PlantDetailsModal";
import { EditPlantModal } from "../modals/plants/EditPlantModal";

interface Plant {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
}
type CurrentPlantData = {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
};
type PlantView = {
  currentPlant: CurrentPlantData;
  isEditing: boolean;
  isOpen: boolean;
};
interface PlantPageProps {
  plants: Plant[] | undefined;
}

export const PlantPage = ({
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
        updateSeasonData(data);
      });
    },
  });
  const [updatePlant] = useMutation(EDIT_PLANT, {
    onCompleted: () => {
      refetch().then(({ data }) => {
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

  const editPlant = async (data: FieldValues) => {
    try {
      const plantUpdatePromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await updatePlant({
              variables: {
                updatePlantId: data.id,
                name: data.name,
                variety: data.variety,
                plantingDate: data.plantingDate,
                harvestDate: data.harvestDate,
              },
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // Fake Delay for dev, might keep..
      });

      await toast.promise(plantUpdatePromise, {
        pending: "Updating plant...🌱",
        success: "Plant successfully updated 🪴",
        error: "Failed to update plant 😞",
      });
      reset();
      setPlantView({ ...plantView, isOpen: false, isEditing: false });
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
      setPlantView({ ...plantView, isOpen: false, isEditing: false });
    }
  };

  const handlePlantSelect = (plant: CurrentPlantData) => {
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

  const handlePlantDates = (plantOrHarvest: string, date: Dayjs | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (plantOrHarvest === "plantDate") {
      setValue("plantingDate", formattedDate);
    }
    if (plantOrHarvest === "harvestDate") {
      setValue("harvestDate", formattedDate);
    }
  };

  function handlePlantModalClose() {
    setPlantView({ ...plantView, isOpen: false, isEditing: false });
  }

  const handleIsEditingPlant = () => {
    setPlantView({ ...plantView, isEditing: true, isOpen: false });
  };

  return (
    <>
      <div className="flex justify-between p-[10px] w-fit">
        <button
          onClick={() => setCreatingNewPlant(true)}
          className="rounded-md text-sm font-medium border
        border-input bg-background hover:bg-accent hover:text-accent-foreground
        h-10 px-4 py-2 "
        >
          Add New Plant
        </button>
      </div>
      <PlantCard plants={plants} handlePlantSelect={handlePlantSelect} />
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
      <PlantDetailsModal
        isOpen={plantView.isOpen}
        onClose={handlePlantModalClose}
        currentPlant={plantView.currentPlant}
        handleEditPlant={handleIsEditingPlant}
      />
      <EditPlantModal
        register={register}
        handleSubmit={handleSubmit}
        editPlant={editPlant}
        isEditing={plantView.isEditing}
        onClose={handlePlantModalClose}
        currentPlant={plantView.currentPlant}
        handlePlantDates={handlePlantDates}
      />
    </>
  );
};
