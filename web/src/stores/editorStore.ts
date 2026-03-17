import { create } from 'zustand';

export type ToolboxCategory = 'motion' | 'looks' | 'sound' | 'events' | 'control' | 'sensing' | 'operators' | 'variables' | 'myBlocks';

interface EditorState {
  selectedToolboxCategory: ToolboxCategory;
  zoom: number;
  isRunning: boolean;
  isPaused: boolean;
  isToolboxVisible: boolean;
  isStageMinimized: boolean;

  // Actions
  setSelectedToolboxCategory: (category: ToolboxCategory) => void;
  setZoom: (zoom: number) => void;
  startRunning: () => void;
  stopRunning: () => void;
  pauseRunning: () => void;
  resumeRunning: () => void;
  toggleToolbox: () => void;
  toggleStage: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedToolboxCategory: 'motion',
  zoom: 1,
  isRunning: false,
  isPaused: false,
  isToolboxVisible: true,
  isStageMinimized: false,

  setSelectedToolboxCategory: (category) =>
    set({ selectedToolboxCategory: category }),
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(2, zoom)) }),

  startRunning: () => set({ isRunning: true, isPaused: false }),
  stopRunning: () => set({ isRunning: false, isPaused: false }),
  pauseRunning: () => set({ isPaused: true }),
  resumeRunning: () => set({ isPaused: false }),

  toggleToolbox: () => set((state) => ({ isToolboxVisible: !state.isToolboxVisible })),
  toggleStage: () => set((state) => ({ isStageMinimized: !state.isStageMinimized })),
}));
