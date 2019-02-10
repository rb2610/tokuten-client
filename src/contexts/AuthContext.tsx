import React from "react";
import AuthUser from "../dataTypes/AuthUser";

type AuthContextInterface = {
  authenticatedUser: AuthUser | undefined;
  authenticateUser(user: AuthUser): void;
  deauthenticateUser(): void;
};

export default React.createContext<AuthContextInterface>({
  // tslint:disable-next-line:no-empty
  authenticateUser: () => {},
  authenticatedUser: undefined,
  // tslint:disable-next-line:no-empty
  deauthenticateUser: () => {}
});