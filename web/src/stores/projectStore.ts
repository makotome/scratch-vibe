import { create } from 'zustand';
import type { Project, Stage, Script } from '../types';

interface ProjectState {
  project: Project | null;
  stage: Stage;
  scripts: Script[];
  isDirty: boolean;
  isLoading: boolean;

  // Actions
  setProject: (project: Project) => void;
  updateProject: (updates: Partial<Project>) => void;
  setStage: (stage: Partial<Stage>) => void;
  setScripts: (scripts: Script[]) => void;
  addScript: (script: Script) => void;
  removeScript: (scriptId: string) => void;
  updateScript: (scriptId: string, updates: Partial<Script>) => void;
  markDirty: () => void;
  markClean: () => void;
  setLoading: (loading: boolean) => void;
}

const defaultStage: Stage = {
  id: 'stage',
  width: 480,
  height: 360,
  x: 0,
  y: 0,
  costumes: [],
  currentCostumeIndex: 0,
  sounds: [],
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: null,
  stage: defaultStage,
  scripts: [],
  isDirty: false,
  isLoading: false,

  setProject: (project) => set({ project }),

  updateProject: (updates) =>
    set((state) => ({
      project: state.project ? { ...state.project, ...updates } : null,
      isDirty: true,
    })),

  setStage: (stageUpdates) =>
    set((state) => ({
      stage: { ...state.stage, ...stageUpdates },
      isDirty: true,
    })),

  setScripts: (scripts) => set({ scripts, isDirty: true }),

  addScript: (script) =>
    set((state) => ({
      scripts: [...state.scripts, script],
      isDirty: true,
    })),

  removeScript: (scriptId) =>
    set((state) => ({
      scripts: state.scripts.filter((s) => s.id !== scriptId),
      isDirty: true,
    })),

  updateScript: (scriptId, updates) =>
    set((state) => ({
      scripts: state.scripts.map((s) =>
        s.id === scriptId ? { ...s, ...updates } : s
      ),
      isDirty: true,
    })),

  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
