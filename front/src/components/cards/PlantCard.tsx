import seedling from "../../assets/seedling.png";

type Plant = {
  harvestDate: string;
  id: string;
  name: string;
  plantingDate: string;
  variety: string;
};

type plantProps = {
  plants: [];
  handlePlantSelect: (plant: Plant) => void;
  setCreatingNewPlant: (boolean: boolean) => void;
};

export const PlantCard = ({
  plants,
  handlePlantSelect,
  setCreatingNewPlant,
}: plantProps) => {
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
      <div className="grid grid-cols-3 gap-4 overflow-x-auto max-h-[500px] items-start justify-center p-[10px]">
        {plants.map((plant: Plant, index: number) => (
          <div
            key={index}
            className="rounded-lg border shadow-[4px_4px_6px_1px_#00625a66]"
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
