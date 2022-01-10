import React, {useContext} from 'react'
import noteC from "../context/notes/noteContext";

const Noteitem = (props) => {

    const { note } = props;
    const context = useContext(noteC);
    const {deleteNote} = context;

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fas fa-edit mx-3"></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
