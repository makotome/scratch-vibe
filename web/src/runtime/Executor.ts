import type { Script, ExecutableBlock } from './BlockParser';
import { useSpriteStore, useRuntimeStore } from '../stores';

/**
 * Execution context for running scripts
 */
interface ExecutionContext {
  script: Script;
  pc: number;
  running: boolean;
  yield: boolean;
  stack: Array<{ pc: number, loopCount?: number }>;
}

/**
 * Executor for running parsed block scripts
 */
export class Executor {
  private scripts: Script[] = [];
  private contexts: Map<string, ExecutionContext> = new Map();
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private lastTime: number = 0;

  // Sprite store actions
  private getSpriteStore() {
    return useSpriteStore.getState();
  }

  // Runtime store actions
  private getRuntimeStore() {
    return useRuntimeStore.getState();
  }

  /**
   * Load scripts for execution
   */
  loadScripts(scripts: Script[]) {
    this.scripts = scripts;
  }

  /**
   * Start execution (green flag clicked)
   */
  start() {
    console.log('Executor.start() called, scripts:', this.scripts.length);
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();

    // Create execution contexts for all scripts triggered by green flag
    for (const script of this.scripts) {
      console.log('Script:', script.eventType, 'blocks:', script.blocks.length);
      if (script.eventType === 'greenFlag') {
        const context: ExecutionContext = {
          script,
          pc: 0,
          running: true,
          yield: false,
          stack: [],
        };
        this.contexts.set(script.id, context);
        console.log('Created context for script:', script.id);
      }
    }

    // Start the execution loop
    this.tick();
  }

  /**
   * Stop execution
   */
  stop() {
    this.isRunning = false;
    this.contexts.clear();

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Request redraw to show stopped state
    this.getRuntimeStore().requestRedraw();
  }

  /**
   * Main execution loop
   */
  private tick = () => {
    if (!this.isRunning) return;

    const now = performance.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    console.log('tick() running, contexts:', this.contexts.size);

    // Execute each context
    let anyRunning = false;
    let anyYielded = false;
    for (const [scriptId, context] of this.contexts) {
      console.log('  Context:', scriptId, 'running:', context.running, 'yield:', context.yield, 'pc:', context.pc);
      if (context.running && !context.yield) {
        this.executeContext(context, deltaTime);
        anyRunning = true;
      }
      // Keep loop running if there are yielded contexts (they will resume via setTimeout)
      if (context.running && context.yield) {
        anyYielded = true;
      }
    }

    // Request redraw
    this.getRuntimeStore().requestRedraw();

    if (anyRunning || anyYielded) {
      console.log('  Requesting next frame, anyRunning:', anyRunning, 'anyYielded:', anyYielded);
      this.animationFrameId = requestAnimationFrame(this.tick);
    } else {
      console.log('  All contexts finished, stopping');
      this.stop();
    }
  };

  /**
   * Execute a single context
   */
  private executeContext(context: ExecutionContext, deltaTime: number) {
    const { script, pc } = context;

    // Check if we've reached the end of the script
    if (pc >= script.blocks.length) {
      context.running = false;
      return;
    }

    const block = script.blocks[pc];
    if (!block) {
      context.running = false;
      return;
    }

    // Execute the block
    this.executeBlock(block, context);
  }

  /**
   * Execute a single block
   */
  private executeBlock(block: ExecutableBlock, context: ExecutionContext) {
    const spriteStore = useSpriteStore.getState();
    const { sprites, selectedSpriteId } = spriteStore;
    console.log('executeBlock:', block.opcode, 'spriteId:', selectedSpriteId, 'sprites:', sprites.length);
    const sprite = sprites.find(s => s.id === selectedSpriteId);

    console.log('  Sprite found:', !!sprite, 'direction:', sprite?.direction);
    if (!sprite) {
      context.pc++;
      return;
    }

    try {
      switch (block.opcode) {
        // Motion blocks
        case 'motion_move':
          this.executeMotionMove(block, sprite, spriteStore);
          break;
        case 'motion_turnright':
          this.executeMotionTurnRight(block, sprite, spriteStore);
          break;
        case 'motion_turnleft':
          this.executeMotionTurnLeft(block, sprite, spriteStore);
          break;
        case 'motion_goto':
          this.executeMotionGoTo(block, sprite, spriteStore);
          break;
        case 'motion_glideto':
          this.executeMotionGlideTo(block, sprite, spriteStore);
          break;
        case 'motion_changexby':
          this.executeMotionChangeXBy(block, sprite, spriteStore);
          break;
        case 'motion_setx':
          this.executeMotionSetX(block, sprite, spriteStore);
          break;
        case 'motion_changeyby':
          this.executeMotionChangeYBy(block, sprite, spriteStore);
          break;
        case 'motion_sety':
          this.executeMotionSetY(block, sprite, spriteStore);
          break;
        case 'motion_ifonedgebounce':
          this.executeMotionIfOnEdgeBounce(block, sprite, spriteStore);
          break;
        case 'motion_pointindirection':
          this.executeMotionPointInDirection(block, sprite, spriteStore);
          break;

        // Looks blocks
        case 'looks_show':
          this.executeLooksShow(sprite, spriteStore);
          break;
        case 'looks_hide':
          this.executeLooksHide(sprite, spriteStore);
          break;
        case 'looks_changesizeby':
          this.executeLooksChangeSizeBy(block, sprite, spriteStore);
          break;
        case 'looks_setsize':
          this.executeLooksSetSize(block, sprite, spriteStore);
          break;
        case 'looks_nextcostume':
          this.executeLooksNextCostume(sprite, spriteStore);
          break;

        // Control blocks
        case 'control_wait':
          this.executeControlWait(block, context);
          return; // Don't advance PC yet

        case 'control_forever':
          this.executeControlForever(block, context);
          return; // Don't advance PC yet, will loop back

        case 'control_repeat':
          this.executeControlRepeat(block, context);
          return; // Don't advance PC yet

        // Event blocks
        case 'event_broadcast':
          this.executeEventBroadcast(block);
          break;

        default:
          console.log('Unknown opcode:', block.opcode);
      }
    } catch (error) {
      console.error('Error executing block:', error);
    }

    // Move to next block
    context.pc++;
  }

