import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useDemo } from "../../contexts/DemoContext";

function PrivateRoute({ children, ...remainingProps }) {
  const auth = useSelector((state) => state.firebase.auth);
  const { isDemoMode } = useDemo();

  const isGranted = (isLoaded(auth) && !isEmpty(auth)) || isDemoMode;

  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        isGranted ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
