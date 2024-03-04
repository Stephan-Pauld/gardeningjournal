import { SeedlingTrackerCard } from "./cards/SeedlingTrackerCard";
import { someFakeData } from "./fakeData";

export const SeedlingTracker = () => {
  return (
    <div className=" flex m-[2%]">
      {someFakeData.map((seedling) => (
        <SeedlingTrackerCard seedling={seedling} />
      ))}
    </div>
  );
};
