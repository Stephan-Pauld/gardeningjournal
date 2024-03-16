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
};

export const PlantCard = ({ plants, handlePlantSelect }: plantProps) => {
  const formattedDate = (rawDate: Dayjs | null) => {
    if (!rawDate) return "";
    return dayjs(rawDate).format("MMM DD YYYY");
  };
  console.log(plants);

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center">
        {plants?.map((plant: Plant) => (
          <div
            key={`${plant.name}${plant.id}`}
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
