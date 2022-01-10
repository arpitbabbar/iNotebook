import React, {useContext, useState} from 'react'
import noteC from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteC);
    const {addNote} = context;
    const [note, setnote] = useState({title: "", description:"", tag:"default"});
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);

    }

    const handleChange = (e)=>  {
        setnote({...note, [e.target.name]: e.target.value})
        
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add A Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="Title" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