  // Motion executors
  private executeMotionMove(block: ExecutableBlock, sprite: any, store: any) {
    const steps = Number(block.fields.STEPS) || 10;
    const radians = (sprite.direction - 90) * (Math.PI / 180);
    const dx = steps * Math.cos(radians);
    const dy = steps * Math.sin(radians);

    store.updateSprite(sprite.id, {
      x: sprite.x + dx,
      y: sprite.y + dy,
    });
  }

  private executeMotionTurnRight(block: ExecutableBlock, sprite: any, store: any) {
    const degrees = Number(block.fields.DEGREES) || 15;
    const newDirection = (sprite.direction + degrees + 360) % 360;
    store.updateSprite(sprite.id, { direction: newDirection, rotation: newDirection });
  }

  private executeMotionTurnLeft(block: ExecutableBlock, sprite: any, store: any) {
    const degrees = Number(block.fields.DEGREES) || 15;
    const newDirection = (sprite.direction - degrees + 360) % 360;
    store.updateSprite(sprite.id, { direction: newDirection, rotation: newDirection });
  }

  private executeMotionGoTo(block: ExecutableBlock, sprite: any, store: any) {
    const target = block.fields.TO;
    let x = sprite.x;
    let y = sprite.y;

    if (target === 'CENTER') {
      x = 0;
      y = 0;
    } else if (target === 'MOUSE') {
      // Get mouse position (simplified)
      x = 0;
      y = 0;
    }
    // RANDOM would need random position generation

    store.updateSprite(sprite.id, { x, y });
  }

  private executeMotionGlideTo(block: ExecutableBlock, sprite: any, store: any) {
    // Glide is async - for now, just set the target position
    const x = Number(block.fields.X) || 0;
    const y = Number(block.fields.Y) || 0;
    store.updateSprite(sprite.id, { x, y });
  }

  private executeMotionChangeXBy(block: ExecutableBlock, sprite: any, store: any) {
    const dx = Number(block.fields.DX) || 0;
    store.updateSprite(sprite.id, { x: sprite.x + dx });
  }

  private executeMotionSetX(block: ExecutableBlock, sprite: any, store: any) {
    const x = Number(block.fields.X) || 0;
    store.updateSprite(sprite.id, { x });
  }

  private executeMotionChangeYBy(block: ExecutableBlock, sprite: any, store: any) {
    const dy = Number(block.fields.DY) || 0;
    store.updateSprite(sprite.id, { y: sprite.y + dy });
  }

  private executeMotionSetY(block: ExecutableBlock, sprite: any, store: any) {
    const y = Number(block.fields.Y) || 0;
    store.updateSprite(sprite.id, { y });
  }

  private executeMotionIfOnEdgeBounce(block: ExecutableBlock, sprite: any, store: any) {
    const stageWidth = 480;
    const stageHeight = 360;
    const spriteWidth = 50;
    const spriteHeight = 50;

    let newDirection = sprite.direction;
    let newX = sprite.x;
    let newY = sprite.y;
    let bounced = false;

    if (sprite.x < -stageWidth / 2 + spriteWidth / 2) {
      newDirection = 180 - newDirection;
      newX = -stageWidth / 2 + spriteWidth / 2;
      bounced = true;
    } else if (sprite.x > stageWidth / 2 - spriteWidth / 2) {
      newDirection = 180 - newDirection;
      newX = stageWidth / 2 - spriteWidth / 2;
      bounced = true;
    }

    if (sprite.y < -stageHeight / 2 + spriteHeight / 2) {
      newDirection = -newDirection;
      newY = -stageHeight / 2 + spriteHeight / 2;
      bounced = true;
    } else if (sprite.y > stageHeight / 2 - spriteHeight / 2) {
      newDirection = -newDirection;
      newY = stageHeight / 2 - spriteHeight / 2;
      bounced = true;
    }

    if (bounced) {
      const finalDirection = (newDirection + 360) % 360;
      store.updateSprite(sprite.id, {
        x: newX,
        y: newY,
        direction: finalDirection,
        rotation: finalDirection,
      });
    }
  }

