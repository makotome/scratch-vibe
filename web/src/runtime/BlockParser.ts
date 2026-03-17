import * as Blockly from 'blockly';

/**
 * Represents a single executable script attached to a sprite
 */
export interface Script {
  id: string;
  spriteId: string;
  eventType: string;
  blocks: ExecutableBlock[];
}

/**
 * Represents a single executable block
 */
export interface ExecutableBlock {
  id: string;
  type: string;
  opcode: string;
  fields: Record<string, any>;
  inputs: Record<string, any>;
  next: ExecutableBlock | null;
}

/**
 * Parse Blockly workspace blocks into executable scripts
 */
export class BlockParser {
  private workspace: Blockly.Workspace;
  private visited: Set<string> = new Set();

  constructor(workspace: Blockly.Workspace) {
    this.workspace = workspace;
  }

  /**
   * Get all scripts from the workspace
   */
  getAllScripts(): Script[] {
    // Reset visited set for each full parse
    this.visited = new Set();

    const scripts: Script[] = [];
    const topBlocks = this.workspace.getTopBlocks(true);

    // Find hat blocks (event triggers)
    const hatBlocks = topBlocks.filter(block => this.isHatBlock(block));

    for (const hatBlock of hatBlocks) {
      const script = this.parseScript(hatBlock);
      // Only add scripts that have at least one block
      if (script && script.blocks.length > 0) {
        scripts.push(script);
      }
    }

    return scripts;
  }

  /**
   * Check if a block is a hat block (event trigger)
   */
  private isHatBlock(block: Blockly.Block): boolean {
    const hatTypes = [
      'event_whenflagclicked',
      'event_whenkeypressed',
      'event_whenthisspriteclicked',
      'event_whenstageclicked',
      'event_whenbroadcastreceived',
    ];
    return hatTypes.includes(block.type);
  }

  /**
   * Parse a hat block into a script
   */
  private parseScript(hatBlock: Blockly.Block): Script | null {
    const eventType = this.getEventType(hatBlock);
    const spriteId = this.getSpriteId(hatBlock);

    // Get next blocks (the body of the script)
    const nextBlock = hatBlock.getNextBlock();
    const blocks = this.parseBlockList(nextBlock);

    return {
      id: hatBlock.id,
      spriteId,
      eventType,
      blocks,
    };
  }

  /**
   * Get event type from hat block
   */
  private getEventType(block: Blockly.Block): string {
    switch (block.type) {
      case 'event_whenflagclicked':
        return 'greenFlag';
      case 'event_whenkeypressed':
        return 'keyPressed';
      case 'event_whenthisspriteclicked':
        return 'spriteClicked';
      case 'event_whenstageclicked':
        return 'stageClicked';
      case 'event_whenbroadcastreceived':
        return 'broadcast';
      default:
        return 'unknown';
    }
  }

  /**
   * Get sprite ID from block
   */
  private getSpriteId(block: Blockly.Block): string {
    return 'default';
  }

  /**
   * Parse a list of connected blocks (non-recursive)
   */
  private parseBlockList(startBlock: Blockly.Block | null): ExecutableBlock[] {
    if (!startBlock) return [];

    const blocks: ExecutableBlock[] = [];
    let current: Blockly.Block | null = startBlock;

    while (current) {
      // Safety check - use class-level visited set to prevent cycles across SUBSTACK calls
      if (this.visited.has(current.id) || blocks.length > 1000) {
        break;
      }
      this.visited.add(current.id);

      const parsed = this.parseSingleBlock(current);
      if (parsed) {
        blocks.push(parsed);
      }

      current = current.getNextBlock();
    }

    return blocks;
  }

