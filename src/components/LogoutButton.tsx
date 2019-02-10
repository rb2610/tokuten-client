import React from "react";

type LogoutButtonInterface = {
  logoutCallback: () => void;
};

const LogoutButton = (props: LogoutButtonInterface) => (
  <button className="logout-button" onClick={props.logoutCallback}>
    Logout
  </button>
);

export default LogoutButton;