  private executeMotionPointInDirection(block: ExecutableBlock, sprite: any, store: any) {
    const direction = Number(block.fields.DIRECTION) || 90;
    store.updateSprite(sprite.id, { direction, rotation: direction });
  }

  // Looks executors
  private executeLooksShow(sprite: any, store: any) {
    store.updateSprite(sprite.id, { visible: true });
  }

  private executeLooksHide(sprite: any, store: any) {
    store.updateSprite(sprite.id, { visible: false });
  }

  private executeLooksChangeSizeBy(block: ExecutableBlock, sprite: any, store: any) {
    const change = Number(block.fields.CHANGE) || 10;
    store.updateSprite(sprite.id, {
      scaleX: sprite.scaleX + change / 100,
      scaleY: sprite.scaleY + change / 100,
    });
  }

  private executeLooksSetSize(block: ExecutableBlock, sprite: any, store: any) {
    const size = Number(block.fields.SIZE) || 100;
    store.updateSprite(sprite.id, {
      scaleX: size / 100,
      scaleY: size / 100,
    });
  }

  private executeLooksNextCostume(sprite: any, store: any) {
    const nextIndex = (sprite.currentCostumeIndex + 1) % sprite.costumes.length;
    store.updateSprite(sprite.id, { currentCostumeIndex: nextIndex });
  }

  // Control executors
  private executeControlWait(block: ExecutableBlock, context: ExecutionContext) {
    const duration = Number(block.fields.DURATION) || 1;

    // Check if we've already completed the wait
    if ((block as any)._waitComplete) {
      (block as any)._waitComplete = false;
      // Already waited, advance to next block
      return;
    }

    // Yield and schedule continuation
    context.yield = true;

    setTimeout(() => {
      if (this.isRunning && context.running) {
        context.yield = false;
        // Set flag so next execution advances past this block
        (block as any)._waitComplete = true;
      }
    }, duration * 1000);
  }

  // Control executors
  private executeControlForever(block: ExecutableBlock, context: ExecutionContext) {
    const spriteStore = useSpriteStore.getState();
    const { sprites, selectedSpriteId } = spriteStore;
    const sprite = sprites.find(s => s.id === selectedSpriteId);

    if (!sprite) {
      context.pc++;
      return;
    }

    // Get substack blocks
    const substack = block.inputs.SUBSTACK as ExecutableBlock[];

    if (substack && substack.length > 0) {
      // Check if we're starting fresh or continuing
      const isFirstExecution = !(block as any)._substackStartPc;

      // Save the start pc of substack on first execution
      if (isFirstExecution) {
        (block as any)._substackStartPc = context.pc;
      }

      const startPc = (block as any)._substackStartPc;

      // Execute substack blocks
      for (let i = 0; i < substack.length; i++) {
        if (!context.running) return;
        const subBlock = substack[i];
        this.executeBlock(subBlock, context);

        // If this block yielded, stop and wait for it
        if (context.yield) {
          return;
        }
      }

      // All substack blocks executed without yielding - loop back
      // Reset to start of substack
      context.pc = startPc;
      (block as any)._substackStartPc = undefined;

      // Yield briefly before next iteration
      context.yield = true;
      setTimeout(() => {
        if (this.isRunning && context.running) {
          context.yield = false;
        }
      }, 50);
    } else {
      context.pc++;
    }
  }

  private executeControlRepeat(block: ExecutableBlock, context: ExecutionContext) {
    const times = Number(block.fields.TIMES) || 10;

    // Initialize loop count if not set
    if (context.stack.length === 0 || !context.stack[context.stack.length - 1].loopCount) {
      context.stack.push({ pc: context.pc, loopCount: 0 });
    }

    const loopData = context.stack[context.stack.length - 1];

    if (loopData.loopCount! < times) {
      loopData.loopCount!++;

      // Get substack blocks
      const substack = block.inputs.SUBSTACK as ExecutableBlock[];

      if (substack && substack.length > 0) {
        // Save initial pc
        const initialPc = context.pc;

        // Execute substack
        for (const subBlock of substack) {
          if (!context.running) return;
          this.executeBlock(subBlock, context);
        }

        // Restore pc to repeat block position
        context.pc = initialPc;

        // Yield and continue loop
        context.yield = true;
        setTimeout(() => {
          if (this.isRunning && context.running) {
            context.yield = false;
          }
        }, 50);
      }
    } else {
      // Loop finished, pop stack
      context.stack.pop();
      context.pc++;
    }
  }

  // Event executors
  private executeEventBroadcast(block: ExecutableBlock) {
    const message = block.fields.BROADCAST_MESSAGE || 'message1';
    // TODO: Implement broadcast handling
    console.log('Broadcast:', message);
  }

  /**
   * Check if executor is running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }
}

// Singleton instance
export const executor = new Executor();
