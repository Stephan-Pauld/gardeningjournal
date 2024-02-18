import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { TextField } from "@mui/material";

type NewNoteModal = {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  addNewNote: (data: FieldValues) => void;
  isEditingNote: boolean;
  updateNote: (data: FieldValues) => void;
};

export const NewNoteModal = ({
  isOpen,
  register,
  handleSubmit,
  onClose,
  addNewNote,
  isEditingNote,
  updateNote,
}: NewNoteModal) => {
  if (!isEditingNote && !isOpen) return null;
  const onSubmit = isEditingNote ? updateNote : addNewNote;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-[56px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-[900px]">
            <TextField
              {...register("seasonNote")}
              id="filled-multiline-static"
              label="Journal Entry"
              multiline
              rows={5}
              variant="filled"
            />
          </div>
          <div className="flex mt-6">
            <input
              className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium"
              type="submit"
            />
            <button
              className="bg-red-500 px-6 py-2 rounded-[3px] font-medium ml-5"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
