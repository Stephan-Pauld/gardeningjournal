import seedling from "../../../assets/seedling.png";
import { GrEdit } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";
interface Plant {
  harvestDate: string;
  id: string;
  name: string;
  plantingDate: string;
  variety: string;
}

type PlantDetailModalProps = {
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
  currentPlant: Plant;
  handleEditPlant: () => void;
};
export const PlantDetailsModal = ({
  isOpen,
  onClose,
  currentPlant,
  handleEditPlant
}: PlantDetailModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="flex justify items-center bg-white rounded-lg shadow-lg">
        <div>
          <img src={seedling} className="w-[400px] h-[400px] rounded-l-lg" />
        </div>

        <div className="w-[400px] h-[400px]">
          <div className="flex justify-between m-4 text-2xl">
            <GrEdit 
            onClick={handleEditPlant}
            style={{ cursor: "pointer" }} 
            />
            <IoCloseCircle
              style={{ cursor: "pointer" }}
              onClick={() => onClose(false)}
            />
          </div>
          <div className="flex flex-col m-4 items-start">
            <h5 className="text-3xl font-bold tracking-tighter">
              {currentPlant.name}
            </h5>
            <p className="font-medium">{currentPlant.variety}</p>
          </div>
          <div className="flex m-4">
            <div className="flex flex-col items-start">
              <p>Watering: Low</p>
              <p>Light: Medium</p>
              <p>Humidity: High</p>
              <p>Plant Date: jan1</p>
            </div>

            <div className="flex flex-col items-start ml-[50px]">
              <p>Temp: 18-30°C</p>
              <p>Fertalize: Monthly</p>
              <p>Pruning: As needed</p>
              <p>Harvest Date: oct2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
