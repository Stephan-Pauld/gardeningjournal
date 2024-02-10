import seedling from "../../assets/seedling.png";

type plantProps = {
  plants: [];
  handlePlantSelect: (plant) => void;
};

type Plant = {
  harvestDate: string;
  id: string;
  name: string;
  plantingDate: string;
  variety: string;
};
export const PlantCard = ({ plants, handlePlantSelect }: plantProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold my-[30px]">My Plants</h2>
      <div className="grid grid-cols-2 gap-4 overflow-x-auto max-h-[500px] items-start justify-center p-[10px]">
        {plants.map((plant: Plant, index: number) => (
          <div
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm shadow-[4px_4px_6px_1px_#00625a66]"
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
                  Planted on: {plant.plantingDate}
                </p>
                <p className="text-sm text-gray-500">
                  Harvest Date: {plant.harvestDate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
