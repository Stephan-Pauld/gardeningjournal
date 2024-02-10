import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PlantCard } from "./cards/PlantCard.tsx";
import seedling from "../assets/seedling.png";
import { NewPlantModal } from "./modals/plants/NewPlantModal.tsx";
import { EditPlantModal } from "./modals/plants/EditPlantModal.tsx";
import { PlantDetailsModal } from "./modals/plants/PlantDetailsModal.tsx";

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
mutation Mutation($updatePlantId: ID!, $name: String, $variety: String, $plantingDate: String, $harvestDate: String) {
  updatePlant(id: $updatePlantId, name: $name, variety: $variety, plantingDate: $plantingDate, harvestDate: $harvestDate) {
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
}

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
  isOpen: false
});

  const { register, handleSubmit, reset, setValue, getValues} = useForm({
    defaultValues: {
      id:"",
      harvestDate: "",
      name: "",
      plantingDate: "",
      variety: ""
  }
});

  const { loading: seasonLoading, refetch } = useQuery(GET_SEASON_BY_ID, {
    variables: {
      getSeasonById: id,
    },
    onCompleted: (data) => {
      setAllSeasonData(data.getSeasonById);
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

  const [updatePlant] = useMutation(EDIT_PLANT, {
    onCompleted: () => {
      refetch().then(({ data }) => {
        setAllSeasonData(data.getSeasonById);
        plantModalClose();
      });
    },
  });

  
  const addNewPlant = async (data: FieldValues) => {    
    try {
      await addPlantToSeason({
        variables: {
          seasonId: id,
          name: data.plantName,
          variety: data.variety,
        },
      });
      reset();
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
    }
  };

  const editPlant = async (data: FieldValues) => {
    try {
      await updatePlant({
        variables: {
          "updatePlantId": data.id,
          "name": data.name,
          "variety": data.variety,
          "plantingDate": data.plantingDate,
          "harvestDate": data.harvestDate
        },
      });
    } catch (error) {
      
    }
  }

  const handleNewPlantClose = () => {
    setCreatingNewPlant(false)
  }

  const handlePlantSelect = (plant) => {
    setPlantView({...plantView, currentPlant:{...plant}, isOpen:true,})
  }
  
  const plantModalClose = () => {
    setPlantView({...plantView, isOpen:false, isEditing:false})
  }
  const handleEditPlant = () => {
    setValue("variety",plantView.currentPlant.variety)
    setValue("plantingDate", plantView.currentPlant.plantingDate)
    setValue("name", plantView.currentPlant.name)
    setValue("harvestDate", plantView.currentPlant.harvestDate)
    setValue("id", plantView.currentPlant.id)

    setPlantView({...plantView, isEditing: true, isOpen:false})
  }
  
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
      <div
        className="flex items-center relative w-full max-w-md mx-auto"
        role="region"
        aria-roledescription="carousel"
      >
        <div className="overflow-hidden">
          <div
            className="flex -ml-4"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          >
            {/* Repeated Carousel Item */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4"
              >
                <img
                  src={seedling}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Previous Slide Button */}
        <button
          className="inline-flex items-center whitespace-nowrap shrink-0 justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm font-medium hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2"
          disabled
        >
          {/* SVG for Previous Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <span className="sr-only">Previous slide</span>
        </button>
        {/* Next Slide Button */}
        <button className="inline-flex items-center whitespace-nowrap shrink-0 justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm font-medium hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
          <span className="sr-only">Next slide</span>
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
    </div>
  );
};
