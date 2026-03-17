import { create } from 'zustand';

interface RuntimeState {
  tempo: number; // BPM
  threads: Map<string, any>;
  targetFPS: number;
  redrawRequested: boolean;
  broadcastMessages: Map<string, string[]>;

  // Actions
  setTempo: (tempo: number) => void;
  addThread: (threadId: string, thread: any) => void;
  removeThread: (threadId: string) => void;
  clearThreads: () => void;
  requestRedraw: () => void;
  clearRedraw: () => void;
  broadcast: (message: string, threadId: string) => void;
  waitForThread: (threadId: string, ms: number) => Promise<void>;
}

export const useRuntimeStore = create<RuntimeState>((set, get) => ({
  tempo: 60,
  threads: new Map(),
  targetFPS: 30,
  redrawRequested: false,
  broadcastMessages: new Map(),

  setTempo: (tempo) => set({ tempo: Math.max(20, Math.min(300, tempo)) }),

  addThread: (threadId, thread) =>
    set((state) => {
      const newThreads = new Map(state.threads);
      newThreads.set(threadId, thread);
      return { threads: newThreads };
    }),

  removeThread: (threadId) =>
    set((state) => {
      const newThreads = new Map(state.threads);
      newThreads.delete(threadId);
      return { threads: newThreads };
    }),

  clearThreads: () => set({ threads: new Map() }),

  requestRedraw: () => set({ redrawRequested: true }),
  clearRedraw: () => set({ redrawRequested: false }),

  broadcast: (message, threadId) =>
    set((state) => {
      const newMessages = new Map(state.broadcastMessages);
      const current = newMessages.get(message) || [];
      newMessages.set(message, [...current, threadId]);
      return { broadcastMessages: newMessages };
    }),
}));