  /**
   * Parse a single block (no recursion into substack)
   */
  private parseSingleBlock(block: Blockly.Block): ExecutableBlock | null {
    const opcode = this.getOpcode(block.type);
    if (!opcode) {
      return null;
    }

    // Extract fields
    const fields: Record<string, any> = {};
    for (const input of block.inputList) {
      for (const field of input.fieldRow) {
        if (field.name && typeof field.getValue === 'function') {
          try {
            fields[field.name] = field.getValue();
          } catch (e) {
            // Ignore
          }
        }
      }
    }

    // Extract inputs - handle substack specially
    const inputs: Record<string, any> = {};
    for (const input of block.inputList) {
      if (!input.connection) continue;

      const connectedBlock = input.connection.getSourceBlock();
      if (!connectedBlock) continue;

      // Substack blocks - parse the chain inside
      if (input.name === 'SUBSTACK' || input.name === 'SUBSTACK2') {
        // For C-shaped blocks, we need to get the block that's actually nested inside
        // The connection might point to the inner shadow block or the nested block
        const innerBlock = connectedBlock.id === block.id
          ? input.connection.targetBlock()
          : connectedBlock;
        if (innerBlock && innerBlock.id !== block.id) {
          inputs[input.name] = this.parseBlockList(innerBlock);
        } else {
          inputs[input.name] = [];
        }
      }
      // Condition blocks - get value
      else if (input.name === 'CONDUTION' || input.name === 'CONDITION') {
        inputs[input.name] = this.extractValue(connectedBlock);
      }
    }

    return {
      id: block.id,
      type: block.type,
      opcode,
      fields,
      inputs,
      next: null,
    };
  }

  /**
   * Extract a simple value from a block
   */
  private extractValue(block: Blockly.Block): any {
    // Try to get field value
    for (const input of block.inputList) {
      for (const field of input.fieldRow) {
        if (field.name && typeof field.getValue === 'function') {
          try {
            const val = field.getValue();
            const num = Number(val);
            return isNaN(num) ? val : num;
          } catch (e) {
            // Ignore
          }
        }
      }
    }
    return 0;
  }

  /**
   * Get opcode from block type
   */
  private getOpcode(blockType: string): string | null {
    const opcodeMap: Record<string, string> = {
      // Motion
      'motion_move': 'motion_move',
      'motion_turnright': 'motion_turnright',
      'motion_turnleft': 'motion_turnleft',
      'motion_goto': 'motion_goto',
      'motion_glideto': 'motion_glideto',
      'motion_changexby': 'motion_changexby',
      'motion_setx': 'motion_setx',
      'motion_changeyby': 'motion_changeyby',
      'motion_sety': 'motion_sety',
      'motion_ifonedgebounce': 'motion_ifonedgebounce',
      'motion_setrotationstyle': 'motion_setrotationstyle',
      'motion_pointindirection': 'motion_pointindirection',
      'motion_pointtowards': 'motion_pointtowards',

      // Looks
      'looks_say': 'looks_say',
      'looks_think': 'looks_think',
      'looks_show': 'looks_show',
      'looks_hide': 'looks_hide',
      'looks_switchcostume': 'looks_switchcostume',
      'looks_nextcostume': 'looks_nextcostume',
      'looks_changesizeby': 'looks_changesizeby',
      'looks_setsize': 'looks_setsize',

      // Control
      'control_wait': 'control_wait',
      'control_repeat': 'control_repeat',
      'control_forever': 'control_forever',
      'control_if': 'control_if',
      'control_if_else': 'control_if_else',
      'control_wait_until': 'control_wait_until',
      'control_repeat_until': 'control_repeat_until',
      'control_stop': 'control_stop',

      // Events
      'event_broadcast': 'event_broadcast',
      'event_broadcastandwait': 'event_broadcastandwait',

      // Sensing
      'sensing_keypressed': 'sensing_keypressed',
      'sensing_mousedown': 'sensing_mousedown',

      // Operators
      'operator_add': 'operator_add',
      'operator_subtract': 'operator_subtract',
      'operator_multiply': 'operator_multiply',
      'operator_divide': 'operator_divide',
      'operator_random': 'operator_random',
      'operator_gt': 'operator_gt',
      'operator_lt': 'operator_lt',
      'operator_equals': 'operator_equals',
      'operator_and': 'operator_and',
      'operator_or': 'operator_or',
      'operator_not': 'operator_not',
    };

    return opcodeMap[blockType] || null;
  }
}

/**
 * Get all scripts from a Blockly workspace
 */
export function getWorkspaceScripts(workspace: Blockly.Workspace): Script[] {
  const parser = new BlockParser(workspace);
  return parser.getAllScripts();
}
