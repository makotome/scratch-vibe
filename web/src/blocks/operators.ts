import * as Blockly from 'blockly';

export function registerOperatorsBlocks() {
  // Addition block
  Blockly.Blocks['operator_add'] = {
    init: function() {
      this.appendValueInput('NUM1')
        .setCheck('Number');
      this.appendDummyInput()
        .appendField('+');
      this.appendValueInput('NUM2')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Add two numbers');
    },
  };

  // Subtraction block
  Blockly.Blocks['operator_subtract'] = {
    init: function() {
      this.appendValueInput('NUM1')
        .setCheck('Number');
      this.appendDummyInput()
        .appendField('-');
      this.appendValueInput('NUM2')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Subtract two numbers');
    },
  };

  // Multiplication block
  Blockly.Blocks['operator_multiply'] = {
    init: function() {
      this.appendValueInput('NUM1')
        .setCheck('Number');
      this.appendDummyInput()
        .appendField('×');
      this.appendValueInput('NUM2')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Multiply two numbers');
    },
  };

  // Division block
  Blockly.Blocks['operator_divide'] = {
    init: function() {
      this.appendValueInput('NUM1')
        .setCheck('Number');
      this.appendDummyInput()
        .appendField('÷');
      this.appendValueInput('NUM2')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Divide two numbers');
    },
  };

  // Random block
  Blockly.Blocks['operator_random'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('pick random')
        .appendField(new Blockly.FieldNumber(1, -1000, 1000), 'FROM')
        .appendField('to')
        .appendField(new Blockly.FieldNumber(10, -1000, 1000), 'TO');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Pick a random number');
    },
  };

  // Greater than block
  Blockly.Blocks['operator_gt'] = {
    init: function() {
      this.appendValueInput('OPERAND1');
      this.appendDummyInput()
        .appendField('>');
      this.appendValueInput('OPERAND2');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if first is greater than second');
    },
  };

  // Less than block
  Blockly.Blocks['operator_lt'] = {
    init: function() {
      this.appendValueInput('OPERAND1');
      this.appendDummyInput()
        .appendField('<');
      this.appendValueInput('OPERAND2');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if first is less than second');
    },
  };

  // Equals block
  Blockly.Blocks['operator_equals'] = {
    init: function() {
      this.appendValueInput('OPERAND1');
      this.appendDummyInput()
        .appendField('=');
      this.appendValueInput('OPERAND2');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if values are equal');
    },
  };

  // And block
  Blockly.Blocks['operator_and'] = {
    init: function() {
      this.appendValueInput('OPERAND1')
        .setCheck('Boolean');
      this.appendDummyInput()
        .appendField('and');
      this.appendValueInput('OPERAND2')
        .setCheck('Boolean');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if both conditions are true');
    },
  };

  // Or block
  Blockly.Blocks['operator_or'] = {
    init: function() {
      this.appendValueInput('OPERAND1')
        .setCheck('Boolean');
      this.appendDummyInput()
        .appendField('or');
      this.appendValueInput('OPERAND2')
        .setCheck('Boolean');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if either condition is true');
    },
  };

  // Not block
  Blockly.Blocks['operator_not'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('not');
      this.appendValueInput('OPERAND')
        .setCheck('Boolean');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if condition is false');
    },
  };

  // Contains block
  Blockly.Blocks['operator_contains'] = {
    init: function() {
      this.appendValueInput('STRING1');
      this.appendDummyInput()
        .appendField('contains');
      this.appendValueInput('STRING2');
      this.setOutput(true, 'Boolean');
      this.setColour('#59C059');
      this.setTooltip('Check if string contains substring');
    },
  };

  // Join block
  Blockly.Blocks['operator_join'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('join');
      this.appendValueInput('STRING1')
        .setCheck('String');
      this.appendValueInput('STRING2')
        .setCheck('String');
      this.setOutput(true, 'String');
      this.setColour('#59C059');
      this.setTooltip('Join two strings together');
    },
  };

  // Letter of block
  Blockly.Blocks['operator_letter_of'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('letter')
        .appendField(new Blockly.FieldNumber(1, 1, 100), 'LETTER')
        .appendField('of');
      this.appendValueInput('STRING')
        .setCheck('String');
      this.setOutput(true, 'String');
      this.setColour('#59C059');
      this.setTooltip('Get a character from a string');
    },
  };

  // Length of block
  Blockly.Blocks['operator_length'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('length of');
      this.appendValueInput('STRING')
        .setCheck('String');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Get the length of a string');
    },
  };

  // Mod block
  Blockly.Blocks['operator_mod'] = {
    init: function() {
      this.appendValueInput('NUM1')
        .setCheck('Number');
      this.appendDummyInput()
        .appendField('mod');
      this.appendValueInput('NUM2')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Get remainder of division');
    },
  };

  // Round block
  Blockly.Blocks['operator_round'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('round');
      this.appendValueInput('NUM')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Round a number');
    },
  };

  // Math function block
  Blockly.Blocks['operator_math'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['abs', 'ABS'],
          ['floor', 'FLOOR'],
          ['ceiling', 'CEILING'],
          ['sqrt', 'SQRT'],
          ['sin', 'SIN'],
          ['cos', 'COS'],
          ['tan', 'TAN'],
          ['asin', 'ASIN'],
          ['acos', 'ACOS'],
          ['atan', 'ATAN'],
          ['ln', 'LN'],
          ['log', 'LOG'],
          ['e ^', 'EXP'],
          ['10 ^', 'POW10']
        ]), 'OPERATOR');
      this.appendValueInput('NUM')
        .setCheck('Number');
      this.setOutput(true, 'Number');
      this.setColour('#59C059');
      this.setTooltip('Math function');
    },
  };
}
