export class Thread {
  public id: string;
  public scriptId: string;
  public spriteId: string;
  public pc: number = 0;
  public running: boolean = true;
  public yield: boolean = false;
  public stack: Array<{ pc: number, stackFrame: any }> = [];
  public tempo: number = 60;

  constructor(scriptId: string, spriteId: string) {
    this.id = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.scriptId = scriptId;
    this.spriteId = spriteId;
  }

  start() {
    this.running = true;
    this.pc = 0;
  }

  stop() {
    this.running = false;
  }

  pause() {
    this.running = false;
  }

  resume() {
    this.running = true;
  }

  pushStack(stackFrame: any) {
    this.stack.push({ pc: this.pc, stackFrame });
  }

  popStack(): any {
    const frame = this.stack.pop();
    if (frame) {
      this.pc = frame.pc;
      return frame.stackFrame;
    }
    return null;
  }

  isActive(): boolean {
    return this.running;
  }

  setTempo(tempo: number) {
    this.tempo = Math.max(20, Math.min(300, tempo));
  }
}
