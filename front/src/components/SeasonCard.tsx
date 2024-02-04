import React from "react";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface seasonProps {
  id: string;
  name: string;
  plantCount: number;
  seasonEndDate: string;
  seasonStartDate: string;
}
export const SeasonCard: React.FC<seasonProps> = ({
  id,
  name,
  plantCount,
  seasonEndDate,
  seasonStartDate,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-lg border bg-card text-card-foreground w-full max-w-md my-[10px] shadow-[4px_4px_12px_0.1px_#00625a66]"
      data-v0-t="card"
      onClick={() => navigate(`/season/${id}`)}
    >
      <div className="space-y-1.5 p-6 flex flex-row">
        <div className="grid gap-1">
          <h3 className="flex text-2xl font-semibold whitespace-nowrap leading-none tracking-tight justify-start">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            A magical garden with a variety of plants.
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-auto text-gray-500 w-8 h-8 dark:text-gray-400"
        >
          <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"></path>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="m8 16 1.5-1.5"></path>
          <path d="M14.5 9.5 16 8"></path>
          <path d="m8 8 1.5 1.5"></path>
          <path d="M14.5 14.5 16 16"></path>
        </svg>
      </div>
      <div className="p-6 grid gap-4">
        <div className="aspect-[3/2] object-cover w-full rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-32 h-32 fill-primary overflow-hidden"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
          </svg>
        </div>
        <div className="flex justify-around gap-4 text-sm">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 fill-primary"
            >
              <path d="M7 20h10"></path>
              <path d="M10 20c5.5-2.5.8-6.4 3-10"></path>
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"></path>
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path>
            </svg>
            {plantCount} Plants
          </div>
          <div className="flex gap-2 items-center">
            <FaCalendar />
            Start: {seasonStartDate ? seasonStartDate : "No date added"}
          </div>
          <div className="flex gap-2 items-center">
            {/* Icon and text for End: Dec 2024 */}
            <FaCalendar />
            End: {seasonEndDate ? seasonEndDate : "No date added"}
          </div>
        </div>
      </div>
    </div>
  );
};
