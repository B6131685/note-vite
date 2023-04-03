import { useState, useRef } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard/NoteCard";

export interface INote {
  date: string;
  note: string;
}

function App() {
  const [notes, setNote] = useState<INote[]>([]);
  const [search, setSearch] = useState<string>('')
  const searchEl = useRef<HTMLInputElement | null>(null);

  //React.KeyboardEventHandler<HTMLInputElement>
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter'){
      console.log('adads');
      
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setSearch(e.target.value)
  }
  return (
    <div className="container">
      <div className="search">
        Search: <input ref={searchEl} type="text" onKeyDown={handleKeyDown} onChange={handleChange}/>
      </div>
      <section>
        {
          notes.map((item, index)=>{
          if(item.note.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
            return <NoteCard key={item.date} indexNote={index} setArrayNotes={setNote} text={item.note} />
          }
          return
        })
        }
        <NoteCard variant="createNote" indexNote={null} setArrayNotes={setNote}/>
      </section>
    </div>
  );
}

export default App;
