import { useState, useRef } from "react";
import s from "./index.module.css";
import { INote } from "../../App";
import moment from "moment";  
type Props = {
  variant?: "createNote" | "listNote";
  text?: string;
  indexNote:number | null;
  // setNote: (note:INote[]) => void
  setArrayNotes: React.Dispatch<React.SetStateAction<INote[]>>
};

const NoteCard = ({
  variant = "listNote",
  text = "",
  setArrayNotes,
  indexNote
}: Props) => {
  const [oldNote, setOldNote] = useState<string>('');
  const [note, setNote] = useState<string>(text);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const isListNote = variant === "listNote";
  const [disableEdit, setDisableEdit] = useState<boolean>(isListNote);

  function newNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(e.target.value);
  }

  function addNewNote() {
    if (!note) return;
    setArrayNotes(prev => [...prev, {date: moment().format('MMMM Do YYYY, h:mm:ss a'), note}])
    setNote("");
  }

  function deleteNote(){
    setArrayNotes(prev => {
      const temp = [...prev]
      if(indexNote !== null && indexNote !== undefined){
        temp.splice(indexNote,1)
      }
      return temp
    })
  }

  async function editNote(){
    setOldNote(note)
    await setDisableEdit(false);
    textAreaRef.current?.focus();
    textAreaRef.current?.setSelectionRange(note.length, note.length)
  }

  function cancleEdit(){
    setDisableEdit(true);
    setNote(oldNote)
  }

  function confirm(){
    setDisableEdit(true);
  }

  return (
    <div data-style={variant} className={s.conatainer}>
      <div className={s.text}>
        <textarea
          placeholder="write somthing ..."
          disabled={disableEdit}
          value={note}
          onChange={newNote}
          ref={textAreaRef}
        />
      </div>
      {isListNote ? (
        <footer>
          {
            disableEdit ?
            <>
              <i className="fa-solid fa-pen-to-square" onClick={editNote}></i>
              <i className="fa-solid fa-trash" onClick={deleteNote}></i>
            </>
            : 
            <>
              <i className="fa-sharp fa-solid fa-circle-xmark" onClick={cancleEdit}></i>
              <i className="fa-sharp fa-solid fa-circle-check" onClick={confirm}></i>
            </>
          }
          
        </footer>
      ) : (
        <footer>
          <i
            id="addIcon"
            className="fa-solid fa-square-plus"
            onClick={addNewNote}
          ></i>
        </footer>
      )}
    </div>
  );
};

export default NoteCard;
