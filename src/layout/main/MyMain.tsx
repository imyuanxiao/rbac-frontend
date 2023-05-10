import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "../../pages/index/Dashboard";
import Account from "../../pages/user/Account";
import Organization from "../../pages/user/Organization";
import Role from "../../pages/system/Role";
import Permission from "../../pages/system/Permission";
import Setting from "../../pages/system/Setting";
import Profile from "../../pages/profile/Profile";

function MyMain() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/user/account" element={<Account/>} />
            <Route path="/user/organization" element={<Organization/>} />
            <Route path="/system/role" element={<Role/>} />
            <Route path="/system/permission" element={<Permission/>} />
            <Route path="/system/setting" element={<Setting/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    );
}

export default MyMain;
