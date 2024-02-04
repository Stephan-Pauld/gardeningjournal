// NewSeasonModal.tsx

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

interface NewSeasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  addSeason: (options: {
    variables: {
      name: string;
    };
  }) => Promise<any>;
}

type Inputs = {
  seasonName: string
}

export const NewSeasonModal: React.FC<NewSeasonModalProps> = ({ isOpen, onClose, addSeason }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await addSeason({
        variables: {
          name: data.seasonName,
        },
      });
    } catch (error) {
      console.error('Mutation error:', error);
    }
  }

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
            {errors.seasonName && <span className="bg-red-800">This field is required</span>}
          </div>
          <div className="flex justify-between mx-4 mt-6">
          <input
            className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium"
            type="submit"
          />
            <button className="bg-red-500 px-6 py-2 rounded-[3px] font-medium" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};