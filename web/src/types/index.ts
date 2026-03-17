// Project types
export interface Project {
  id: string;
  name: string;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
}

// Sprite/Character types
export interface Costume {
  id: string;
  name: string;
  assetId: string;
  rotationCenterX: number;
  rotationCenterY: number;
  bitmapResolution?: number;
}

export interface Sound {
  id: string;
  name: string;
  assetId: string;
}

export interface Sprite {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  visible: boolean;
  direction: number;
  rotationStyle: RotationStyle;
  dragging: boolean;
  costumes: Costume[];
  currentCostumeIndex: number;
  sounds: Sound[];
  volume: number;
  layerOrder: number;
}

export type RotationStyle = 'all around' | 'left-right' | 'none';

// Block types
export interface Block {
  id: string;
  type: string;
  x?: number;
  y?: number;
  fields: Record<string, any>;
  inputs: Record<string, any>;
  next?: string;
  parent?: string;
  shadow?: boolean;
  mutations?: any;
}

export interface Script {
  id: string;
  spriteId: string;
  x: number;
  y: number;
  blocks: Block[];
}

// Runtime types
export interface Thread {
  id: string;
  scriptId: string;
  spriteId: string;
  pc: number;
  running: boolean;
  yield: boolean;
}

export interface RuntimeState {
  tempo: number;
  threads: Thread[];
  targetFPS: number;
  redrawRequest: boolean;
}

// Stage types
export interface Stage {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  costumes: Costume[];
  currentCostumeIndex: number;
  sounds: Sound[];
  videoTransparency?: number;
  videoState?: 'on' | 'off' | 'on-flipped';
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}
