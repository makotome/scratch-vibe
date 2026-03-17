import * as Blockly from 'blockly';

export function registerEventsBlocks() {
  // When green flag clicked block (hat block)
  Blockly.Blocks['event_whenflagclicked'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('when');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['green flag', 'GREEN_FLAG']
        ]), 'OPTION');
      this.appendDummyInput()
        .appendField('clicked');
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Start when green flag is clicked');
    },
  };

  // When key pressed block (hat block)
  Blockly.Blocks['event_whenkeypressed'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('when');
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['space', 'SPACE'],
          ['left arrow', 'LEFT_ARROW'],
          ['right arrow', 'RIGHT_ARROW'],
          ['up arrow', 'UP_ARROW'],
          ['down arrow', 'DOWN_ARROW'],
          ['a', 'A'],
          ['b', 'B'],
          ['c', 'C'],
          ['d', 'D'],
          ['e', 'E'],
          ['f', 'F'],
          ['g', 'G'],
          ['h', 'H'],
          ['i', 'I'],
          ['j', 'J'],
          ['k', 'K'],
          ['l', 'L'],
          ['m', 'M'],
          ['n', 'N'],
          ['o', 'O'],
          ['p', 'P'],
          ['q', 'Q'],
          ['r', 'R'],
          ['s', 'S'],
          ['t', 'T'],
          ['u', 'U'],
          ['v', 'V'],
          ['w', 'W'],
          ['x', 'X'],
          ['y', 'Y'],
          ['z', 'Z'],
          ['0', '0'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['any key', 'ANY_KEY']
        ]), 'KEY_OPTION');
      this.appendDummyInput()
        .appendField('pressed');
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Start when a key is pressed');
    },
  };

  // When sprite clicked block (hat block)
  Blockly.Blocks['event_whenthisspriteclicked'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('when this sprite clicked');
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Start when this sprite is clicked');
    },
  };

  // When stage clicked block (hat block)
  Blockly.Blocks['event_whenstageclicked'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('when stage clicked');
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Start when stage is clicked');
    },
  };

  // Broadcast block
  Blockly.Blocks['event_broadcast'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('broadcast');
      this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('message1'), 'BROADCAST_MESSAGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Broadcast a message to all sprites');
    },
  };

  // Broadcast and wait block
  Blockly.Blocks['event_broadcastandwait'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('broadcast');
      this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('message1'), 'BROADCAST_MESSAGE');
      this.appendDummyInput()
        .appendField('and wait');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Broadcast a message and wait for all scripts to finish');
    },
  };

  // When broadcast received block (hat block)
  Blockly.Blocks['event_whenbroadcastreceived'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('when I receive');
      this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('message1'), 'BROADCAST_MESSAGE');
      this.setNextStatement(true, null);
      this.setColour('#FFBF00');
      this.setTooltip('Start when a broadcast message is received');
    },
  };
}
