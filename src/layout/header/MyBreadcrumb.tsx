import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function MyBreadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((pathname) => pathname);

    const items = [
        { title: 'Home', href: '/index' },
        ...pathnames.map((pathname, index) => ({
            title: index === pathnames.length - 1 ? (
                <span>{pathname}</span>
            ) : (
                <>{pathname}</>
            ),
            href: `/${pathnames.slice(0, index + 1).join('/')}`,
        })),
    ];

    return <Breadcrumb items={items} />;
}

export default MyBreadcrumb;