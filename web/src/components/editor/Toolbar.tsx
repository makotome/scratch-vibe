import { useEditorStore, useRuntimeStore } from '../../stores';
import { getBlocklyWorkspace } from './BlocklyEditor';
import { getWorkspaceScripts } from '../../runtime/BlockParser';
import { executor } from '../../runtime/Executor';
import './Toolbar.css';

export function Toolbar() {
  const { isRunning, isPaused, startRunning, stopRunning, pauseRunning, resumeRunning } = useEditorStore();
  const { requestRedraw, clearRedraw } = useRuntimeStore();

  const handlePlay = () => {
    if (isPaused) {
      resumeRunning();
    } else {
      // Get scripts from Blockly workspace
      const workspace = getBlocklyWorkspace();

      if (workspace) {
        const scripts = getWorkspaceScripts(workspace);

        if (scripts.length === 0) {
          console.log('No scripts found! Add a green flag block to start.');
        }

        // Load scripts into executor
        executor.loadScripts(scripts);

        // Start execution
        executor.start();

        // Update runtime state
        startRunning();
      }
    }
  };

  const handleStop = () => {
    executor.stop();
    stopRunning();
  };

  return (
    <div className="scratch-controls">
      <button
        className={`scratch-control-btn green-flag ${isRunning && !isPaused ? 'active' : ''}`}
        onClick={handlePlay}
        title={isPaused ? "Resume" : "Start"}
        aria-label="Green flag - Start program"
      >
        <svg className="flag-icon" viewBox="0 0 16.63 17.5" width="20" height="20">
          <defs>
            <linearGradient id="greenFlagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4CBB17', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0E7A0F', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0D6B0C', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M1.5,0.67c0,0,0.66,0.02,0.66,0.02c-0.01,0.09,0.01,0.14,0.01,0.14l13.75,0.02C16.08,0.85 16.23,1.32 15.84,1.62c0,0-7.24,8.44-7.24,8.44c-0.05,0.23-0.14,0.46-0.3,0.65l-7.64,8.53C0.57,19.4,0.4,19.51,0.21,19.52C0.03,19.53-0.12,19.44-0.19,19.28C-0.25,19.13-0.23,18.96-0.13,18.83l7.13-8.03c0.14-0.16,0.23-0.36,0.28-0.58l7.62-8.99l-13.39,0C1.51,1.22 1.5,0.67 1.5,0.67z"
            fill="url(#greenFlagGradient)"
            stroke="#0A5A0B"
            strokeWidth="0.5" />
        </svg>
        <span className="button-text">开始</span>
      </button>

      <button
        className={`scratch-control-btn stop ${!isRunning ? 'disabled' : ''}`}
        onClick={handleStop}
        disabled={!isRunning}
        title="Stop"
        aria-label="Stop button - Stop program"
      >
        <svg className="stop-icon" viewBox="0 0 20 20" width="20" height="20">
          <defs>
            <linearGradient id="stopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FF4757', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#C0392B', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <polygon points="10,1 18.66,5.5 18.66,14.5 10,19 1.34,14.5 1.34,5.5"
            fill="url(#stopGradient)"
            stroke="#A93226"
            strokeWidth="1" />
          <rect x="7" y="7" width="6" height="6" fill="white" />
        </svg>
        <span className="button-text">停止</span>
      </button>
    </div>
  );
}
