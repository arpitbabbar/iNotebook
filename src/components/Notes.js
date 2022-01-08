import React, { useContext } from 'react'
import noteC from "../context/notes/noteContext";
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(noteC);
    const {notes, setnotes} = context;
    return (
        
        <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note} />
        })}
    </div>
    )
}

export default Notes
