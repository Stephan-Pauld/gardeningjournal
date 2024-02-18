import { IoCloseCircle } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type Note = {
  content: string;
  createdAt: string;
  id: string;
};

type Plant = {
  harvestDate: Dayjs | null;
  id: string;
  name: string;
  plantingDate: Dayjs | null;
  variety: string;
};

type SeasonData = {
  name: string;
  notes: Note[];
  plants: Plant[];
  seasonEndDate: Dayjs | null;
  lastFrostDate: Dayjs | null;
  plantingZone: string;
};

type EditSeasonProps = {
  isEditingSeason: boolean;
  onClose: (boolean: boolean) => void;
  handleSeasonUpdate: (data: FieldValues) => void;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleSeasonDates: (plantOrHarvest: string, date: Dayjs | null) => void;
  seasonData?: SeasonData;
};

export const EditSeason = ({
  isEditingSeason,
  handleSeasonUpdate,
  register,
  handleSubmit,
  handleSeasonDates,
  onClose,
  seasonData,
}: EditSeasonProps) => {
  if (!isEditingSeason) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="flex justify items-center bg-white rounded-lg shadow-lg">
        <div className="w-[600px]">
          <div className="flex justify-end m-4 text-2xl">
            <IoCloseCircle
              onClick={() => onClose(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="flex flex-col m-4">
            <h5 className="text-3xl font-bold tracking-tighter text-left">
              EDIT SEASON
            </h5>
            <form onSubmit={handleSubmit(handleSeasonUpdate)}>
              <div className="mt-10 text-left">
                <label htmlFor="">Season Name</label>
                <input
                  defaultValue={seasonData?.name}
                  {...register("seasonName")}
                  className="border border-gray-400 rounded p-[10px] w-full"
                  type="text"
                />
              </div>
              <div className="mt-10 text-left">
                <label htmlFor="">Planting Zone</label>
                <input
                  defaultValue={seasonData?.plantingZone}
                  {...register("plantingZone")}
                  className="border border-gray-400 rounded p-[10px] w-full"
                  type="text"
                />
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-col mt-10">
                  <label htmlFor="" className="text-left">
                    Last Frost Date
                  </label>
                  <DatePicker
                    value={dayjs(seasonData?.lastFrostDate)}
                    onChange={(selectedDate) =>
                      handleSeasonDates("lastFrost", selectedDate)
                    }
                  />
                </div>
                <div className="flex flex-col mt-10">
                  <label htmlFor="" className="text-left">
                    Last Harvest
                  </label>
                  <DatePicker
                    value={dayjs(seasonData?.seasonEndDate)}
                    onChange={(selectedDate) =>
                      handleSeasonDates("lastHarvest", selectedDate)
                    }
                  />
                </div>
              </div>
              <div className="text-left mt-10">
                <input
                  className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
