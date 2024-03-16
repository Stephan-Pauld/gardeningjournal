import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { NewPlantModal } from "./modals/plants/NewPlantModal.tsx";
import { EditPlantModal } from "./modals/plants/EditPlantModal.tsx";
import { EditSeason } from "./modals/season/EditSeason.tsx";
import { PlantDetailsModal } from "./modals/plants/PlantDetailsModal.tsx";
import { ToastContainer, toast } from "react-toastify";
import { Note } from "./cards/Note.tsx";
import { NewNoteModal } from "./modals/notes/NewNoteModal.tsx";
import "react-toastify/dist/ReactToastify.css";
import { GET_SEASON_BY_ID } from "../graphQL/queries.ts";
import {
  UPDATE_SEASON,
  ADD_PLANT_TO_SEASON,
  EDIT_PLANT,
  ADD_NOTE_TO_SEASON,
  UPDATE_NOTE,
} from "../graphQL/mutations.ts";
import { Dayjs } from "dayjs";
import { NavBar } from "./NavBar.tsx";
import { PlantPage } from "./plants/PlantPage.tsx";

type Plant = {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
};

type Note = {
  content: string;
  createdAt: string;
  id: string;
};

type AllSeasonData = {
  name: string;
  notes: Note[];
  plants: Plant[];
  seasonEndDate: Dayjs | null;
  lastFrostDate: Dayjs | null;
  plantingZone: string;
  id: string;
};

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

export const SeasonPage = () => {
  const { id } = useParams();
  const [allSeasonData, setAllSeasonData] = useState<AllSeasonData>();
  const [creatingNewPlant, setCreatingNewPlant] = useState<boolean>(false);
  const [isEditingSeason, setIsEditingSeason] = useState<boolean>(false);
  const [creatingNewNote, setCreatingNewNote] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [noteId, setNoteId] = useState("");
  const [navStep, setNavStep] = useState(0);

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

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      harvestDate: "",
      name: "",
      plantingDate: "",
      variety: "",
      seasonNote: "",
      lastFrost: "",
      lastHarvest: "",
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

  const handleNavChange = (step: number) => {
    setNavStep(step);
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
  function updateSeasonData(data) {
    setAllSeasonData(data.getSeasonById);
  }
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
        updateSeasonId: allSeasonData?.id,
        name: data.seasonName,
        plantingZone: data.plantingZone,
        lastFrostDate: data.lastFrost,
        seasonEndDate: data.lastHarvest,
      },
    });
  };

  // const handlePlantSelect = (plant: CurrentPlantData) => {
  //   setPlantView({ ...plantView, currentPlant: { ...plant }, isOpen: true });
  //   setValue("variety", plant.variety);
  //   setValue("name", plant.name);
  //   setValue("id", plant.id);

  //   //Sometimes our planting date will be null so we need to make it into a string to matter what
  //   setValue(
  //     "plantingDate",
  //     plant.plantingDate ? plant.plantingDate.toString() : ""
  //   );
  //   setValue(
  //     "harvestDate",
  //     plant.harvestDate ? plant.harvestDate.toString() : ""
  //   );
  // };

  const plantModalClose = () => {
    setPlantView({ ...plantView, isOpen: false, isEditing: false });
  };
  const handleEditPlant = () => {
    setPlantView({ ...plantView, isEditing: true, isOpen: false });
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

  const handleSeasonDates = (seasonDate: string, date: Dayjs | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    if (seasonDate === "lastFrost") {
      setValue("lastFrost", formattedDate);
    }
    if (seasonDate === "lastHarvest") {
      setValue("lastHarvest", formattedDate);
    }
  };

  const EditButton = ({
    text,
    setState,
  }: {
    text: string;
    setState: (boolean: boolean) => void;
  }) => {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        onClick={() => setState(true)}
      >
        {text}
      </button>
    );
  };

  if (seasonLoading) return "Loading";
  return (
    <div className="">
      <div className="p-[14px] flex items-center">
        <EditButton text="Edit Season" setState={setIsEditingSeason} />
        <h1 className="text-5xl font-bold tracking-tighter text-center">
          {allSeasonData?.name}
        </h1>
      </div>
      <NavBar handleNavChange={handleNavChange} navStep={navStep} />

      {navStep === 0 && (
        <PlantPage
          plantCount={allSeasonData?.plants.length}
          plants={allSeasonData?.plants}
          refetch={refetch}
          updateSeasonData={updateSeasonData}
        />
      )}

      {/* <div>
        {allSeasonData?.notes.length ? (
          <Note
            notes={allSeasonData?.notes}
            setCreatingNewNote={setCreatingNewNote}
            editNote={editNote}
          />
        ) : (
          <EditButton text="New Journal Entry" setState={setCreatingNewNote} />
        )}
      </div> */}

      <NewNoteModal
        register={register}
        handleSubmit={handleSubmit}
        addNewNote={addNewNote}
        isOpen={creatingNewNote}
        isEditingNote={isEditingNote}
        onClose={handleCloseNote}
        updateNote={handleUpdateNote}
      />

      <EditPlantModal
        register={register}
        handleSubmit={handleSubmit}
        editPlant={editPlant}
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
