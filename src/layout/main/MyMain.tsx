import React  from 'react';
import { Routes} from "react-router-dom";
import {getFilteredPage, routeItems} from "../../router/RouteConfig";

function MyMain() {

    return (
        <Routes>
            {getFilteredPage([...routeItems])}
        </Routes>
    );
}

export default MyMain;
