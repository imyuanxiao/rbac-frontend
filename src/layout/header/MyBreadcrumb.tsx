import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function MyBreadcrumb() {

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((pathname) => pathname);

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/">首页</Link>
            </Breadcrumb.Item>
            {pathnames.map((pathname, index) => (
                <Breadcrumb.Item key={pathname}>
                    {index === pathnames.length - 1 ? (
                        <span>{pathname}</span>
                    ) : (
                        <>{pathname}</>
                    )}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default MyBreadcrumb;
