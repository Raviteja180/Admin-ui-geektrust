import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import ViewUsersList from "./components/ViewUsersList";
import SearchUsers from "./components/SearchUsers";

function App(){
    return (
        <div>
            <ViewUsersList />
        </div>
    )   
}
export default App;