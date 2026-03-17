import { Thread } from './Thread';
import { Sprite } from '../types';
import { useSpriteStore } from '../stores';

export class Runtime {
  private threads: Map<string, Thread> = new Map();
  private tempo: number = 60;
  private targetFPS: number = 30;
  private running: boolean = false;
  private redrawRequested: boolean = false;
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private broadcastMessages: Map<string, string[]> = new Map();

  constructor() {
    this.lastTime = performance.now();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.clearAllThreads();
  }

  private tick = () => {
    if (!this.running) return;

    const now = performance.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    // Run all threads
    this.threads.forEach((thread) => {
      if (thread.running && !thread.yield) {
        this.executeThread(thread);
      }
    });

    // Request redraw if needed
    if (this.redrawRequested) {
      this.redrawRequested = false;
    }

    // Schedule next tick
    const frameTime = 1000 / this.targetFPS;
    const elapsed = performance.now() - now;
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private executeThread(thread: Thread) {
    // Execute blocks in the thread
    // This is a simplified implementation
    thread.yield = true;
  }

  private clearAllThreads() {
    this.threads.forEach((thread) => {
      thread.running = false;
    });
    this.threads.clear();
  }

  // Thread management
  createThread(scriptId: string, spriteId: string): Thread {
    const thread = new Thread(scriptId, spriteId);
    this.threads.set(thread.id, thread);
    return thread;
  }

  removeThread(threadId: string) {
    const thread = this.threads.get(threadId);
    if (thread) {
      thread.running = false;
      this.threads.delete(threadId);
    }
  }

  // Broadcast messages
  broadcast(message: string) {
    const currentThreads = Array.from(this.threads.values());
    const waitingThreads = this.broadcastMessages.get(message) || [];
    this.broadcastMessages.set(message, [...waitingThreads, ...currentThreads.map(t => t.id)]);
  }

  waitForBroadcast(message: string): Promise<void> {
    return new Promise((resolve) => {
      // Wait for the broadcast to be received
      setTimeout(resolve, 0);
    });
  }

  // Redraw
  requestRedraw() {
    this.redrawRequested = true;
  }

  // Tempo
  setTempo(tempo: number) {
    this.tempo = Math.max(20, Math.min(300, tempo));
  }

  getTempo(): number {
    return this.tempo;
  }

  // Wait utility
  wait(seconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  isRunning(): boolean {
    return this.running;
  }
}

// Singleton instance
export const runtime = new Runtime();
