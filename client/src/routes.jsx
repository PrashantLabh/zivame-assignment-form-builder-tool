import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FormEditor from "./pages/FormEditor";
import FormList from "./pages/FormList";
import NotFound from "./pages/NotFound";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={FormList}/>
                <Route path="/forms" component={FormList}/>
                <Route path="/form/:id" component={FormEditor}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;