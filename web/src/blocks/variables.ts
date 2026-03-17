import * as Blockly from 'blockly';

export function registerVariablesBlocks() {
  // Variable getter block
  Blockly.Blocks['variables_get'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('item'), 'VAR');
      this.setOutput(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Get the value of a variable');
    },
  };

  // Variable setter block
  Blockly.Blocks['variables_set'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldVariable('item'), 'VAR')
        .appendField('to');
      this.appendValueInput('VALUE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Set the value of a variable');
    },
  };

  // Variable change block
  Blockly.Blocks['variables_change'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change')
        .appendField(new Blockly.FieldVariable('item'), 'VAR')
        .appendField('by');
      this.appendValueInput('VALUE')
        .setCheck('Number');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Change a variable by an amount');
    },
  };

  // Show variable block
  Blockly.Blocks['data_showvariable'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('show variable')
        .appendField(new Blockly.FieldVariable('item'), 'VARIABLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Show a variable on the stage');
    },
  };

  // Hide variable block
  Blockly.Blocks['data_hidevariable'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('hide variable')
        .appendField(new Blockly.FieldVariable('item'), 'VARIABLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Hide a variable on the stage');
    },
  };

  // List getter block
  Blockly.Blocks['data_listcontents'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setOutput(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Get the contents of a list');
    },
  };

  // Add to list block
  Blockly.Blocks['data_addtolist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('add')
        .appendField(new Blockly.FieldTextInput('thing'), 'ITEM')
        .appendField('to list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Add an item to a list');
    },
  };

  // Delete from list block
  Blockly.Blocks['data_deleteoflist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('delete')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['last', 'LAST'],
          ['random', 'RANDOM']
        ]), 'INDEX')
        .appendField('of list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Delete an item from a list');
    },
  };

  // Insert in list block
  Blockly.Blocks['data_inserttolist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('insert')
        .appendField(new Blockly.FieldTextInput('thing'), 'ITEM')
        .appendField('at')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['last', 'LAST'],
          ['random', 'RANDOM']
        ]), 'INDEX')
        .appendField('of list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Insert an item into a list');
    },
  };

  // Replace in list block
  Blockly.Blocks['data_replaceitemoflist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('replace item')
        .appendField(new Blockly.FieldNumber(1, 1, 100), 'INDEX')
        .appendField('of list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST')
        .appendField('with')
        .appendField(new Blockly.FieldTextInput('thing'), 'ITEM');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Replace an item in a list');
    },
  };

  // Item of list block
  Blockly.Blocks['data_itemoflist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('item')
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['last', 'LAST'],
          ['random', 'RANDOM']
        ]), 'INDEX')
        .appendField('of list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setOutput(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Get an item from a list');
    },
  };

  // Length of list block
  Blockly.Blocks['data_lengthoflist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('length of list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setOutput(true, 'Number');
      this.setColour('#FF8C1A');
      this.setTooltip('Get the length of a list');
    },
  };

  // List contains block
  Blockly.Blocks['data_listcontainsitem'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST')
        .appendField('contains')
        .appendField(new Blockly.FieldTextInput('thing'), 'ITEM');
      this.setOutput(true, 'Boolean');
      this.setColour('#FF8C1A');
      this.setTooltip('Check if a list contains an item');
    },
  };

  // Show list block
  Blockly.Blocks['data_showlist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('show list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Show a list on the stage');
    },
  };

  // Hide list block
  Blockly.Blocks['data_hidelist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('hide list')
        .appendField(new Blockly.FieldVariable('list'), 'LIST');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FF8C1A');
      this.setTooltip('Hide a list on the stage');
    },
  };
}
