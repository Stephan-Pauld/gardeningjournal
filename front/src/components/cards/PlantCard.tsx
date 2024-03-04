import seedling from "../../assets/seedling.png";
import dayjs, { Dayjs } from "dayjs";

type Plant = {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
};

type plantProps = {
  plants: Plant[] | undefined;
  handlePlantSelect: (plant: Plant) => void;
  setCreatingNewPlant: (boolean: boolean) => void;
};

export const PlantCard = ({
  plants,
  handlePlantSelect,
  setCreatingNewPlant,
}: plantProps) => {
  const formattedDate = (rawDate: Dayjs | null) => {
    if (!rawDate) return "";
    return dayjs(rawDate).format("MMM DD YYYY");
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
      <div className="flex flex-wrap gap-6 justify-center">
        {plants?.map((plant: Plant, index: number) => (
          <div
            key={index}
            className="rounded-lg border shadow-[4px_4px_6px_1px_#00625a66] w-[25%]"
            data-v0-t="card"
            onClick={() => handlePlantSelect(plant)}
          >
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src={seedling}
                className="w-24 h-24 rounded-full"
                width="100"
                height="100"
                style={{ aspectRatio: "100 / 100", objectFit: "cover" }}
              />
              <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
              <div className="flex justify-around w-[100%]">
                <p className="text-sm text-gray-500">
                  Planted on: {formattedDate(plant.plantingDate)}
                </p>
                <p className="text-sm text-gray-500">
                  Harvest Date: {formattedDate(plant.harvestDate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
