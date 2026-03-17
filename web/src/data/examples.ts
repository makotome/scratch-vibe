/**
 * Example scripts for testing different block types
 * Each example contains XML blocks that can be loaded into Blockly workspace
 */

export interface ExampleScript {
  id: string;
  name: string;
  category: string;
  description: string;
  xml: string;
}

export const examples: ExampleScript[] = [
  // ===== Motion Examples =====
  {
    id: 'motion-move',
    name: '移动10步',
    category: 'Motion',
    description: '点击绿旗让角色向前移动',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="motion_move">
              <value name="STEPS">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'motion-turn',
    name: '旋转360度',
    category: 'Motion',
    description: '点击绿旗让角色旋转一圈',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_repeat">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">24</field>
                </shadow>
              </value>
              <statement name="SUBSTACK">
                <block type="motion_turnright">
                  <value name="DEGREES">
                    <shadow type="math_number">
                      <field name="NUM">15</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'motion-goto',
    name: '跳到位置',
    category: 'Motion',
    description: '点击绿旗让角色跳到随机位置',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="motion_goto">
              <field name="TO">RANDOM</field>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'motion-bounce',
    name: '碰到边缘反弹',
    category: 'Motion',
    description: '点击绿旗让角色移动并碰到边缘反弹',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="motion_move">
                  <value name="STEPS">
                    <shadow type="math_number">
                      <field name="NUM">5</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Looks Examples =====
  {
    id: 'looks-say',
    name: '说话效果',
    category: 'Looks',
    description: '点击绿旗让角色说话',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="looks_say">
              <value name="MESSAGE">
                <shadow type="text">
                  <field name="TEXT">你好！</field>
                </shadow>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'looks-show-hide',
    name: '显示隐藏',
    category: 'Looks',
    description: '点击绿旗让角色显示和隐藏',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="looks_show" />
                <block type="control_wait">
                  <value name="DURATION">
                    <shadow type="math_number">
                      <field name="NUM">1</field>
                    </shadow>
                  </value>
                </block>
                <block type="looks_hide" />
                <block type="control_wait">
                  <value name="DURATION">
                    <shadow type="math_number">
                      <field name="NUM">1</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'looks-size',
    name: '改变大小',
    category: 'Looks',
    description: '点击绿旗让角色大小变化',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="looks_changesizeby">
                  <value name="CHANGE">
                    <shadow type="math_number">
                      <field name="NUM">5</field>
                    </shadow>
                  </value>
                </block>
                <block type="control_wait">
                  <value name="DURATION">
                    <shadow type="math_number">
                      <field name="NUM">0.1</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Control Examples =====
  {
    id: 'control-repeat',
    name: '重复10次',
    category: 'Control',
    description: '点击绿旗让角色重复移动',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_repeat">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <statement name="SUBSTACK">
                <block type="motion_move">
                  <value name="STEPS">
                    <shadow type="math_number">
                      <field name="NUM">20</field>
                    </shadow>
                  </value>
                </block>
                <block type="control_wait">
                  <value name="DURATION">
                    <shadow type="math_number">
                      <field name="NUM">0.1</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'control-forever',
    name: '永久循环',
    category: 'Control',
    description: '点击绿旗让角色永久旋转移动',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="motion_move">
                  <value name="STEPS">
                    <shadow type="math_number">
                      <field name="NUM">2</field>
                    </shadow>
                  </value>
                </block>
                <block type="motion_turnright">
                  <value name="DEGREES">
                    <shadow type="math_number">
                      <field name="NUM">5</field>
                    </shadow>
                  </value>
                </block>
                <block type="motion_ifonedgebounce" />
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'control-if',
    name: '条件判断',
    category: 'Control',
    description: '点击绿旗，按下空格键时角色说话',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">space</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="looks_say">
                      <value name="MESSAGE">
                        <shadow type="text">
                          <field name="TEXT">你按下了空格键！</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Events Examples =====
  {
    id: 'events-broadcast',
    name: '广播消息',
    category: 'Events',
    description: '点击绿旗发送广播消息',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="event_broadcast">
              <field name="BROADCAST_MESSAGE">message1</field>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'events-keypress',
    name: '按键触发',
    category: 'Events',
    description: '按下空格键让角色旋转',
    xml: `
      <xml>
        <block type="event_whenkeypressed" x="20" y="20">
          <field name="KEY_OPTION">space</field>
          <next>
            <block type="motion_turnright">
              <value name="DEGREES">
                <shadow type="math_number">
                  <field name="NUM">15</field>
                </shadow>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Sensing Examples =====
  {
    id: 'sensing-keypressed',
    name: '按键检测',
    category: 'Sensing',
    description: '点击绿旗，当按下方向键时移动角色',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">right arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changexby">
                      <value name="DX">
                        <shadow type="math_number">
                          <field name="NUM">5</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">left arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changexby">
                      <value name="DX">
                        <shadow type="math_number">
                          <field name="NUM">-5</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Operators Examples =====
  {
    id: 'operators-math',
    name: '数学运算',
    category: 'Operators',
    description: '点击绿旗进行数学运算并说话',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="looks_say">
              <value name="MESSAGE">
                <shadow type="text">
                  <field name="TEXT">10 + 5 = </field>
                </shadow>
                <next>
                  <block type="operator_add">
                    <value name="NUM1">
                      <shadow type="math_number">
                        <field name="NUM">10</field>
                      </shadow>
                    </value>
                    <value name="NUM2">
                      <shadow type="math_number">
                        <field name="NUM">5</field>
                      </shadow>
                    </value>
                  </block>
                </next>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'operators-random',
    name: '随机数',
    category: 'Operators',
    description: '点击绿旗生成随机数并说话',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="looks_say">
              <value name="MESSAGE">
                <shadow type="text">
                  <field name="TEXT">随机数: </field>
                </shadow>
                <next>
                  <block type="operator_random">
                    <value name="FROM">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="TO">
                      <shadow type="math_number">
                        <field name="NUM">10</field>
                      </shadow>
                    </value>
                  </block>
                </next>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `,
  },

  // ===== Combined Examples =====
  {
    id: 'combined-dance',
    name: '舞蹈动作',
    category: 'Combined',
    description: '点击绿旗让角色跳舞',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_repeat">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">4</field>
                </shadow>
              </value>
              <statement name="SUBSTACK">
                <block type="motion_turnright">
                  <value name="DEGREES">
                    <shadow type="math_number">
                      <field name="NUM">90</field>
                    </shadow>
                  </value>
                </block>
                <block type="looks_changesizeby">
                  <value name="CHANGE">
                    <shadow type="math_number">
                      <field name="NUM">10</field>
                    </shadow>
                  </value>
                </block>
                <block type="control_wait">
                  <value name="DURATION">
                    <shadow type="math_number">
                      <field name="NUM">0.5</field>
                    </shadow>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
  {
    id: 'combined-keyboard-control',
    name: '键盘控制',
    category: 'Combined',
    description: '用方向键控制角色移动',
    xml: `
      <xml>
        <block type="event_whenflagclicked" x="20" y="20">
          <next>
            <block type="control_forever">
              <statement name="SUBSTACK">
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">right arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changexby">
                      <value name="DX">
                        <shadow type="math_number">
                          <field name="NUM">3</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">left arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changexby">
                      <value name="DX">
                        <shadow type="math_number">
                          <field name="NUM">-3</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">up arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changeyby">
                      <value name="DY">
                        <shadow type="math_number">
                          <field name="NUM">3</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
                <block type="control_if">
                  <value name="CONDITION">
                    <shadow type="sensing_keypressed">
                      <field name="KEY_OPTION">down arrow</field>
                    </shadow>
                  </value>
                  <statement name="SUBSTACK">
                    <block type="motion_changeyby">
                      <value name="DY">
                        <shadow type="math_number">
                          <field name="NUM">-3</field>
                        </shadow>
                      </value>
                    </block>
                  </statement>
                </block>
                <block type="motion_ifonedgebounce" />
              </statement>
            </block>
          </next>
        </block>
      </xml>
    `,
  },
];

// Group examples by category
export const examplesByCategory = examples.reduce((acc, example) => {
  if (!acc[example.category]) {
    acc[example.category] = [];
  }
  acc[example.category].push(example);
  return acc;
}, {} as Record<string, ExampleScript[]>);
