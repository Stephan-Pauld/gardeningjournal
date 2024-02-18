import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { PlantCard } from "./cards/PlantCard.tsx";
import { NewPlantModal } from "./modals/plants/NewPlantModal.tsx";
import { EditPlantModal } from "./modals/plants/EditPlantModal.tsx";
import { EditSeason } from "./modals/season/EditSeason.tsx";
import { PlantDetailsModal } from "./modals/plants/PlantDetailsModal.tsx";
import { ToastContainer, toast } from "react-toastify";
import { Note } from "./cards/Note.tsx";
import "react-toastify/dist/ReactToastify.css";
import { GET_SEASON_BY_ID } from "../graphQL/queries.ts";
import {
  UPDATE_SEASON,
  ADD_PLANT_TO_SEASON,
  EDIT_PLANT,
  ADD_NOTE_TO_SEASON,
  UPDATE_NOTE,
} from "../graphQL/mutations.ts";
import { NewNoteModal } from "./modals/notes/NewNoteModal.tsx";
type Note = {
  content: string;
  createdAt: string;
  id: string;
};

type AllSeasonData = {
  name: string;
  notes: string[];
  plants: [];
  seasonEndDate: Date | null;
  lastFrostDate: Date | null;
  plantingZone: string;
};

type CurrentPlantData = {
  harvestDate: Date | null;
  id: string;
  name: string;
  plantingDate: Date | null;
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
  const [creatingNewNote, setCreatingNewNote] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [noteId, setNoteId] = useState("");

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

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      id: "",
      harvestDate: "",
      name: "",
      plantingDate: "",
      variety: "",
      seasonNote: "",
    },
  });
  const values = getValues();
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

  const [addNoteToSeason] = useMutation(ADD_NOTE_TO_SEASON, {
    onCompleted: () => {
      setCreatingNewNote(false);
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
      });
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted: () => {
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
      });
    },
  });

  const addNewPlant = async (data: FieldValues) => {
    console.log("adding a plant");

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

  const addNewNote = async (data: FieldValues) => {
    try {
      const notePromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await addNoteToSeason({
              variables: {
                seasonId: id,
                content: data.seasonNote,
              },
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // Fake Delay for dev, might keep..
      });

      // had a brutal time dealing with the promise for the toast...
      await toast.promise(notePromise, {
        pending: "Adding Journal Entry...✏️",
        success: "Entry added successfully 📝",
        error: "Failed to add entry 😞",
      });

      reset();
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
    }
  };
  const handleUpdateNote = async (data: FieldValues) => {
    try {
      const notePromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await updateNote({
              variables: {
                noteId,
                content: data.seasonNote,
              },
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // Fake Delay for dev, might keep..
      });

      // had a brutal time dealing with the promise for the toast...
      await toast.promise(notePromise, {
        pending: "Adding Journal Entry...✏️",
        success: "Entry added successfully 📝",
        error: "Failed to add entry 😞",
      });

      reset();
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
    }
  };
  const editNote = (note: Note) => {
    setNoteId(note.id);
    setValue("seasonNote", note.content);
    setIsEditingNote(true);
  };
  const handleCloseNote = () => {
    setIsEditingNote(false);
    setCreatingNewNote(false);
    setNoteId("");
    setValue("seasonNote", "");
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

  const handlePlantDates = (plantOrHarvest: string, date: Date | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (plantOrHarvest === "plantDate") {
      setValue("plantingDate", formattedDate);
    }
    if (plantOrHarvest === "harvestDate") {
      setValue("harvestDate", formattedDate);
    }
  };

  const handleSeasonDates = (seasonDate: string, date: Date | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (seasonDate === "lastFrost") {
      setValue("lastFrost", formattedDate);
    }
    if (seasonDate === "lastHarvest") {
      setValue("lastHarvest", formattedDate);
    }
  };

  const EditButton = ({ text, state }) => {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        onClick={() => state(true)}
      >
        {text}
      </button>
    );
  };

  if (seasonLoading) return "Loading";
  return (
    <div className="">
      <div className="p-[14px]">
        <EditButton text="Edit Season" state={setIsEditingSeason} />
        <h1 className="text-5xl font-bold tracking-tighter text-center">
          {allSeasonData?.name}
        </h1>
      </div>
      <div className="flex justify-between p-[14px] w-[85%] items-center mt-[100px] m-auto">
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
      <div className="flex justify-evenly">
        <div className="w-[40%]">
          {allSeasonData?.plants.length ? (
            <PlantCard
              plants={allSeasonData?.plants}
              handlePlantSelect={handlePlantSelect}
              setCreatingNewPlant={setCreatingNewPlant}
            />
          ) : (
            <EditButton text="Add New Plant" state={setCreatingNewPlant} />
          )}
        </div>
        <div className="w-[40%]">
          {allSeasonData?.notes.length ? (
            <Note
              notes={allSeasonData?.notes}
              setCreatingNewNote={setCreatingNewNote}
              editNote={editNote}
            />
          ) : (
            <EditButton text="New Journal Entry" state={setCreatingNewNote} />
          )}
        </div>
      </div>

      <NewNoteModal
        register={register}
        handleSubmit={handleSubmit}
        addNewNote={addNewNote}
        isOpen={creatingNewNote}
        isEditingNote={isEditingNote}
        onClose={handleCloseNote}
        updateNote={handleUpdateNote}
      />

      <NewPlantModal
        register={register}
        handleSubmit={handleSubmit}
        addNewPlant={addNewPlant}
        isOpen={creatingNewPlant}
        handleNewPlantClose={handleNewPlantClose}
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

      <PlantDetailsModal
        isOpen={plantView.isOpen}
        onClose={plantModalClose}
        currentPlant={plantView.currentPlant}
        handleEditPlant={handleEditPlant}
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
