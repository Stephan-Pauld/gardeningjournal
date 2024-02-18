import { useState } from "react";
import { NewSeasonModal } from "./modals/NewSeasonModal.tsx";
import { SeasonCard } from "./cards/SeasonCard.tsx";
import { useMutation, useQuery } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NEW_SEASON } from "../graphQL/mutations.ts";
import { GET_ALL_SEASONS } from "../graphQL/queries.ts";

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
      reset();
    },
  });
  const { data: allSeasonData } = useQuery<AllSeasonData>(GET_ALL_SEASONS);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const seasonPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await addSeason({
              variables: {
                name: data.seasonName,
              },
            });
            reset();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // Fake Delay for dev, might keep..
      });

      // had a brutal time dealing with the promise for the toast...
      await toast.promise(seasonPromise, {
        pending: "Adding new season...☀️",
        success: "Season added successfully 🌞",
        error: "Failed to add season ❄️",
      });
    } catch (error) {
      console.error("Mutation error:", error);
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
