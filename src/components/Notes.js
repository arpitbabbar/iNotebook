import React, { useContext, useEffect, useRef, useState } from 'react'
import noteC from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(noteC);
    const { notes, getNotes, editNote } = context;
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setnote] = useState({eid: "",etitle: "", edescription:"", etag:"default"});
    useEffect(() => {
        getNotes();
         // eslint-disable-next-line 
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleChange = (e)=>  {
        setnote({...note, [e.target.name]: e.target.value})
        
    }

    const handleClick = (e) => {
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="Title" onChange={handleChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='container mx-3 h5'>
                {notes.length === 0 && 'No Notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
