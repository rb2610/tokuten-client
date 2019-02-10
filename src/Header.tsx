import React from "react";
import LoggedInPanel from "./components/LoggedInPanel";
import LogoutButton from "./components/LogoutButton";
import AuthContext from "./contexts/AuthContext";

const Header = () => (
  <AuthContext.Consumer>
    {({ authenticatedUser, deauthenticateUser }) => (
      <header className="main-header">
        {authenticatedUser ? (
          <LoggedInPanel user={authenticatedUser}>
            <LogoutButton logoutCallback={deauthenticateUser} />
          </LoggedInPanel>
        ) : (
          ""
        )}
        <h1 className="main-title">Tokuten</h1>
      </header>
    )}
  </AuthContext.Consumer>
);

export default Header;
