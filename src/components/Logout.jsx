import React from "react";

function Logout({ handleLogout }) {
  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;