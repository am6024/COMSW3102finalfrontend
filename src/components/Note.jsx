import React from "react";

function Notes(props) {
  function Click() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={Click}>DELETE</button>
    </div>
  );
}

export default Notes;