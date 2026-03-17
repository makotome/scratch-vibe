import { useState } from 'react';
import { useSpriteStore, createDefaultSprite } from '../../stores';
import './SpriteList.css';

export function SpriteList() {
  const { sprites, selectedSpriteId, selectSprite, addSprite, removeSprite, moveSpriteUp, moveSpriteDown } = useSpriteStore();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [draggedSprite, setDraggedSprite] = useState<string | null>(null);

  const handleAddSprite = (type: 'cat' | 'random' | 'upload' = 'cat') => {
    const id = `sprite-${Date.now()}`;
    let name = 'Sprite';

    switch (type) {
      case 'cat':
        name = `Cat${sprites.length + 1}`;
        break;
      case 'random':
        name = `Sprite${sprites.length + 1}`;
        break;
      case 'upload':
        name = `CustomSprite${sprites.length + 1}`;
        break;
    }

    const newSprite = createDefaultSprite(name, id);
    newSprite.layerOrder = sprites.length;
    addSprite(newSprite);
    selectSprite(id);
    setShowAddMenu(false);
  };

  const handleDeleteSprite = (e: React.MouseEvent, spriteId: string) => {
    e.stopPropagation();
    if (sprites.length <= 1) {
      alert('You need at least one sprite in your project!');
      return;
    }
    if (confirm('Are you sure you want to delete this sprite?')) {
      removeSprite(spriteId);
    }
  };

  const handleDuplicateSprite = (e: React.MouseEvent, spriteId: string) => {
    e.stopPropagation();
    const originalSprite = sprites.find(s => s.id === spriteId);
    if (originalSprite) {
      const id = `sprite-${Date.now()}`;
      const duplicatedSprite = {
        ...originalSprite,
        id,
        name: `${originalSprite.name} copy`,
        layerOrder: sprites.length,
        x: originalSprite.x + 20,
        y: originalSprite.y + 20,
      };
      addSprite(duplicatedSprite);
      selectSprite(id);
    }
  };

  return (
    <div className="sprite-list">
      <div className="sprite-list-header">
        <div className="sprite-list-title">
          <span className="title-text">Sprites</span>
          <span className="sprite-count">{sprites.length}</span>
        </div>
        <div className="sprite-actions-header">
          <div className="add-sprite-menu">
            <button
              className="add-sprite-btn"
              onClick={() => setShowAddMenu(!showAddMenu)}
              title="Add Sprite"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
            {showAddMenu && (
              <div className="add-menu-dropdown">
                <button onClick={() => handleAddSprite('cat')}>
                  🐱 Choose a Sprite
                </button>
                <button onClick={() => handleAddSprite('random')}>
                  🎲 Surprise
                </button>
                <button onClick={() => handleAddSprite('upload')}>
                  📁 Upload Sprite
                </button>
                <button>
                  🎨 Paint
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sprite-items">
        {sprites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <p>No sprites yet!</p>
            <button
              className="add-first-sprite-btn"
              onClick={() => handleAddSprite('cat')}
            >
              Add your first sprite
            </button>
          </div>
        ) : (
          sprites.map((sprite, index) => (
            <div
              key={sprite.id}
              className={`sprite-item ${selectedSpriteId === sprite.id ? 'selected' : ''} ${draggedSprite === sprite.id ? 'dragging' : ''}`}
              onClick={() => selectSprite(sprite.id)}
              draggable
              onDragStart={() => setDraggedSprite(sprite.id)}
              onDragEnd={() => setDraggedSprite(null)}
            >
              <div className="sprite-info">
                <div className="sprite-thumbnail">
                  {sprite.costumes.length > 0 ? (
                    <img src={sprite.costumes[sprite.currentCostumeIndex]?.assetId || ''} alt={sprite.name} />
                  ) : (
                    <div className="sprite-placeholder" />
                  )}
                  <div className="sprite-layer-badge">{index + 1}</div>
                </div>
                <div className="sprite-details">
                  <span className="sprite-name">{sprite.name}</span>
                  <div className="sprite-stats">
                    <span className="stat-item">
                      <span className="stat-icon">👕</span>
                      <span className="stat-value">{sprite.costumes.length}</span>
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">🔊</span>
                      <span className="stat-value">{sprite.sounds?.length || 0}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="sprite-actions">
                <button
                  className="sprite-action-btn duplicate"
                  onClick={(e) => handleDuplicateSprite(e, sprite.id)}
                  title="Duplicate"
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                </button>
                <button
                  className="sprite-action-btn"
                  onClick={(e) => { e.stopPropagation(); moveSpriteUp(sprite.id); }}
                  title="Move Up"
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                  </svg>
                </button>
                <button
                  className="sprite-action-btn"
                  onClick={(e) => { e.stopPropagation(); moveSpriteDown(sprite.id); }}
                  title="Move Down"
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                  </svg>
                </button>
                {sprites.length > 1 && (
                  <button
                    className="sprite-action-btn delete"
                    onClick={(e) => handleDeleteSprite(e, sprite.id)}
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
