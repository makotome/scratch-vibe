import { create } from 'zustand';
import type { Sprite, Costume, Sound } from '../types';
import type { RotationStyle } from '../types';

interface SpriteState {
  sprites: Sprite[];
  selectedSpriteId: string | null;

  // Actions
  setSprites: (sprites: Sprite[]) => void;
  addSprite: (sprite: Sprite) => void;
  removeSprite: (spriteId: string) => void;
  updateSprite: (spriteId: string, updates: Partial<Sprite>) => void;
  selectSprite: (spriteId: string | null) => void;
  addCostume: (spriteId: string, costume: Costume) => void;
  removeCostume: (spriteId: string, costumeId: string) => void;
  setCurrentCostume: (spriteId: string, index: number) => void;
  addSound: (spriteId: string, sound: Sound) => void;
  removeSound: (spriteId: string, soundId: string) => void;
  moveSpriteUp: (spriteId: string) => void;
  moveSpriteDown: (spriteId: string) => void;
}

export const useSpriteStore = create<SpriteState>((set, get) => ({
  sprites: [],
  selectedSpriteId: null,

  setSprites: (sprites) => set({ sprites }),

  addSprite: (sprite) =>
    set((state) => ({
      sprites: [...state.sprites, sprite],
    })),

  removeSprite: (spriteId) =>
    set((state) => ({
      sprites: state.sprites.filter((s) => s.id !== spriteId),
      selectedSpriteId:
        state.selectedSpriteId === spriteId ? null : state.selectedSpriteId,
    })),

  updateSprite: (spriteId, updates) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId ? { ...s, ...updates } : s
      ),
    })),

  selectSprite: (spriteId) => set({ selectedSpriteId: spriteId }),

  addCostume: (spriteId, costume) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId
          ? { ...s, costumes: [...s.costumes, costume] }
          : s
      ),
    })),

  removeCostume: (spriteId, costumeId) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId
          ? {
              ...s,
              costumes: s.costumes.filter((c) => c.id !== costumeId),
              currentCostumeIndex: Math.min(
                s.currentCostumeIndex,
                s.costumes.length - 2
              ),
            }
          : s
      ),
    })),

  setCurrentCostume: (spriteId, index) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId
          ? { ...s, currentCostumeIndex: Math.max(0, Math.min(index, s.costumes.length - 1)) }
          : s
      ),
    })),

  addSound: (spriteId, sound) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId
          ? { ...s, sounds: [...s.sounds, sound] }
          : s
      ),
    })),

  removeSound: (spriteId, soundId) =>
    set((state) => ({
      sprites: state.sprites.map((s) =>
        s.id === spriteId
          ? { ...s, sounds: s.sounds.filter((s) => s.id !== soundId) }
          : s
      ),
    })),

  moveSpriteUp: (spriteId) =>
    set((state) => {
      const index = state.sprites.findIndex((s) => s.id === spriteId);
      if (index < state.sprites.length - 1) {
        const newSprites = [...state.sprites];
        [newSprites[index], newSprites[index + 1]] = [
          newSprites[index + 1],
          newSprites[index],
        ];
        return { sprites: newSprites };
      }
      return state;
    }),

  moveSpriteDown: (spriteId) =>
    set((state) => {
      const index = state.sprites.findIndex((s) => s.id === spriteId);
      if (index > 0) {
        const newSprites = [...state.sprites];
        [newSprites[index], newSprites[index - 1]] = [
          newSprites[index - 1],
          newSprites[index],
        ];
        return { sprites: newSprites };
      }
      return state;
    }),
}));

// Helper function to create a new sprite with defaults
export function createDefaultSprite(name: string, id: string): Sprite {
  return {
    id,
    name,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    direction: 90,
    rotationStyle: 'all around',
    dragging: false,
    costumes: [],
    currentCostumeIndex: 0,
    sounds: [],
    volume: 100,
    layerOrder: 0,
  };
}
