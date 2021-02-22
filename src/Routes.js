import React from "react";
import NewOS from "./NewOS";
import ViewOS from "./ViewOS";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/NewOS">
        <NewOS />
      </Route>
      <Route path="/ViewOS">
        <ViewOS />
      </Route>
    </Switch>
  );
}
