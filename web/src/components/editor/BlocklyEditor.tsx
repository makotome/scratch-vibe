import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as Blockly from 'blockly';
import './BlocklyEditor.css';

// Import custom blocks
import { registerMotionBlocks } from '../../blocks/motion';
import { registerLooksBlocks } from '../../blocks/looks';
import { registerSoundBlocks } from '../../blocks/sound';
import { registerEventsBlocks } from '../../blocks/events';
import { registerControlBlocks } from '../../blocks/control';
import { registerSensingBlocks } from '../../blocks/sensing';
import { registerOperatorsBlocks } from '../../blocks/operators';
import { registerVariablesBlocks } from '../../blocks/variables';

// Toolbox with categories - standard Blockly toolbox
const toolboxDef = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      id: 'motion',
      name: 'Motion',
      colour: '#4C97FF',
      contents: [
        { kind: 'block', type: 'motion_move' },
        { kind: 'block', type: 'motion_turnright' },
        { kind: 'block', type: 'motion_turnleft' },
        { kind: 'block', type: 'motion_goto' },
        { kind: 'block', type: 'motion_glideto' },
        { kind: 'block', type: 'motion_changexby' },
        { kind: 'block', type: 'motion_setx' },
        { kind: 'block', type: 'motion_changeyby' },
        { kind: 'block', type: 'motion_sety' },
        { kind: 'block', type: 'motion_ifonedgebounce' },
        { kind: 'block', type: 'motion_setrotationstyle' },
        { kind: 'block', type: 'motion_pointindirection' },
        { kind: 'block', type: 'motion_pointtowards' },
      ],
    },
    {
      kind: 'category',
      name: 'Looks',
      colour: '#9966FF',
      contents: [
        { kind: 'block', type: 'looks_say' },
        { kind: 'block', type: 'looks_think' },
        { kind: 'block', type: 'looks_show' },
        { kind: 'block', type: 'looks_hide' },
        { kind: 'block', type: 'looks_switchcostume' },
        { kind: 'block', type: 'looks_nextcostume' },
        { kind: 'block', type: 'looks_switchbackdrop' },
        { kind: 'block', type: 'looks_nextbackdrop' },
        { kind: 'block', type: 'looks_changesizeby' },
        { kind: 'block', type: 'looks_setsize' },
        { kind: 'block', type: 'looks_changeeffectby' },
        { kind: 'block', type: 'looks_seteffectto' },
        { kind: 'block', type: 'looks_cleargraphiceffects' },
        { kind: 'block', type: 'looks_gotofront' },
        { kind: 'block', type: 'looks_gobacklayers' },
      ],
    },
    {
      kind: 'category',
      name: 'Sound',
      colour: '#CF63CF',
      contents: [
        { kind: 'block', type: 'sound_play' },
        { kind: 'block', type: 'sound_playuntildone' },
        { kind: 'block', type: 'sound_stop' },
        { kind: 'block', type: 'sound_changevolumeby' },
        { kind: 'block', type: 'sound_setvolumeto' },
        { kind: 'block', type: 'sound_volume' },
      ],
    },
    {
      kind: 'category',
      name: 'Events',
      colour: '#FFBF00',
      contents: [
        { kind: 'block', type: 'event_whenflagclicked' },
        { kind: 'block', type: 'event_whenkeypressed' },
        { kind: 'block', type: 'event_whenthisspriteclicked' },
        { kind: 'block', type: 'event_whenstageclicked' },
        { kind: 'block', type: 'event_broadcast' },
        { kind: 'block', type: 'event_broadcastandwait' },
        { kind: 'block', type: 'event_whenbroadcastreceived' },
      ],
    },
    {
      kind: 'category',
      name: 'Control',
      colour: '#FFAB19',
      contents: [
        { kind: 'block', type: 'control_wait' },
        { kind: 'block', type: 'control_repeat' },
        { kind: 'block', type: 'control_forever' },
        { kind: 'block', type: 'control_if' },
        { kind: 'block', type: 'control_if_else' },
        { kind: 'block', type: 'control_wait_until' },
        { kind: 'block', type: 'control_repeat_until' },
        { kind: 'block', type: 'control_stop' },
        { kind: 'block', type: 'control_create_clone_of' },
        { kind: 'block', type: 'control_delete_this_clone' },
      ],
    },
    {
      kind: 'category',
      name: 'Sensing',
      colour: '#5CB3CC',
      contents: [
        { kind: 'block', type: 'sensing_touchingobject' },
        { kind: 'block', type: 'sensing_distanceto' },
        { kind: 'block', type: 'sensing_askandwait' },
        { kind: 'block', type: 'sensing_answer' },
        { kind: 'block', type: 'sensing_keypressed' },
        { kind: 'block', type: 'sensing_mousedown' },
        { kind: 'block', type: 'sensing_mousex' },
        { kind: 'block', type: 'sensing_mousey' },
        { kind: 'block', type: 'sensing_timer' },
        { kind: 'block', type: 'sensing_resettimer' },
      ],
    },
    {
      kind: 'category',
      name: 'Operators',
      colour: '#59C059',
      contents: [
        { kind: 'block', type: 'operator_add' },
        { kind: 'block', type: 'operator_subtract' },
        { kind: 'block', type: 'operator_multiply' },
        { kind: 'block', type: 'operator_divide' },
        { kind: 'block', type: 'operator_random' },
        { kind: 'block', type: 'operator_gt' },
        { kind: 'block', type: 'operator_lt' },
        { kind: 'block', type: 'operator_equals' },
        { kind: 'block', type: 'operator_and' },
        { kind: 'block', type: 'operator_or' },
        { kind: 'block', type: 'operator_not' },
      ],
    },
    {
      kind: 'category',
      name: 'Variables',
      colour: '#FF8C1A',
      custom: 'VARIABLE',
    },
  ],
};

