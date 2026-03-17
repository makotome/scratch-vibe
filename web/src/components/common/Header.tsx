import { useState } from 'react';
import { useProjectStore } from '../../stores';
import { Toolbar } from '../editor/Toolbar';
import { ExamplesMenu } from '../editor/ExamplesMenu';
import './Header.css';

// Scratch Logo SVG
const ScratchLogo = () => (
    <svg width="60" height="24" viewBox="0 0 79 24" className="scratch-logo">
        <g fill="currentColor">
            <path d="M12.71 2.44A2.14 2.14 0 0 1 15.08.27c2.73.33 5.18 1.8 7.03 4.28a12.04 12.04 0 0 1 2.48 8.34 12.05 12.05 0 0 1-2.48 8.34c-1.85 2.48-4.3 3.95-7.03 4.28a2.14 2.14 0 0 1-2.37-2.17V2.44z" />
            <path d="M0 4.52a2.13 2.13 0 0 1 2.13-2.13c2.73.33 5.18 1.8 7.03 4.28a12.04 12.04 0 0 1 2.48 8.34 12.05 12.05 0 0 1-2.48 8.34c-1.85 2.48-4.3 3.95-7.03 4.28A2.13 2.13 0 0 1 0 25.5V4.52z" />
        </g>
        <text x="28" y="18" fontSize="14" fontWeight="bold" fill="currentColor">Scratch</text>
    </svg>
);

// Menu Items
const menuItems = [
    { id: 'file', label: 'File', items: ['New', 'Load', 'Save', 'Save as...'] },
    { id: 'edit', label: 'Edit', items: ['Undo', 'Redo', 'Copy', 'Paste'] },
    { id: 'tutorials', label: 'Tutorials', items: ['Getting Started', 'Animation', 'Games', 'Music'] },
];

export function Header() {
    const { project, updateProject } = useProjectStore();
    const [isProjectNameEditing, setIsProjectNameEditing] = useState(false);
    const [projectName, setProjectName] = useState(project?.name || 'Untitled Project');
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const handleProjectNameSubmit = () => {
        setIsProjectNameEditing(false);
        if (project && projectName.trim()) {
            updateProject({ ...project, name: projectName.trim() });
        }
    };

    const handleMenuClick = (menuId: string) => {
        setOpenMenu(openMenu === menuId ? null : menuId);
    };

    const handleMenuItemClick = (item: string) => {
        setOpenMenu(null);
        // TODO: 实现菜单项功能
        console.log('Menu item clicked:', item);
    };

    return (
        <header className="scratch-header">
            {/* 左侧：Logo和菜单 */}
            <div className="header-left">
                <div className="header-logo">
                    <ScratchLogo />
                </div>

                <nav className="header-menu">
                    {menuItems.map((menu) => (
                        <div key={menu.id} className="menu-item">
                            <button
                                className={`menu-button ${openMenu === menu.id ? 'active' : ''}`}
                                onClick={() => handleMenuClick(menu.id)}
                            >
                                {menu.label}
                            </button>
                            {openMenu === menu.id && (
                                <div className="menu-dropdown">
                                    {menu.items.map((item) => (
                                        <button
                                            key={item}
                                            className="dropdown-item"
                                            onClick={() => handleMenuItemClick(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* 中间：项目名称 */}
            <div className="header-center">
                {isProjectNameEditing ? (
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        onBlur={handleProjectNameSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleProjectNameSubmit();
                            if (e.key === 'Escape') {
                                setIsProjectNameEditing(false);
                                setProjectName(project?.name || 'Untitled Project');
                            }
                        }}
                        className="project-name-input"
                        autoFocus
                    />
                ) : (
                    <button
                        className="project-name"
                        onClick={() => setIsProjectNameEditing(true)}
                    >
                        {project?.name || 'Untitled Project'}
                    </button>
                )}
            </div>

            {/* 右侧：工具栏和用户区 */}
            <div className="header-right">
                <ExamplesMenu />
                <Toolbar />
                <div className="user-actions">
                    <button className="action-button share">Share</button>
                    <button className="action-button see-inside">See inside</button>
                    <div className="user-menu">
                        <button className="user-avatar">👤</button>
                    </div>
                </div>
            </div>
        </header>
    );
}