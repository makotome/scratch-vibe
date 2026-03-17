import { useEffect, useRef, useState } from 'react';
import { Stage as KonvaStage, Layer, Rect, Group, Image as KonvaImage, Text } from 'react-konva';
import { useProjectStore, useSpriteStore, useRuntimeStore } from '../../stores';
import Konva from 'konva';
import './Stage.css';

export function Stage() {
  const { stage } = useProjectStore();
  const { sprites, selectedSpriteId, selectSprite, updateSprite } = useSpriteStore();
  const { isRunning, redrawRequested, clearRedraw } = useRuntimeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 480, height: 360 });
  const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // 为标题栏预留空间
        setDimensions({ width: rect.width, height: rect.height - 40 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Load images for sprites
  useEffect(() => {
    const loadImages = async () => {
      const newImages: { [key: string]: HTMLImageElement } = {};

      for (const sprite of sprites) {
        for (const costume of sprite.costumes) {
          if (costume.assetId && !images[costume.assetId]) {
            const img = new window.Image();
            img.src = costume.assetId;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            newImages[costume.assetId] = img;
          }
        }
      }

      if (Object.keys(newImages).length > 0) {
        setImages((prev) => ({ ...prev, ...newImages }));
      }
    };

    loadImages();
  }, [sprites]);

  // Request redraw when runtime requests it
  useEffect(() => {
    if (redrawRequested) {
      clearRedraw();
    }
  }, [redrawRequested, clearRedraw]);

  const handleDragEnd = (spriteId: string, e: Konva.KonvaEventObject<DragEvent>) => {
    updateSprite(spriteId, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // TODO: 实现真正的全屏功能
  };

  return (
    <div className={`stage-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="stage-header">
        <div className="stage-title">
          <span className="stage-icon">🎭</span>
          舞台
        </div>
        <div className="stage-controls">
          <button
            className="stage-control-btn"
            onClick={handleFullscreen}
            title={isFullscreen ? '退出全屏' : '进入全屏'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              {isFullscreen ? (
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              ) : (
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              )}
            </svg>
          </button>
          <button className="stage-control-btn" title="背景选项">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={containerRef} className="stage">
        <KonvaStage
          width={dimensions.width}
          height={dimensions.height}
          scaleX={dimensions.width / stage.width}
          scaleY={dimensions.height / stage.height}
        >
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={stage.width}
              height={stage.height}
              fill="#ffffff"
            />

            {/* Sprites */}
            {sprites.map((sprite) => {
              const currentCostume = sprite.costumes[sprite.currentCostumeIndex];
              const img = currentCostume ? images[currentCostume.assetId] : null;

              // Convert from centered coordinates (Scratch style) to Konva coordinates
              // Center of stage is at (stage.width/2, stage.height/2)
              const konvaX = stage.width / 2 + sprite.x;
              const konvaY = stage.height / 2 - sprite.y;

              return (
                <Group
                  key={sprite.id}
                  x={konvaX}
                  y={konvaY}
                  rotation={-sprite.rotation}
                  scaleX={sprite.scaleX}
                  scaleY={sprite.scaleY}
                  visible={sprite.visible}
                  draggable={!isRunning}
                  onClick={() => selectSprite(sprite.id)}
                  onDragEnd={(e) => handleDragEnd(sprite.id, e)}
                >
                  {img ? (
                    <KonvaImage
                      image={img}
                      width={94}
                      height={110}
                      offsetX={currentCostume?.rotationCenterX || 47}
                      offsetY={currentCostume?.rotationCenterY || 55}
                    />
                  ) : (
                    <Rect
                      width={50}
                      height={50}
                      fill={selectedSpriteId === sprite.id ? '#4C97FF' : '#9966FF'}
                      cornerRadius={8}
                      stroke={selectedSpriteId === sprite.id ? '#fff' : undefined}
                      strokeWidth={2}
                    />
                  )}
                  {!isRunning && selectedSpriteId === sprite.id && (
                    <Text
                      text={sprite.name}
                      y={60}
                      fontSize={12}
                      fill="#333"
                      width={60}
                      align="center"
                    />
                  )}
                </Group>
              );
            })}
          </Layer>
        </KonvaStage>
      </div>
    </div>
  );
}
