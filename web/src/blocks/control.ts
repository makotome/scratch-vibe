import * as Blockly from 'blockly';

export function registerControlBlocks() {
  // Wait block
  Blockly.Blocks['control_wait'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('wait')
        .appendField(new Blockly.FieldNumber(1, 0, 100), 'DURATION')
        .appendField('seconds');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Wait for a period of time');
    },
  };

  // Repeat block
  Blockly.Blocks['control_repeat'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('repeat')
        .appendField(new Blockly.FieldNumber(10, 1, 100), 'TIMES')
        .appendField('times');
      this.appendStatementInput('SUBSTACK');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Repeat blocks a certain number of times');
    },
  };

  // Forever block
  Blockly.Blocks['control_forever'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('forever');
      this.appendStatementInput('SUBSTACK');
      this.setPreviousStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Repeat blocks forever');
    },
  };

  // If block
  Blockly.Blocks['control_if'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('if');
      this.appendValueInput('CONDITION')
        .setCheck('Boolean');
      this.appendDummyInput()
        .appendField('then');
      this.appendStatementInput('SUBSTACK');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('If condition is true, do something');
    },
  };

  // If-else block
  Blockly.Blocks['control_if_else'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('if');
      this.appendValueInput('CONDITION')
        .setCheck('Boolean');
      this.appendDummyInput()
        .appendField('then');
      this.appendStatementInput('SUBSTACK');
      this.appendDummyInput()
        .appendField('else');
      this.appendStatementInput('SUBSTACK2');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('If condition is true, do something; otherwise do something else');
    },
  };

  // Wait until block
  Blockly.Blocks['control_wait_until'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('wait until');
      this.appendValueInput('CONDITION')
        .setCheck('Boolean');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Wait until condition is true');
    },
  };

  // Repeat until block
  Blockly.Blocks['control_repeat_until'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('repeat until');
      this.appendValueInput('CONDITION')
        .setCheck('Boolean');
      this.appendStatementInput('SUBSTACK');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Repeat until condition is true');
    },
  };

  // Stop block
  Blockly.Blocks['control_stop'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('stop')
        .appendField(new Blockly.FieldDropdown([
          ['all', 'ALL'],
          ['this script', 'THIS_SCRIPT'],
          ['other scripts in sprite', 'OTHER_SCRIPTS']
        ]), 'STOP_OPTION');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Stop the program');
    },
  };

  // Create a clone block
  Blockly.Blocks['control_create_clone_of'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('create clone of')
        .appendField(new Blockly.FieldDropdown([
          ['myself', 'MYSELF'],
          ['Sprite1', 'SPRITE1']
        ]), 'CLONE_OPTION');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Create a copy of the sprite');
    },
  };

  // Delete this clone block
  Blockly.Blocks['control_delete_this_clone'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('delete this clone');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFAB19');
      this.setTooltip('Delete this clone');
    },
  };
}
