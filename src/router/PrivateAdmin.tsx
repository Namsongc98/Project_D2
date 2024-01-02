import React from "react";
import { Outlet } from "react-router-dom";

function PrivateAdmin(): React.ReactElement | null  {
    const privateRouter: boolean = true
    return (privateRouter ? <Outlet/> : <></>);
}

export default PrivateAdmin;
