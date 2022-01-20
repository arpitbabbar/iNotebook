import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const noteInitial = []
  const [notes, setnotes] = useState(noteInitial)

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes//fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzRkOGU5ZGU1ZTZmMWNlZmFiMzE1In0sImlhdCI6MTY0MTI0MDI0N30.xSg80VfsOIUs73-tD92Moi45ehy5b7fyGMOWQsdvVus"
      },
    })
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a Note");

    const response = await fetch(`${host}/api/notes//addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzRkOGU5ZGU1ZTZmMWNlZmFiMzE1In0sImlhdCI6MTY0MTI0MDI0N30.xSg80VfsOIUs73-tD92Moi45ehy5b7fyGMOWQsdvVus"
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    })
    const note = await response.json();
    setnotes(notes.concat(note));
    //concat - returns an array
    //push -  updates an array

  }

  //Delete a Note
  const deleteNote = async (id) => {
    console.log("Deleting the note with id:_ " + id);
    
    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzRkOGU5ZGU1ZTZmMWNlZmFiMzE1In0sImlhdCI6MTY0MTI0MDI0N30.xSg80VfsOIUs73-tD92Moi45ehy5b7fyGMOWQsdvVus"
      },
    })
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => { return note._id !== id });
    setnotes(newNote);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzRkOGU5ZGU1ZTZmMWNlZmFiMzE1In0sImlhdCI6MTY0MTI0MDI0N30.xSg80VfsOIUs73-tD92Moi45ehy5b7fyGMOWQsdvVus"
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    })
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;