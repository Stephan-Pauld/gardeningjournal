import seedling from "../../assets/seedling.png";

export const Carousel = () => {
  return (
    <div
      className="flex items-center relative w-full max-w-md mx-auto"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        <div
          className="flex -ml-4"
          style={{ transform: "translate3d(0px, 0px, 0px)" }}
        >
          {/* Repeated Carousel Item */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4"
            >
              <img
                src={seedling}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="inline-flex items-center whitespace-nowrap shrink-0 justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm font-medium hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2"
        disabled
      >
        {/* SVG for Previous Button */}
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
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span className="sr-only">Previous slide</span>
      </button>
      {/* Next Slide Button */}
      <button className="inline-flex items-center whitespace-nowrap shrink-0 justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm font-medium hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2">
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
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
        <span className="sr-only">Next slide</span>
      </button>
    </div>
  );
};
