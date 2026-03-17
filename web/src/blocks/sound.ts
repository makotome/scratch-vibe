import * as Blockly from 'blockly';

export function registerSoundBlocks() {
  // Play sound block
  Blockly.Blocks['sound_play'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('play sound')
        .appendField(new Blockly.FieldDropdown([
          ['pop', 'POP'],
          ['meow', 'MEOW'],
          ['recording1', 'RECORDING1']
        ]), 'SOUND_MENU');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#CF63CF');
      this.setTooltip('Play a sound');
    },
  };

  // Stop sound block
  Blockly.Blocks['sound_stop'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('stop all sounds');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#CF63CF');
      this.setTooltip('Stop all sounds');
    },
  };

  // Play sound until done block
  Blockly.Blocks['sound_playuntildone'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('play sound')
        .appendField(new Blockly.FieldDropdown([
          ['pop', 'POP'],
          ['meow', 'MEOW'],
          ['recording1', 'RECORDING1']
        ]), 'SOUND_MENU')
        .appendField('until done');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#CF63CF');
      this.setTooltip('Play sound and wait until finished');
    },
  };

  // Change volume by block
  Blockly.Blocks['sound_changevolumeby'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('change volume by')
        .appendField(new Blockly.FieldNumber(-10, -100, 100), 'VOLUME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#CF63CF');
      this.setTooltip('Change volume by amount');
    },
  };

  // Set volume to block
  Blockly.Blocks['sound_setvolumeto'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('set volume to')
        .appendField(new Blockly.FieldNumber(100, 0, 100), 'VOLUME')
        .appendField('%');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#CF63CF');
      this.setTooltip('Set volume to percentage');
    },
  };

  // Volume block
  Blockly.Blocks['sound_volume'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('volume');
      this.setOutput(true, 'Number');
      this.setColour('#CF63CF');
      this.setTooltip('Get current volume');
    },
  };
}
