import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { GrEdit } from "react-icons/gr";

type Note = {
  content: string;
  createdAt: string;
  id: string;
};

type FormattedDateProps = {
  note: Note;
};

type NoteProps = {
  notes: Note[];
  setCreatingNewNote: (boolean: boolean) => void;
  editNote: (note: Note) => void;
};

export const Note = ({ notes, setCreatingNewNote, editNote }: NoteProps) => {
  const FormattedDate = ({ note }: FormattedDateProps) => {
    const date = dayjs(parseInt(note.createdAt));
    const month = date.format("MMMM");
    const day = date.format("DD");
    const weekDay = date.format("dddd");
    return (
      <div>
        <p>{month}</p>
        <div className="text-xl font-bold">
          {day}
          <span className=" px-3 font-thin">{weekDay}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between p-[10px] w-fit">
        <h2 className="text-2xl font-bold text-left mr-[30px]">
          Journal Entries
        </h2>
        <button
          onClick={() => setCreatingNewNote(true)}
          className="rounded-md text-sm font-medium border
        border-input bg-background hover:bg-accent hover:text-accent-foreground
        h-10 px-4 py-2 "
        >
          New Journal Entry
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 overflow-x-auto max-h-[500px] items-start justify-center p-[14px] ">
        {notes.map((note: Note) => (
          <div
            key={note.id}
            className="flex items-start justify-between border rounded-xl p-3 bg-red-200 border-gray-800 shadow-[4px_4px_6px_1px_#00625a66]"
          >
            <div className="flex justify-between items-center w-[100%]">
              <FormattedDate note={note} />
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "black" }}
              />
              <p className="w-[85%] text-left p-3">{note.content}</p>
            </div>
            <div onClick={() => editNote(note)} className="cursor-pointer">
              <GrEdit style={{ fontSize: "20px" }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
