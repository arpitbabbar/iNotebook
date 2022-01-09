import React, { useContext } from 'react'
import noteC from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(noteC);
    const {notes, addNote} = context;
    return (
        <>
        <AddNote />
        <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note} />
        })}
    </div>
    </>
    )
}

export default Notes
