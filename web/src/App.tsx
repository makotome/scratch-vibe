import { useEffect, useRef } from 'react';
import { useEditorStore, useSpriteStore, useProjectStore, createDefaultSprite } from './stores';
import { Editor } from './components/editor/Editor';
import { Stage } from './components/editor/Stage';
import { Header } from './components/common/Header';
import { SpriteList } from './components/sprite/SpriteList';
import catImage from './assets/cat.svg';
import './App.css';

function App() {
  const { isStageMinimized } = useEditorStore();
  const { sprites, selectSprite, addSprite } = useSpriteStore();
  const { setProject } = useProjectStore();
  const initialized = useRef(false);

  // 初始化默认数据
  useEffect(() => {
    // 只在 sprites 为空且未初始化时添加默认角色
    if (initialized.current) return;
    initialized.current = true;

    // 设置默认项目
    setProject({
      id: 'demo-project',
      name: 'My First Project',
      ownerId: '',
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 延迟添加默认角色，确保 store 已初始化
    setTimeout(() => {
      if (sprites.length === 0) {
        const catSprite = createDefaultSprite('Cat', 'sprite-1');
        catSprite.x = 0;
        catSprite.y = 0;
        catSprite.direction = 90;
        catSprite.costumes = [
          {
            id: 'costume-1',
            name: 'cat-a',
            assetId: catImage,
            rotationCenterX: 47,
            rotationCenterY: 55,
          },
        ];
        catSprite.currentCostumeIndex = 0;
        addSprite(catSprite);
        selectSprite(catSprite.id);
      }
    }, 0);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className={`app-main ${isStageMinimized ? 'stage-minimized' : ''}`}>
        {/* 左+中: Blockly 编辑器（含原生 Toolbox） */}
        <section className="editor-area">
          <Editor />
        </section>

        {/* 右侧: 舞台和精灵 */}
        {!isStageMinimized && (
          <div className="right-panel">
            <section className="stage-area">
              <Stage />
            </section>
            <aside className="sprites-area">
              <SpriteList />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
