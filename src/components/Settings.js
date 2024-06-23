import React, { useContext } from 'react';
import { FaTrash, FaUserMinus } from 'react-icons/fa'; // Import icons
import NoteContext from '../context/notes/noteContext';

const Settings = () => {
  const noteContext = useContext(NoteContext);
  const { deleteAllNotes, deleteAccount } = noteContext;

  const handleDeleteAllNotes = () => {
    if (window.confirm('Are you sure you want to delete all notes?')) {
      deleteAllNotes();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccount();
      localStorage.removeItem('auth-token');
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center mb-4'>Settings</h1>
      <p className='text-muted text-center'>Only accessible if logged in.</p>
      <div className='danger-zone p-3 mb-4'>
        <h2 className='text-danger mb-3'>Danger Zone</h2>
        <div className='table-responsive'>
          <table className='table'>
            <tbody>
              <tr>
                <td>Delete my all notes:</td>
                <td>
                  <button className='btn btn-danger' onClick={handleDeleteAllNotes}>
                    <FaTrash className='me-1' /> Delete All Notes
                  </button>
                </td>
              </tr>
              <tr>
                <td>Not need My Notebook anymore:</td>
                <td>
                  <button className='btn btn-danger' onClick={handleDeleteAccount}>
                    <FaUserMinus className='me-1' /> Delete Account
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
