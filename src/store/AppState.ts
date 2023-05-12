import { create } from 'zustand';

interface AppState {
}

// 定义修改方法
const useAppStore = create<AppState>((set, get) => ({
}));

// 导出方法
export { useAppStore };
export type { AppState };
