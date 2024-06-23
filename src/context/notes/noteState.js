import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import AlertContext from "../alert/alertContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_NOTES_HOST;
  const authToken = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState([]);

  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // function to fetch all notes
  const getNotes = async () => {
    try {
      let url = `${host}/fetchnotes`;
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
        console.log("error: ", allNotes.error);
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // function to add note
  const addNote = async (title, description, tag) => {
    // api call
    try {
      let url = `${host}/addnote`;
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
      let url = `${host}/deletenote/${id}`;
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
      let url = `${host}/updatenote/${id}`;
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
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };


  // function to delete all notes
const deleteAllNotes = async () => {
  try {
    let url = `${host}/deleteallnotes`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const deletedNotes = await response.json();
    console.log(deletedNotes);
    setNotes([]);
    showAlert("All Notes Deleted Successfully", "danger");
  } catch (error) {
    showAlert(`Error: ${error.message}`, "danger");
  }
};

// function to delete user account along with all notes
const deleteAccount = async () => {
  try {
    let url = `${process.env.REACT_APP_AUTH_HOST}/deleteaccount`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const data = await response.json();
    if (response.ok) {
      // Redirect to login or homepage after successful deletion
      window.location.href = '/login'; // Assuming '/login' is your login route
      localStorage.removeItem("auth-token");
    } else {
      showAlert(data.error || "Failed to delete account", "danger");
    }
  } catch (error) {
    showAlert(`Error: ${error.message}`, "danger");
  }
};

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, deleteAllNotes , deleteAccount }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;