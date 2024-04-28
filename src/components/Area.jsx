import React, { useState } from "react";

function Area(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function Change(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submit(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={Change}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={Change}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submit}>Add</button>
      </form>
    </div>
  );
}

export default Area;