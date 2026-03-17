import * as Blockly from 'blockly';

export function registerMotionBlocks() {
  // Move block
  Blockly.Blocks['motion_move'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('move')
        .appendField(new Blockly.FieldNumber(10, -1000, 1000), 'STEPS')
        .appendField('steps');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Move the sprite forward');
    },
  };

  // Turn right block
  Blockly.Blocks['motion_turnright'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('turn')
        .appendField(new Blockly.FieldNumber(15, -360, 360), 'DEGREES')
        .appendField('degrees right');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Turn the sprite right');
    },
  };

  // Turn left block
  Blockly.Blocks['motion_turnleft'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('turn')
        .appendField(new Blockly.FieldNumber(15, -360, 360), 'DEGREES')
        .appendField('degrees left');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Turn the sprite left');
    },
  };

  // Go to block
  Blockly.Blocks['motion_goto'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('go to')
        .appendField(new Blockly.FieldDropdown([
          ['random position', 'RANDOM'],
          ['mouse position', 'MOUSE'],
          ['center', 'CENTER']
        ]), 'TO');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Go to a position');
    },
  };

  // Glide to block
  Blockly.Blocks['motion_glideto'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('glide')
        .appendField(new Blockly.FieldNumber(1, 0.1, 10), 'SECS')
        .appendField('secs to x:')
        .appendField(new Blockly.FieldNumber(0, -240, 240), 'X')
        .appendField('y:')
        .appendField(new Blockly.FieldNumber(0, -180, 180), 'Y');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Glide to a position over time');
    },
  };

  // Change x block
  Blockly.Blocks['motion_changexby'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change x by')
        .appendField(new Blockly.FieldNumber(10, -1000, 1000), 'DX');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Change the x position');
    },
  };

  // Set x block
  Blockly.Blocks['motion_setx'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set x to')
        .appendField(new Blockly.FieldNumber(0, -240, 240), 'X');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Set the x position');
    },
  };

  // Change y block
  Blockly.Blocks['motion_changeyby'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change y by')
        .appendField(new Blockly.FieldNumber(10, -1000, 1000), 'DY');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Change the y position');
    },
  };

  // Set y block
  Blockly.Blocks['motion_sety'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set y to')
        .appendField(new Blockly.FieldNumber(0, -180, 180), 'Y');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Set the y position');
    },
  };

  // If on edge, bounce block
  Blockly.Blocks['motion_ifonedgebounce'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('if on edge, bounce');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Bounce if hitting the edge');
    },
  };

  // Set rotation style block
  Blockly.Blocks['motion_setrotationstyle'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set rotation style')
        .appendField(new Blockly.FieldDropdown([
          ['left-right', 'LEFT_RIGHT'],
          ['don\'t rotate', 'DONT_ROTATE'],
          ['all around', 'ALL_AROUND']
        ]), 'STYLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Set how the sprite rotates');
    },
  };

  // Point in direction block
  Blockly.Blocks['motion_pointindirection'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('point in direction')
        .appendField(new Blockly.FieldNumber(90, -180, 180), 'DIRECTION');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Point in a direction');
    },
  };

  // Point towards block
  Blockly.Blocks['motion_pointtowards'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('point towards')
        .appendField(new Blockly.FieldDropdown([
          ['mouse pointer', 'MOUSE'],
          ['random position', 'RANDOM']
        ]), 'TO');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4C97FF');
      this.setTooltip('Point towards something');
    },
  };
}
