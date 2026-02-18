// CORE
import React from "react";
import { Switch, Route } from "react-router-dom";

// COMPONENTS
import PrivateRoute from "./components/privateRoute/PrivateRoute";

// PAGES
import SignIn from "./pages/signIn/SignIn";
import Daycare from "./pages/daycare/Daycare";
// import Todos from "./pages/todos/Todos";

function Central() {
  return (
    <div className="Central">
      <Switch>
        <PrivateRoute path="/daycare">
          <Daycare />
        </PrivateRoute>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default Central;
