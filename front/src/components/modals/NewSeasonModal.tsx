import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type NewSeasonModalProps = {
  isOpen: boolean;
  onClose: (bool: boolean) => void;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
};

export const NewSeasonModal = ({
  isOpen,
  onClose,
  register,
  handleSubmit,
  onSubmit,
}: NewSeasonModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-[56px]">
        <h2 className="text-lg font-bold ">Season Name</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col m-2 w-[300px]">
            <input
              {...register("seasonName")}
              className="border border-gray-400 rounded m-2 p-[10px] w-[100%]"
              placeholder="Eg: Spring or Fall Planters"
              type="text"
            />
          </div>
          <div className="flex justify-between mx-4 mt-6">
            <input
              className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium"
              type="submit"
            />
            <button
              className="bg-red-500 px-6 py-2 rounded-[3px] font-medium"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
