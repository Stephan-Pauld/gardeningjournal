import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PlantCard } from "./cards/PlantCard.tsx";
import { NewPlantModal } from "./modals/plants/NewPlantModal.tsx";
import { EditPlantModal } from "./modals/plants/EditPlantModal.tsx";
import { EditSeason } from "./modals/season/EditSeason.tsx";
import { PlantDetailsModal } from "./modals/plants/PlantDetailsModal.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GET_SEASON_BY_ID = gql`
  query GetSeasonById($getSeasonById: ID!) {
    getSeasonById(id: $getSeasonById) {
      id
      lastFrostDate
      name
      notes {
        content
        createdAt
        id
      }
      plantingZone
      seasonEndDate
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

const UPDATE_SEASON = gql`
  mutation Mutation(
    $updateSeasonId: ID!
    $name: String
    $plantingZone: String
    $lastFrostDate: String
    $seasonEndDate: String
  ) {
    updateSeason(
      id: $updateSeasonId
      name: $name
      plantingZone: $plantingZone
      lastFrostDate: $lastFrostDate
      seasonEndDate: $seasonEndDate
    ) {
      id
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
  seasonEndDate: date | null;
  lastFrostDate: date | null;
  plantingZone: string;
};

type CurrentPlantData = {
  harvestDate: date | null;
  id: string;
  name: string;
  plantingDate: date | null;
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
  const [isEditingSeason, setIsEditingSeason] = useState<boolean>(false);
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

  const [updateSeason] = useMutation(UPDATE_SEASON, {
    onCompleted: () => {
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
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
      reset();
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const handleSeasonUpdate = async (data: FieldValues) => {
    await updateSeason({
      variables: {
        updateSeasonId: allSeasonData.id,
        name: data.seasonName,
        plantingZone: data.plantingZone,
        lastFrostDate: data.lastFrost,
        seasonEndDate: data.lastHarvest,
      },
    });
  };

  const handleNewPlantClose = () => {
    setCreatingNewPlant(false);
  };

  const handlePlantSelect = (plant: CurrentPlantData) => {
    setPlantView({ ...plantView, currentPlant: { ...plant }, isOpen: true });
    setValue("variety", plant.variety);
    setValue("plantingDate", plant.plantingDate);
    setValue("name", plant.name);
    setValue("harvestDate", plant.harvestDate);
    setValue("id", plant.id);
  };

  const plantModalClose = () => {
    setPlantView({ ...plantView, isOpen: false, isEditing: false });
  };
  const handleEditPlant = () => {
    setPlantView({ ...plantView, isEditing: true, isOpen: false });
  };

  const handlePlantDates = (plantOrHarvest: string, date: date | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (plantOrHarvest === "plantDate") {
      setValue("plantingDate", formattedDate);
    }
    if (plantOrHarvest === "harvestDate") {
      setValue("harvestDate", formattedDate);
    }
  };

  const handleSeasonDates = (seasonDate: string, date: date | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (seasonDate === "lastFrost") {
      setValue("lastFrost", formattedDate);
    }
    if (seasonDate === "lastHarvest") {
      setValue("lastHarvest", formattedDate);
    }
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
            Last Frost:{" "}
            {allSeasonData?.lastFrostDate
              ? allSeasonData?.lastFrostDate
              : "Not Specified"}
          </h3>
          <h3 className="text-xl font-semibold tracking-tighter">
            Last Harvest:{" "}
            {allSeasonData?.seasonEndDate
              ? allSeasonData?.seasonEndDate
              : "Not Ended"}
          </h3>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsEditingSeason(true)}
          className="rounded-md text-sm font-medium border
          border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Edit
        </button>
      </div>
      <div>
        {allSeasonData?.plants.length ? (
          <PlantCard
            plants={allSeasonData?.plants}
            handlePlantSelect={handlePlantSelect}
            setCreatingNewPlant={setCreatingNewPlant}
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
        handlePlantDates={handlePlantDates}
      />
      <EditSeason
        isEditingSeason={isEditingSeason}
        handleSeasonUpdate={handleSeasonUpdate}
        register={register}
        onClose={setIsEditingSeason}
        handleSubmit={handleSubmit}
        handleSeasonDates={handleSeasonDates}
        seasonData={allSeasonData}
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
