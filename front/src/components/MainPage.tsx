import { useState } from "react";
import { NewSeasonModal } from "./modals/NewSeasonModal.tsx";
import { SeasonCard } from "./SeasonCard.tsx";
import { useMutation, gql, useQuery } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NEW_SEASON = gql`
  mutation Mutation($name: String!) {
    addSeason(name: $name) {
      id
    }
  }
`;

const GET_ALL_SEASONS = gql`
  query Query {
    getAllSeasons {
      id
      name
      plants {
        name
      }
      seasonStartDate
      seasonEndDate
    }
  }
`;

type Season = {
  id: string;
  name: string;
  plants: { name: string }[];
  seasonStartDate: string;
  seasonEndDate: string;
};

type AllSeasonData = {
  getAllSeasons: Season[];
};

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [addSeason] = useMutation(NEW_SEASON, {
    onCompleted: (data) => {
      setIsOpen(false);
      navigate(`/season/${data.addSeason.id}`);
    },
  });
  const { data: allSeasonData, loading: allSeasonLoading } =
    useQuery<AllSeasonData>(GET_ALL_SEASONS);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      await addSeason({
        variables: {
          name: data.seasonName,
        },
      });
      reset();
    } catch (error) {
      console.error("Mutation error:", error);
      reset();
    }
  };

  if (!allSeasonData) return "Loading";
  return (
    <>
      <button className="float-right ml-[10px] font-bold rounded-[3px] px-[10px] py-[2px] bg-[#ff0000] text-[#ffffff]">
        Logout
      </button>
      <p className="font-bold float-right underline">Stephan</p>
      <button
        className="font-bold rounded-lg text-lg  w-48 h-16 bg-[#74ae57] text-[#ffffff] flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        Create New Season
      </button>
      <NewSeasonModal
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={setIsOpen}
      />
      <div className="mt-[150px] flex justify-around flex-wrap">
        {allSeasonData?.getAllSeasons.map((season: Season) => (
          <SeasonCard
            key={season.id}
            id={season.id}
            name={season.name}
            plantCount={season.plants.length}
            seasonEndDate={season.seasonEndDate}
            seasonStartDate={season.seasonStartDate}
          />
        ))}
      </div>
    </>
  );
};
