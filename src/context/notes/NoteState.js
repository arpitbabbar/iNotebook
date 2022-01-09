import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const noteInitial = [
        {
          "_id": "61d5ac1a618eaqq7182dfb32c7q9",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },
        {
          "_id": "61d5ac1b618e7182 cdfwqesa32c7b",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:59.313Z",
          "__v": 0
        },
        {
          "_id": "61d5ac1a618e7182qwdfb32cb79",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },
        {
          "_id": "61d5ac1a618e7182ddafmb32c79",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },{
          "_id": "61d5ac1a618e7182dfdasb432c79",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },{
          "_id": "61d5ac1a618de7182dfb32c34579",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },{
          "_id": "61d5ac1a618e7ds182dfb32ciop79",
          "user": "61d34d8e9de5e6f1cefab315",
          "title": "Song",
          "description": "Insaan bhi kya cheez h!",
          "tag": "gumaan",
          "date": "2022-01-05T14:32:58.410Z",
          "__v": 0
        },
      ]
      const [notes, setnotes] = useState(noteInitial)

      //Add a note
      const addNote = (title, description, tag) => {
        console.log("Adding a Note");

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
      const deleteNote = () => {

      }

      //Edit a Note
      const editNote = () => {

      }


    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;