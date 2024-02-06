import seedling from "../../assets/seedling.png";

export const PlantCard = () => {
  return (
    <>
      <h2 className="text-2xl font-bold my-[30px]">My Plants</h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[500px] items-start justify-center p-[10px]">
        {/* Repeated Cards for Plants */}
        {[
          "Rose",
          "Tulip",
          "Daisy",
          "Sunflower",
          "Tomatoes",
          "sage",
          "cucumber",
        ].map((plant, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm shadow-[4px_4px_6px_1px_#00625a66]"
            data-v0-t="card"
          >
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src={seedling}
                alt={plant}
                className="w-24 h-24 rounded-full"
                width="100"
                height="100"
                style={{ aspectRatio: "100 / 100", objectFit: "cover" }}
              />
              <h3 className="text-lg font-bold mt-2">{plant}</h3>
              <p className="text-sm text-gray-500">
                Planted on {`${index * 5 + 1}`}st Jan 2024
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