// Singleton to track initialization
let blocksRegistered = false;
let workspaceSingleton: Blockly.WorkspaceSvg | null = null;

// Export function to get the workspace
export function getBlocklyWorkspace(): Blockly.WorkspaceSvg | null {
  return workspaceSingleton;
}

export function BlocklyEditor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent double initialization
    if (workspaceSingleton) {
      return;
    }

    // Register custom blocks only once
    if (!blocksRegistered) {
      try {
        registerMotionBlocks();
        registerLooksBlocks();
        registerSoundBlocks();
        registerEventsBlocks();
        registerControlBlocks();
        registerSensingBlocks();
        registerOperatorsBlocks();
        registerVariablesBlocks();
        blocksRegistered = true;
      } catch (error) {
        console.error('Error registering blocks:', error);
      }
    }

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth || 800;
    let startScale = 0.8;
    if (containerWidth < 600) {
      startScale = 0.6;
    } else if (containerWidth < 900) {
      startScale = 0.7;
    }

    // Create workspace
    const workspace = Blockly.inject(containerRef.current, {
      toolbox: toolboxDef as any,
      scrollbars: true,
      trashcan: true,
      renderer: 'zelos',
      sounds: false,
      zoom: {
        controls: true,
        wheel: true,
        startScale,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.1,
      },
      grid: {
        spacing: 20,
        colour: '#eee',
        length: 1,
        snap: true,
      },
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true,
        },
        drag: true,
        wheel: true,
      },
      toolboxPosition: 'start',
      horizontalLayout: false,
    });

    workspaceSingleton = workspace;

    // Listen for toolbox ready event
    const selectFirstCategory = () => {
      try {
        const toolbox = workspace.getToolbox();
        if (!toolbox) {
          console.log('[Blockly] Toolbox not ready');
          return;
        }

        // Get all categories using Blockly 11 API
        const contents = (toolbox as any).getToolboxItems?.();
        if (!contents || contents.length === 0) {
          console.log('[Blockly] No contents in toolbox');
          return;
        }

        const firstCategory = contents[0];
        const categoryId = (firstCategory as any).id || 'motion';
        console.log('[Blockly] First category id:', categoryId);

        // Method 1: Use setSelectedItem (Blockly 11 API)
        try {
          if (typeof toolbox.setSelectedItem === 'function') {
            toolbox.setSelectedItem(firstCategory);
            console.log('[Blockly] Used setSelectedItem');
          }
        } catch (e) {
          console.log('[Blockly] setSelectedItem error:', e);
        }

        // Method 2: Use selectItemByPosition (Blockly 11 API)
        try {
          if (typeof toolbox.selectItemByPosition === 'function') {
            toolbox.selectItemByPosition(0);
            console.log('[Blockly] Used selectItemByPosition(0)');
          }
        } catch (e) {
          console.log('[Blockly] selectItemByPosition error:', e);
        }

        // Method 3: DOM click simulation - trigger the actual UI
        setTimeout(() => {
          const categoryEl = document.querySelector('.blocklyTreeRow') as HTMLElement;
          if (categoryEl) {
            categoryEl.click();
            console.log('[Blockly] Native click triggered');
          }
        }, 200);

        // Method 4: Manual flyout population if needed
        setTimeout(() => {
          try {
            const flyout = workspace.getToolbox()?.getFlyout();
            if (flyout) {
              const flyoutContents = (flyout as any).getContents?.() || [];
              if (flyoutContents.length === 0) {
                console.log('[Blockly] Flyout empty - trying manual show');
                // Get Motion category blocks from toolbox definition
                const motionCategory = toolboxDef.contents.find((c: any) => c.id === 'motion' || c.name === 'Motion');
                const categoryBlocks = motionCategory?.contents || [];
                if (categoryBlocks.length > 0 && (flyout as any).show) {
                  console.log('[Blockly] Showing blocks:', categoryBlocks.length);
                  (flyout as any).show(categoryBlocks);
                }
              }
            }
          } catch (e) {
            console.log('[Blockly] Flyout check error:', e);
          }
        }, 1000);
      } catch (e) {
        console.error('[Blockly] Category selection error:', e);
      }
    };

    // Use Blockly's event system - listen for workspace load event
    const initToolbox = () => {
      // Wait for DOM to be ready
      setTimeout(() => {
        // Check if toolbox is ready
        const toolbox = workspace.getToolbox();
        if (toolbox) {
          console.log('[Blockly] Toolbox ready, selecting first category');
          selectFirstCategory();
        } else {
          // Retry if toolbox not ready
          setTimeout(initToolbox, 500);
        }
      }, 500);
    };

    initToolbox();

    // Keep flyout visible - run periodically
    const keepFlyoutVisible = () => {
      try {
        const flyout = workspace.getToolbox()?.getFlyout();
        if (flyout) {
          flyout.setVisible(true);
        }
      } catch (e) {
        // Ignore errors
      }
    };

    // Initial check
    setTimeout(keepFlyoutVisible, 600);
    // Keep flyout visible
    setInterval(keepFlyoutVisible, 1500);

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      if (workspace) {
        try {
          Blockly.svgResize(workspace);
        } catch (e) {
          // Ignore
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (workspace) {
        try {
          workspace.dispose();
        } catch (e) {
          // Ignore
        }
      }
      workspaceSingleton = null;
    };
  }, []);

  return (
    <div className="blockly-editor">
      <div ref={containerRef} className="blockly-container" />
    </div>
  );
}
