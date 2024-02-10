import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PlantCard } from "./cards/PlantCard.tsx";
import { NewPlantModal } from "./modals/plants/NewPlantModal.tsx";
import { EditPlantModal } from "./modals/plants/EditPlantModal.tsx";
import { PlantDetailsModal } from "./modals/plants/PlantDetailsModal.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GET_SEASON_BY_ID = gql`
  query Query($getSeasonById: ID!) {
    getSeasonById(id: $getSeasonById) {
      name
      notes
      seasonEndDate
      seasonStartDate
      plants {
        harvestDate
        id
        name
        plantingDate
        variety
      }
    }
  }
`;

const ADD_PLANT_TO_SEASON = gql`
  mutation Mutation($seasonId: ID!, $name: String!, $variety: String) {
    addPlantToSeason(seasonId: $seasonId, name: $name, variety: $variety) {
      id
    }
  }
`;

const EDIT_PLANT = gql`
  mutation Mutation(
    $updatePlantId: ID!
    $name: String
    $variety: String
    $plantingDate: String
    $harvestDate: String
  ) {
    updatePlant(
      id: $updatePlantId
      name: $name
      variety: $variety
      plantingDate: $plantingDate
      harvestDate: $harvestDate
    ) {
      id
    }
  }
`;

type AllSeasonData = {
  name: string;
  notes: string[];
  plants: [];
  seasonEndDate: string;
  seasonStartDate: string;
};

type CurrentPlantData = {
  harvestDate: string;
  id: string;
  name: string;
  plantingDate: string;
  variety: string;
};

type PlantView = {
  currentPlant: CurrentPlantData;
  isEditing: boolean;
  isOpen: boolean;
};

export const SeasonPage = () => {
  const { id } = useParams();
  const [allSeasonData, setAllSeasonData] = useState<AllSeasonData>();
  const [creatingNewPlant, setCreatingNewPlant] = useState<boolean>(false);
  const [plantView, setPlantView] = useState<PlantView>({
    currentPlant: {
      harvestDate: "",
      id: "",
      name: "",
      plantingDate: "",
      variety: "",
    },
    isEditing: false,
    isOpen: false,
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      id: "",
      harvestDate: "",
      name: "",
      plantingDate: "",
      variety: "",
    },
  });

  const { loading: seasonLoading, refetch } = useQuery(GET_SEASON_BY_ID, {
    variables: {
      getSeasonById: id,
    },
    onCompleted: (data) => {
      setAllSeasonData(data.getSeasonById);
    },
  });

  const [updatePlant] = useMutation(EDIT_PLANT, {
    onCompleted: () => {
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
        plantModalClose();
      });
    },
  });

  const [addPlantToSeason] = useMutation(ADD_PLANT_TO_SEASON, {
    onCompleted: () => {
      setCreatingNewPlant(false);
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
      });
    },
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

      // had a brutal time dealing with the promise for the toast...
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

      // had a brutal time dealing with the promise for the toast...
      await toast.promise(plantUpdatePromise, {
        pending: "Updating plant...🌱",
        success: "Plant successfully updated 🪴",
        error: "Failed to update plant 😞",
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const handleNewPlantClose = () => {
    setCreatingNewPlant(false);
  };

  const handlePlantSelect = (plant: CurrentPlantData) => {
    setPlantView({ ...plantView, currentPlant: { ...plant }, isOpen: true });
  };

  const plantModalClose = () => {
    setPlantView({ ...plantView, isOpen: false, isEditing: false });
  };
  const handleEditPlant = () => {
    setValue("variety", plantView.currentPlant.variety);
    setValue("plantingDate", plantView.currentPlant.plantingDate);
    setValue("name", plantView.currentPlant.name);
    setValue("harvestDate", plantView.currentPlant.harvestDate);
    setValue("id", plantView.currentPlant.id);

    setPlantView({ ...plantView, isEditing: true, isOpen: false });
  };

  const AddNewPlantButton = () => {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        onClick={() => setCreatingNewPlant(true)}
      >
        Add New Plant
      </button>
    );
  };

  if (seasonLoading) return "Loading";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-5xl font-bold tracking-tighter">
          {allSeasonData?.name}
        </h1>
        <div className="flex justify-around mt-10">
          <h3 className="text-xl font-semibold tracking-tighter">
            Plants: {allSeasonData?.plants.length}
          </h3>
          <h3 className="text-xl font-semibold tracking-tighter">
            Season Start:{" "}
            {allSeasonData?.seasonStartDate
              ? allSeasonData?.seasonStartDate
              : "Not Started"}
          </h3>
          <h3 className="text-xl font-semibold tracking-tighter">
            Season End:{" "}
            {allSeasonData?.seasonEndDate
              ? allSeasonData?.seasonEndDate
              : "Not Ended"}
          </h3>
        </div>
      </div>

      <div className="flex gap-4">
        {allSeasonData?.plants.length ? <AddNewPlantButton /> : ""}

        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Edit
        </button>
      </div>
      <div>
        {allSeasonData?.plants.length ? (
          <PlantCard
            plants={allSeasonData?.plants}
            handlePlantSelect={handlePlantSelect}
          />
        ) : (
          <AddNewPlantButton />
        )}
      </div>

      <NewPlantModal
        register={register}
        handleSubmit={handleSubmit}
        addNewPlant={addNewPlant}
        isOpen={creatingNewPlant}
        handleNewPlantClose={handleNewPlantClose}
      />

      <PlantDetailsModal
        isOpen={plantView.isOpen}
        onClose={plantModalClose}
        currentPlant={plantView.currentPlant}
        handleEditPlant={handleEditPlant}
      />

      <EditPlantModal
        register={register}
        handleSubmit={handleSubmit}
        editPlant={editPlant}
        isOpen={plantView.isOpen}
        isEditing={plantView.isEditing}
        onClose={plantModalClose}
        currentPlant={plantView.currentPlant}
      />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
