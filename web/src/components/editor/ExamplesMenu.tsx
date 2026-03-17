import { useState } from 'react';
import * as Blockly from 'blockly';
import { examples, examplesByCategory, type ExampleScript } from '../../data/examples';
import { getBlocklyWorkspace } from './BlocklyEditor';
import './ExamplesMenu.css';

interface ExamplesMenuProps {
  onExampleLoaded?: () => void;
}

export function ExamplesMenu({ onExampleLoaded }: ExamplesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const loadExample = (example: ExampleScript) => {
    const workspace = getBlocklyWorkspace();
    if (!workspace) {
      console.error('No workspace found');
      return;
    }

    try {
      // Clear existing blocks
      workspace.clear();

      // Calculate center position of workspace
      const metrics = workspace.getMetrics();
      const centerX = (metrics.viewWidth / 2) / metrics.zoom - metrics.scrollX / metrics.zoom;
      const centerY = (metrics.viewHeight / 2) / metrics.zoom - metrics.scrollY / metrics.zoom;

      // Adjust position to place blocks in center (offset by typical block size)
      const offsetX = centerX - 100;
      const offsetY = centerY - 50;

      // Parse XML and update block positions
      const xml = Blockly.utils.xml.textToDom(example.xml);

      // Move all top-level blocks to center position
      const xmlString = example.xml
        .replace(/x="(\d+)"/g, (match, x) => {
          const newX = parseInt(x) + offsetX;
          return `x="${newX}"`;
        })
        .replace(/y="(\d+)"/g, (match, y) => {
          const newY = parseInt(y) + offsetY;
          return `y="${newY}"`;
        });

      const adjustedXml = Blockly.utils.xml.textToDom(xmlString);
      Blockly.Xml.domToWorkspace(adjustedXml, workspace);

      // Force resize to ensure everything renders correctly
      setTimeout(() => {
        try {
          Blockly.svgResize(workspace);
        } catch (e) {
          // Ignore
        }
      }, 100);

      setIsOpen(false);
      onExampleLoaded?.();
    } catch (error) {
      console.error('Error loading example:', error);
    }
  };

  return (
    <div className="examples-menu">
      <button
        className="examples-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="加载示例"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <span>示例</span>
      </button>

      {isOpen && (
        <>
          <div className="examples-menu-backdrop" onClick={() => setIsOpen(false)} />
          <div className="examples-menu-dropdown">
            <div className="examples-menu-header">
              <span>选择示例</span>
              <button className="examples-menu-close" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
            <div className="examples-menu-content">
              {Object.entries(examplesByCategory).map(([category, categoryExamples]) => (
                <div key={category} className="examples-category">
                  <div className="examples-category-title">{category}</div>
                  {categoryExamples.map((example) => (
                    <button
                      key={example.id}
                      className="examples-item"
                      onClick={() => loadExample(example)}
                      title={example.description}
                    >
                      <span className="examples-item-name">{example.name}</span>
                      <span className="examples-item-desc">{example.description}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
