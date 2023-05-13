import LocalStoreUtil from "./LocalStoreUtil";
import {Option, Role} from "../api/types";

/**
 *
 */
export const getRoleOptions = (): Option[] => {
    const roleList = LocalStoreUtil.getAllRoles();
    return roleList.map((role: Role) => ({
        label: role.name,
        value: role.id,
    }));
};

