import React from "react";
import Notes from "../components/Notes";

function Home() {
  document.title = "Home - My Notebook";
  return (
    <div>
      <Notes />
    </div>
  );
}

export default Home;