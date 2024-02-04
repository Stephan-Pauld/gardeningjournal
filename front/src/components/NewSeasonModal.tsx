// NewSeasonModal.tsx

import React from 'react';

interface NewSeasonModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

export const NewSeasonModal: React.FC<NewSeasonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-[56px]">
        <h2 className="text-lg font-bold ">Season Name</h2>
        <form action="submit">
          <div className="flex flex-col m-2 w-[300px]">
            <input placeholder="Eg: Spring or Fall Planters" className="border border-gray-400 rounded m-2 p-[10px] w-[100%]" type="text"/>
          </div>
          <div className="flex justify-between mx-4 mt-6">
            <button className="bg-[#74ae57] px-6 py-2 rounded-[3px] font-medium" onClick={onClose}>Submit</button>
            <button className="bg-red-500 px-6 py-2 rounded-[3px] font-medium" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};