import React from "react";
import {Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Prevention from "./components/Prevention";
import Causes from "./components/Causes";
import Analytics from "./components/DataAnalytics";
import NigeriaDataAnalytics from "./components/NigeriaDataAnalytics";


const BaseRoute = () => (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/prevention/' component={Prevention} />
        <Route path='/causes/' component={Causes} />
        <Route path='/analytics/' component={Analytics} />
        <Route path='/nigeria-analytics/' component={NigeriaDataAnalytics} />



    </Switch>
)

export default BaseRoute