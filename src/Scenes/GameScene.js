import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.spriteCount = 0;
    }
    
    preload() {
        // Create colored rectangles as sprites
        this.load.image('red-sprite', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }
    
    create() {
        // Create colored graphics for sprites
        this.add.text(400, 50, 'Phaser Game Window', {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        this.add.text(400, 100, 'Sprites will appear here when requested via LLM', {
            fontSize: '16px',
            fill: '#cccccc',
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0.5);
        
        // Store reference for external access
        window.gameScene = this;
    }
    
    addSprite(config = {}) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        const shapes = ['circle', 'square', 'triangle'];
        
        const color = config.color || colors[Math.floor(Math.random() * colors.length)];
        const shape = config.shape || shapes[Math.floor(Math.random() * shapes.length)];
        const size = config.size || (30 + Math.random() * 40);
        
        const x = config.x || (100 + Math.random() * 600);
        const y = config.y || (200 + Math.random() * 300);
        
        let sprite;
        
        if (shape === 'circle') {
            sprite = this.add.circle(x, y, size/2, color);
        } else if (shape === 'square') {
            sprite = this.add.rectangle(x, y, size, size, color);
        } else if (shape === 'triangle') {
            sprite = this.add.triangle(x, y, 0, size/2, -size/2, -size/2, size/2, -size/2, color);
        }
        
        // Add some interactivity
        sprite.setInteractive();
        sprite.on('pointerdown', () => {
            sprite.setTint(Math.random() * 0xffffff);
        });
        
        // Add physics or animations
        this.tweens.add({
            targets: sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true,
            ease: 'Power2'
        });
        
        this.spriteCount++;
        return {
            id: `sprite_${this.spriteCount}`,
            type: shape,
            color: color,
            position: { x, y },
            size: size
        };
    }
    
    clearSprites() {
        this.children.list.forEach(child => {
            if (child.type === 'Shape') {
                child.destroy();
            }
        });
        this.spriteCount = 0;
    }
}

export default GameScene;
