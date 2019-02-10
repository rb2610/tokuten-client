"use strict";

import React, { ComponentType, ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import AuthContext from "src/contexts/AuthContext";

interface AuthenticatedRouteProps extends RouteProps {
  component: any;
}

const renderAuthentication = (Component: ComponentType<any>) => (
  props: any
) => {
  return (
    <AuthContext.Consumer>
      {({ authenticatedUser }) => {
        if (authenticatedUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    </AuthContext.Consumer>
  );
};

export default function AuthenticatedRoute(
  props: AuthenticatedRouteProps
): ReactElement<Route> {
  const { component: Component, ...rest } = props;

  return <Route {...rest} render={renderAuthentication(Component)} />;
}
