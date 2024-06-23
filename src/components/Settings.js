import React, { useContext } from 'react';
import ThemeContext from '../context/theme/themeContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Settings</h1>
      <p>Only accessible if logged in.</p>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="themeSwitch"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <label className="form-check-label" htmlFor="themeSwitch">
          Toggle Dark/Light Mode
        </label>
      </div>
    </div>
  );
};

export default Settings;
