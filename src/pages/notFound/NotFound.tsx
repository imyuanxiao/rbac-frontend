import React from 'react';
import LocalStoreUtil from "../../utils/LocalStoreUtil";

function NotFound() {

    LocalStoreUtil.removeSavedPath()

    return (
        <p>NotFound</p>
    );
}

export default NotFound;
