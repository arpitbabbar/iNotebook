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
    const json = response.json();
    console.log(json);


    const note = {
      "_id": "61d5ac1a618e7ds182dfb32ciop79",
      "user": "61d34d8e9de5e6f1cefab315",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-01-05T14:32:58.410Z",
      "__v": 0
    }
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
    const json = response.json();
    console.log(json);

    const newNote = notes.filter((note) => { return note._id !== id });
    setnotes(newNote);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzRkOGU5ZGU1ZTZmMWNlZmFiMzE1In0sImlhdCI6MTY0MTI0MDI0N30.xSg80VfsOIUs73-tD92Moi45ehy5b7fyGMOWQsdvVus"
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    })
    const json = response.json();
    console.log(json);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;