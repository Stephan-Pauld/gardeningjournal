type Note = {
  content: string;
  createdAt: string;
};

type NoteProps = {
  notes: [Note];
};

export const Note = ({ notes }: NoteProps) => {
  return (
    <>
      <div className="flex justify-between p-[10px] w-fit">
        <h2 className="text-2xl font-bold text-left mr-[30px]">
          Journal Entries
        </h2>
        <button
          onClick={() => setCreatingNewPlant(true)}
          className="rounded-md text-sm font-medium border
        border-input bg-background hover:bg-accent hover:text-accent-foreground
        h-10 px-4 py-2 "
        >
          New Journal Entry
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 overflow-x-auto max-h-[500px] items-start justify-center p-[14px]">
        {notes.map((note: Note, index: number) => (
          <div
            key={note.id}
            className="flex w-[75%] items-start justify-between border rounded-xl p-3 bg-red-200 cursor-pointer border-gray-800 shadow-[4px_4px_6px_1px_#00625a66]"
          >
            <div className="text-xl font-bold">
              05<span className="font-thin">Friday</span>
            </div>
            <p className="w-[85%] text-left">
              It was a cold and blustery day. I decided to take a long walk in
              the park, and the wind was so strong that it nearly blew me over a
              few times. But the fresh air was invigorating, and I felt my
              spirits lift with each step.
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
