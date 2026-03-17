import { Thread } from './Thread';
import { Sprite } from '../types';
import { useSpriteStore, useRuntimeStore } from '../stores';

export class SpriteRunner {
  private sprite: Sprite;
  private threads: Map<string, Thread> = new Map();
  private requestRedraw: () => void;

  constructor(sprite: Sprite, requestRedraw: () => void) {
    this.sprite = sprite;
    this.requestRedraw = requestRedraw;
  }

  // Motion blocks
  move(steps: number) {
    const radians = (this.sprite.direction - 90) * (Math.PI / 180);
    const dx = steps * Math.cos(radians);
    const dy = steps * Math.sin(radians);

    this.sprite.x += dx;
    this.sprite.y += dy;
    this.constrainToStage();
    this.requestRedraw();
  }

  turnRight(degrees: number) {
    this.sprite.direction = (this.sprite.direction + degrees) % 360;
    this.sprite.rotation = this.sprite.direction;
    this.requestRedraw();
  }

  turnLeft(degrees: number) {
    this.sprite.direction = (this.sprite.direction - degrees + 360) % 360;
    this.sprite.rotation = this.sprite.direction;
    this.requestRedraw();
  }

  goTo(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
    this.constrainToStage();
    this.requestRedraw();
  }

  glideTo(x: number, y: number, seconds: number, onComplete: () => void) {
    const startX = this.sprite.x;
    const startY = this.sprite.y;
    const startTime = Date.now();
    const duration = seconds * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.sprite.x = startX + (x - startX) * progress;
      this.sprite.y = startY + (y - startY) * progress;
      this.requestRedraw();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animate();
  }

  changeXBy(dx: number) {
    this.sprite.x += dx;
    this.constrainToStage();
    this.requestRedraw();
  }

  setX(x: number) {
    this.sprite.x = x;
    this.constrainToStage();
    this.requestRedraw();
  }

  changeYBy(dy: number) {
    this.sprite.y += dy;
    this.constrainToStage();
    this.requestRedraw();
  }

  setY(y: number) {
    this.sprite.y = y;
    this.constrainToStage();
    this.requestRedraw();
  }

  ifOnEdgeBounce() {
    const stageWidth = 480;
    const stageHeight = 360;
    const spriteWidth = 50 * this.sprite.scaleX;
    const spriteHeight = 50 * this.sprite.scaleY;

    if (this.sprite.x < -stageWidth / 2 + spriteWidth / 2) {
      this.sprite.direction = 180 - this.sprite.direction;
      this.sprite.x = -stageWidth / 2 + spriteWidth / 2;
    } else if (this.sprite.x > stageWidth / 2 - spriteWidth / 2) {
      this.sprite.direction = 180 - this.sprite.direction;
      this.sprite.x = stageWidth / 2 - spriteWidth / 2;
    }

    if (this.sprite.y < -stageHeight / 2 + spriteHeight / 2) {
      this.sprite.direction = -this.sprite.direction;
      this.sprite.y = -stageHeight / 2 + spriteHeight / 2;
    } else if (this.sprite.y > stageHeight / 2 - spriteHeight / 2) {
      this.sprite.direction = -this.sprite.direction;
      this.sprite.y = stageHeight / 2 - spriteHeight / 2;
    }

    this.sprite.direction = (this.sprite.direction + 360) % 360;
    this.sprite.rotation = this.sprite.direction;
    this.requestRedraw();
  }

  pointInDirection(direction: number) {
    this.sprite.direction = direction;
    this.sprite.rotation = direction;
    this.requestRedraw();
  }

  // Looks blocks
  show() {
    this.sprite.visible = true;
    this.requestRedraw();
  }

  hide() {
    this.sprite.visible = false;
    this.requestRedraw();
  }

  switchCostume(costumeName: string) {
    const index = this.sprite.costumes.findIndex(c => c.name === costumeName);
    if (index !== -1) {
      this.sprite.currentCostumeIndex = index;
      this.requestRedraw();
    }
  }

  nextCostume() {
    this.sprite.currentCostumeIndex = (this.sprite.currentCostumeIndex + 1) % this.sprite.costumes.length;
    this.requestRedraw();
  }

  changeSizeBy(change: number) {
    this.sprite.scaleX += change / 100;
    this.sprite.scaleY += change / 100;
    this.requestRedraw();
  }

  setSize(percent: number) {
    this.sprite.scaleX = percent / 100;
    this.sprite.scaleY = percent / 100;
    this.requestRedraw();
  }

  // Helper methods
  private constrainToStage() {
    const stageWidth = 480;
    const stageHeight = 360;
    const spriteWidth = 50 * this.sprite.scaleX;
    const spriteHeight = 50 * this.sprite.scaleY;

    this.sprite.x = Math.max(-stageWidth / 2 + spriteWidth / 2,
      Math.min(stageWidth / 2 - spriteWidth / 2, this.sprite.x));
    this.sprite.y = Math.max(-stageHeight / 2 + spriteHeight / 2,
      Math.min(stageHeight / 2 - spriteHeight / 2, this.sprite.y));
  }

  // Thread management
  addThread(thread: Thread) {
    this.threads.set(thread.id, thread);
  }

  removeThread(threadId: string) {
    this.threads.delete(threadId);
  }

  stopAllThreads() {
    this.threads.forEach(thread => thread.stop());
    this.threads.clear();
  }
}
