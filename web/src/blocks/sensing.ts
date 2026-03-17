import * as Blockly from 'blockly';

export function registerSensingBlocks() {
  // Touching object block
  Blockly.Blocks['sensing_touchingobject'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('touching')
        .appendField(new Blockly.FieldDropdown([
          ['_mouse_', 'MOUSE'],
          ['_edge_', 'EDGE'],
          ['Sprite1', 'SPRITE1']
        ]), 'TOUCHINGOBJECT');
      this.setOutput(true, 'Boolean');
      this.setColour('#5CB3CC');
      this.setTooltip('Check if touching an object');
    },
  };

  // Touching color block
  Blockly.Blocks['sensing_touchingcolor'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('touching color')
        .appendField(new Blockly.FieldTextInput('#FF0000'), 'COLOR');
      this.setOutput(true, 'Boolean');
      this.setColour('#5CB3CC');
      this.setTooltip('Check if touching a color');
    },
  };

  // Color is touching color block
  Blockly.Blocks['sensing_coloristouchingcolor'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('color')
        .appendField(new Blockly.FieldTextInput('#FF0000'), 'COLOR1')
        .appendField('is touching color')
        .appendField(new Blockly.FieldTextInput('#0000FF'), 'COLOR2');
      this.setOutput(true, 'Boolean');
      this.setColour('#5CB3CC');
      this.setTooltip('Check if one color is touching another');
    },
  };

  // Distance to block
  Blockly.Blocks['sensing_distanceto'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('distance to')
        .appendField(new Blockly.FieldDropdown([
          ['mouse pointer', 'MOUSE'],
          ['Sprite1', 'SPRITE1']
        ]), 'DISTANCETOMENU');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get distance to an object');
    },
  };

  // Ask and wait block
  Blockly.Blocks['sensing_askandwait'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('ask')
        .appendField(new Blockly.FieldTextInput('What\'s your name?'), 'QUESTION')
        .appendField('and wait');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#5CB3CC');
      this.setTooltip('Ask a question and wait for answer');
    },
  };

  // Answer block
  Blockly.Blocks['sensing_answer'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('answer');
      this.setOutput(true, 'String');
      this.setColour('#5CB3CC');
      this.setTooltip('Get the answer to the last question');
    },
  };

  // Key pressed block
  Blockly.Blocks['sensing_keypressed'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('key')
        .appendField(new Blockly.FieldDropdown([
          ['space', 'SPACE'],
          ['up arrow', 'UP_ARROW'],
          ['down arrow', 'DOWN_ARROW'],
          ['left arrow', 'LEFT_ARROW'],
          ['right arrow', 'RIGHT_ARROW'],
          ['any key', 'ANY_KEY']
        ]), 'KEY_OPTION')
        .appendField('pressed?');
      this.setOutput(true, 'Boolean');
      this.setColour('#5CB3CC');
      this.setTooltip('Check if a key is pressed');
    },
  };

  // Mouse down block
  Blockly.Blocks['sensing_mousedown'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('mouse down?');
      this.setOutput(true, 'Boolean');
      this.setColour('#5CB3CC');
      this.setTooltip('Check if mouse button is pressed');
    },
  };

  // Mouse x block
  Blockly.Blocks['sensing_mousex'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('mouse x');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get mouse x position');
    },
  };

  // Mouse y block
  Blockly.Blocks['sensing_mousey'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('mouse y');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get mouse y position');
    },
  };

  // Set drag mode block
  Blockly.Blocks['sensing_setdragmode'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set drag mode')
        .appendField(new Blockly.FieldDropdown([
          ['draggable', 'DRAGGABLE'],
          ['not draggable', 'NOT_DRAGGABLE']
        ]), 'DRAG_MODE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#5CB3CC');
      this.setTooltip('Set whether sprite can be dragged');
    },
  };

  // Reset timer block
  Blockly.Blocks['sensing_resettimer'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('reset timer');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#5CB3CC');
      this.setTooltip('Reset the timer to zero');
    },
  };

  // Timer block
  Blockly.Blocks['sensing_timer'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('timer');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get the timer value');
    },
  };

  // Of block
  Blockly.Blocks['sensing_of'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['x position', 'X_POSITION'],
          ['y position', 'Y_POSITION'],
          ['direction', 'DIRECTION'],
          ['costume #', 'COSTUME_NUMBER'],
          ['costume name', 'COSTUME_NAME'],
          ['size', 'SIZE'],
          ['volume', 'VOLUME']
        ]), 'PROPERTY')
        .appendField('of')
        .appendField(new Blockly.FieldDropdown([
          ['Sprite1', 'SPRITE1'],
          ['Stage', 'STAGE']
        ]), 'OBJECT');
      this.setOutput(true, null);
      this.setColour('#5CB3CC');
      this.setTooltip('Get a property of a sprite');
    },
  };

  // Current block
  Blockly.Blocks['sensing_current'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('current')
        .appendField(new Blockly.FieldDropdown([
          ['year', 'YEAR'],
          ['month', 'MONTH'],
          ['date', 'DATE'],
          ['day of week', 'DAYOFWEEK'],
          ['hour', 'HOUR'],
          ['minute', 'MINUTE'],
          ['second', 'SECOND']
        ]), 'CURRENTMENU');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get current date/time');
    },
  };

  // Days since 2000 block
  Blockly.Blocks['sensing_dayssince2000'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('days since 2000');
      this.setOutput(true, 'Number');
      this.setColour('#5CB3CC');
      this.setTooltip('Get days since year 2000');
    },
  };
}
