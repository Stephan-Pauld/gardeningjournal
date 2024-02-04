import {useState} from 'react';
import {NewSeasonModal} from "./NewSeasonModal.tsx";

export const MainPage = () => {
  const [isOpen, setIsOpen] =useState<boolean>(false)

  const handleNewSeason = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className="float-right ml-[10px] font-bold rounded-[3px] px-[10px] py-[2px] bg-[#ff0000] text-[#ffffff]">Logout</button>
      <p className="font-bold float-right underline">
        Stephan
      </p>
      <button
        className="font-bold rounded-lg text-lg  w-48 h-16 bg-[#74ae57] text-[#ffffff] float-left"
        onClick={handleNewSeason}
      >
        Create New Season
      </button>
      <NewSeasonModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
