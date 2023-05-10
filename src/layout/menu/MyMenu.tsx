import React from 'react';
import { Menu, } from "antd";
import {getMenuNodes, MenuItem, menuItems} from "../../router/menuConfig";

function MyMenu() {

    const items : MenuItem[] = getMenuNodes(menuItems)

    return (
        <div>
            {/*logo*/}
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu
                theme="dark"
                defaultSelectedKeys={['dashboard']}
                mode="inline"
                items={items}
            >
            </Menu>
        </div>
    );
}

export default MyMenu;
