import { Dayjs } from "dayjs";
import { PlantCard } from "../cards/PlantCard";

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

export const PlantPage = ({ plantCount, plants }: PlantPageProps) => {
  return (
    <>
      {/* {plantCount ? ( */}
      <PlantCard
        plants={plants}
        // handlePlantSelect={handlePlantSelect}
        // setCreatingNewPlant={setCreatingNewPlant}
      />
      {/* ) : (
          <EditButton text="Add New Plant" setState={setCreatingNewPlant} />
        )} */}
    </>
  );
};
