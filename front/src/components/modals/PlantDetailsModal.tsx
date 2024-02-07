import seedling from "../../assets/seedling.png";
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
};
export const PlantDetailsModal = ({
  isOpen,
  onClose,
  currentPlant,
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
            <GrEdit style={{ cursor: "pointer" }} />
            <IoCloseCircle
              onClick={() => onClose(false)}
              style={{ cursor: "pointer" }}
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
          <div className="relative m-4">
            <textarea
              className="peer h-fit min-h-[100px] w-full resize-none rounded-[7px] border
               border-blue-gray-200 border-t-transparent bg-transparent px-1 py-2.5 text-sm
               outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
              placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900
              focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute
              left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal
              leading-tight text-blue-gray-400 transition-all before:pointer-events-none
              before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5
              before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200
              before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border
              after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r
              after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]
              peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent
              peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900
              peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2
              peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent
              peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Textarea Medium
            </label>
          </div>
        </div>
      </div>

      <div>
        {/*<button*/}
        {/*  onClick={() => onClose(false)}*/}
        {/*  className="bg-red-500 px-6 py-2 rounded-[3px] font-medium"*/}
        {/*>*/}
        {/*  Cancel*/}
        {/*</button>*/}
      </div>
    </div>
  );
};

{
  /*<p>{currentPlant.name}</p>*/
}
{
  /*<p>{currentPlant.variety}</p>*/
}
{
  /*<p>{currentPlant.plantingDate}</p>*/
}
{
  /*<p>{currentPlant.harvestDate}</p>*/
}
