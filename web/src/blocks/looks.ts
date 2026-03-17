import * as Blockly from 'blockly';

export function registerLooksBlocks() {
  // Say block
  Blockly.Blocks['looks_say'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('say')
        .appendField(new Blockly.FieldTextInput('Hello!'), 'MESSAGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Display a speech bubble');
    },
  };

  // Think block
  Blockly.Blocks['looks_think'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('think')
        .appendField(new Blockly.FieldTextInput('Hmm...'), 'MESSAGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Display a thought bubble');
    },
  };

  // Show block
  Blockly.Blocks['looks_show'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('show');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Show the sprite');
    },
  };

  // Hide block
  Blockly.Blocks['looks_hide'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('hide');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Hide the sprite');
    },
  };

  // Switch costume block
  Blockly.Blocks['looks_switchcostume'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('switch costume to')
        .appendField(new Blockly.FieldTextInput('costume1'), 'COSTUME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Switch to a different costume');
    },
  };

  // Next costume block
  Blockly.Blocks['looks_nextcostume'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('next costume');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Switch to the next costume');
    },
  };

  // Switch backdrop block
  Blockly.Blocks['looks_switchbackdrop'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('switch backdrop to')
        .appendField(new Blockly.FieldTextInput('backdrop1'), 'BACKDROP');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Switch the stage backdrop');
    },
  };

  // Next backdrop block
  Blockly.Blocks['looks_nextbackdrop'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('next backdrop');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Switch to the next backdrop');
    },
  };

  // Change size block
  Blockly.Blocks['looks_changesizeby'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change size by')
        .appendField(new Blockly.FieldNumber(10, -1000, 1000), 'CHANGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Change the sprite size');
    },
  };

  // Set size block
  Blockly.Blocks['looks_setsize'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set size to')
        .appendField(new Blockly.FieldNumber(100, 1, 1000), 'SIZE')
        .appendField('%');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Set the sprite size');
    },
  };

  // Change effect block
  Blockly.Blocks['looks_changeeffectby'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change')
        .appendField(new Blockly.FieldDropdown([
          ['color', 'COLOR'],
          ['fisheye', 'FISHEYE'],
          ['whirl', 'WHIRL'],
          ['pixelate', 'PIXELATE'],
          ['mosaic', 'MOSAIC'],
          ['brightness', 'BRIGHTNESS'],
          ['ghost', 'GHOST']
        ]), 'EFFECT')
        .appendField('effect by')
        .appendField(new Blockly.FieldNumber(25, -1000, 1000), 'CHANGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Change a visual effect');
    },
  };

  // Set effect block
  Blockly.Blocks['looks_seteffectto'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldDropdown([
          ['color', 'COLOR'],
          ['fisheye', 'FISHEYE'],
          ['whirl', 'WHIRL'],
          ['pixelate', 'PIXELATE'],
          ['mosaic', 'MOSAIC'],
          ['brightness', 'BRIGHTNESS'],
          ['ghost', 'GHOST']
        ]), 'EFFECT')
        .appendField('effect to')
        .appendField(new Blockly.FieldNumber(0, -1000, 1000), 'VALUE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Set a visual effect');
    },
  };

  // Clear graphic effects block
  Blockly.Blocks['looks_cleargraphiceffects'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('clear graphic effects');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Clear all visual effects');
    },
  };

  // Go to front block
  Blockly.Blocks['looks_gotofront'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('go to front');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Bring sprite to front');
    },
  };

  // Go back block
  Blockly.Blocks['looks_gobacklayers'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('go back')
        .appendField(new Blockly.FieldNumber(1, 1, 100), 'LAYERS')
        .appendField('layers');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#9966FF');
      this.setTooltip('Move sprite back');
    },
  };
}
