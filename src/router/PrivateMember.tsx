import React from "react";
import { Outlet } from "react-router-dom";

const PrivateMember = (): React.ReactElement | null => {
    const privateRouter: boolean = true
    return (privateRouter ? <Outlet /> : <></>);
}

export default PrivateMember;