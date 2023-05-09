import { create } from 'zustand';

interface AppState {
    isAuthenticated: boolean;
    savedPath: string;
    setSavedPath: (savedPath: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// 定义修改方法
const useAppStore = create<AppState>((set, get) => ({
    isAuthenticated: false,
    savedPath: '',
    setSavedPath: (savedPath: string) => set((state) => ({ ...state, savedPath })),
    setIsAuthenticated: (isAuthenticated: boolean) => set((state) => ({ ...state, isAuthenticated })),
}));

// 导出方法
export { useAppStore };
export type { AppState };
