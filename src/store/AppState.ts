import { create } from 'zustand';

import { User } from '../api/types';

interface AppState {
    isAuthenticated: boolean;
    user: User;
    savedPath: string;
    setSavedPath: (savedPath: string) => void;
    setUser: (user: User) => void;
    getUser: () => User;
    getUserRoles: () => number[];
    getUserPermissions: () => number[];
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// 定义修改方法
const useAppStore = create<AppState>((set, get) => ({
    isAuthenticated: false,
    user: {
        id: '',
        username: '',
        phone: '',
        email: '',
        avatar: '',
        roles: [],
        permissions: [],
    },
    savedPath: '',
    setSavedPath: (savedPath: string) => set((state) => ({ ...state, savedPath })),
    getUserRoles: () => get().user.roles,
    getUserPermissions: () => get().user.permissions,
    getUser: () => get().user,
    setUser: (user: User) => set((state) => ({ ...state, user })),
    setIsAuthenticated: (isAuthenticated: boolean) => set((state) => ({ ...state, isAuthenticated })),
}));

// 导出方法
export { useAppStore };
export type { AppState };
