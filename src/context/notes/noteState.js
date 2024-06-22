import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import AlertContext from "../alert/alertContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MzEzNDUxZGVjZmRhOTFjMDc3NzA2In0sImlhdCI6MTcxODg2MjE0NX0.VEfpCbCDKpptgcUpDGQ9wmFpadvP6lZ0vtxLFB75iIY";

  const [notes, setNotes] = useState([]);

  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // function to fetch all notes
  const getNotes = async () => {
    try {
      let url = `${host}/api/notes/fetchnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token": authToken,
        },
      });
      const allNotes = await response.json();

      if (response.ok) {
        showAlert("Fetched all notes", "info");
        setNotes(allNotes);
      }else {
        showAlert(`Server Error: ${allNotes.error}`, "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // function to add note
  const addNote = async (title, description, tag) => {
    // api call
    try {
      let url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });
      const note = await response.json();
      if (response.ok) {
        setNotes(notes.concat(note));
        showAlert("Note Added Successfully", "success");
      } else {
        showAlert(`Server Error: ${note.errors[0].msg}`, "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // function to delete note
  const deleteNote = async (id) => {
    try {
      let url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const deletedNote = await response.json();
      const newNotes = notes.filter((note) => {
        return note._id !== deletedNote.noteId;
      });
      setNotes(newNotes);
      showAlert("Note Deleted Successfully", "danger");
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // function to edit note
  const editNote = async (id, title, description, tag) => {
    try {
      let url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });
      const serverResponse = await response.json();
      console.log(response);
      if (response.ok) {
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          if (newNotes[index]._id === serverResponse._id) {
            newNotes[index].title = serverResponse.title;
            newNotes[index].description = serverResponse.description;
            newNotes[index].tag = serverResponse.tag;
            break;
          }
        }
        setNotes(newNotes);
        showAlert("Note Edited Successfully", "warning");
      }
      else {
        showAlert(`Server Error: ${serverResponse.errors[0].msg}`, "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
