import {useState} from 'react';
import {NewSeasonModal} from "./NewSeasonModal.tsx";
import { useMutation, gql } from '@apollo/client';


const NEW_SEASON = gql`
  mutation Mutation($name: String!) {
  addSeason(name: $name) {
    id
  }
}
`;
export const MainPage = () => {
  const [isOpen, setIsOpen] =useState<boolean>(false)
  const [addSeason, { data, loading, error }] = useMutation(NEW_SEASON, {
    onCompleted: (data) => {
      setIsOpen(false)
      console.log(data)
      //Navigate with data.addSeason.id
      //site.com/season/id

    }
  });

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
      <NewSeasonModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        addSeason={addSeason}
      />
    </div>
  );
}
