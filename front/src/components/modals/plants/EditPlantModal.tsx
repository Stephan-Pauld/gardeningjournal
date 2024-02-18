import seedling from "../../../assets/seedling.png";
import { IoCloseCircle } from "react-icons/io5";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface Plant {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
}

type EditPlantModalProps = {
  isEditing: boolean;
  onClose: (boolean: boolean) => void;
  currentPlant: Plant;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  editPlant: (data: FieldValues) => void;
  handlePlantDates: (plantOrHarvest: string, date: Dayjs | null) => void;
};

export const EditPlantModal = ({
  isEditing,
  onClose,
  currentPlant,
  register,
  handleSubmit,
  editPlant,
  handlePlantDates,
}: EditPlantModalProps) => {
  if (!isEditing) return null;
  return (
    <form onSubmit={handleSubmit(editPlant)}>
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
        <div className="flex justify items-center bg-white rounded-lg shadow-lg">
          <div>
            <img
              src={seedling}
              alt={`image of ${currentPlant.name}`}
              className="w-[400px] h-[400px] rounded-l-lg"
            />
          </div>

          <div className="w-[400px]">
            <div className="flex justify-end m-4 text-2xl">
              <IoCloseCircle
                onClick={() => onClose(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="flex flex-col m-2 items-start">
              <h5 className="text-3xl font-bold tracking-tighter">EDITING</h5>
              <label htmlFor="">test</label>
              <input
                defaultValue={currentPlant.name}
                {...register("name")}
                className="border border-gray-400 rounded p-[10px] w-[100%]"
                type="text"
              />
              <input
                defaultValue={currentPlant.variety}
                {...register("variety")}
                className="border border-gray-400 rounded p-[10px] w-[100%]"
                type="text"
              />
              <DatePicker
                value={dayjs(currentPlant.plantingDate)}
                onChange={(selectedDate: Dayjs | null) =>
                  handlePlantDates("plantDate", selectedDate)
                }
              />
              <DatePicker
                value={dayjs(currentPlant.harvestDate)}
                onChange={(selectedDate) =>
                  handlePlantDates("harvestDate", selectedDate)
                }
              />
              <input
                className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium"
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
