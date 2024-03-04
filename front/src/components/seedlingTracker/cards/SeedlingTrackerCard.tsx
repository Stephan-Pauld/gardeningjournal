import seedlingImg from "../../../assets/seedling.png";

interface Note {
  content: string;
  createdAt: string;
}

interface Seedling {
  name: string;
  variety: string;
  date: string;
  seedlingStage: string;
  progress: string;
  timeElapsed: string;
  notes: Note[];
}

interface Props {
  seedling: Seedling;
}

export const SeedlingTrackerCard = ({ seedling }: Props) => {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground w-full max-w-lg m-[5px] shadow-[4px_4px_12px_0.1px_#00625a66]"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-0">
        <div>{seedling.name}</div>
        <div>{seedling.variety}</div>
      </div>
      <div className="p-6 flex flex-col items-center gap-4 pt-4 pb-6">
        <div className="flex items-center gap-2">
          <img
            src={seedlingImg}
            width="64"
            height="64"
            alt="Tomato seedling"
            className="rounded-full overflow-hidden"
            style={{ aspectRatio: "64/64", objectFit: "cover" }}
          />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
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
                className="h-4 w-4 text-gray-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="text-sm font-medium">
                {seedling.seedlingStage}
              </span>
            </div>
            <div className="flex items-center gap-1">
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
                className="h-4 w-4"
              >
                <path d="M7 20h10"></path>
                <path d="M10 20c5.5-2.5.8-6.4 3-10"></path>
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"></path>
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path>
              </svg>
              <span className="text-sm font-medium">Growing</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="grid w-full gap-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-2xl font-semibold">{seedling.progress}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-sm font-medium">Time elapsed</span>
            <span className="text-2xl font-semibold">
              {seedling.timeElapsed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
