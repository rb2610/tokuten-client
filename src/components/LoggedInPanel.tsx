import React, { ReactNode } from "react";
import AuthUser from "src/dataTypes/AuthUser";

type LoggedInPanelProps = {
  children: ReactNode;
  user: AuthUser;
};

const LoggedInPanel = (props: LoggedInPanelProps) => (
  <div className="logged-in-panel">
    <span>Logged in as: {props.user.username} </span>
    <br />
    {props.children}
  </div>
);

export default LoggedInPanel;
