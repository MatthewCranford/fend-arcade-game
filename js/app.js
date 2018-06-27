'use strict';

// Board object that holds the tile calculation abstractions as props
class Board {
    constructor() {
        this.TILE_WIDTH = 101;
        this.TILE_HEIGHT = 83;
        this.LEFT_WALL = 0;
        this.RIGHT_WALL = 404;
        this.TOP_WALL = 53;
        this.BOTTOM_WALL = 385;
        this.OFFSCREEN_TILE = this.LEFT_WALL - this.TILE_WIDTH;
    }
}

/**
 * Player character
 * 
 * @param  {} sprite - Player sprite
 */
class Hero {
    constructor(sprite) {
        this.heroStartTileX = board.TILE_WIDTH * 2;
        this.heroStartTileY = board.TOP_WALL + (board.TILE_HEIGHT * 4);
        this.x = this.heroStartTileX;
        this.y = this.heroStartTileY;
        this.sprite = sprite;
    }
    // Reset hero back to starting tile
    respawn() {
        this.x = this.heroStartTileX;
        this.y = this.heroStartTileY;
    }
    // Render hero
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handle user keyboard input
    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x > board.LEFT_WALL) {
                    this.x -= board.TILE_WIDTH;
                }
                break;
            case 'right':
                if (this.x < board.RIGHT_WALL) {
                    this.x += board.TILE_WIDTH;
                }
                break;
            case 'up':
               if (this.y > board.TOP_WALL) {
                    this.y -= board.TILE_HEIGHT;
                }
                break;
            case 'down':
                if (this.y < board.BOTTOM_WALL) {
                    this.y += board.TILE_HEIGHT;
                }
                break;
        }
    }
}

/**
 * Enemies our player must avoid
 * 
 * @param  {} x - x coord position
 * @param  {} y - y coord position
 * @param  {} speed - Movement speed
 */
class Enemy {
    constructor(x, y, speed = 200) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';

        // Initial spawn location
        this.startingX = x;
        this.startingY = y;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < board.RIGHT_WALL - board.OFFSCREEN_TILE) {
            this.x += this.speed * dt;
        }
        else {
            this.x = board.OFFSCREEN_TILE;
        }
    }  
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } 
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const board = new Board();
const player = new Hero('images/char-boy.png');
const allEnemies = createEnemies();

// Create and return all enemy objects in an array
function createEnemies() {
    const enemies = [
        {
            x: board.OFFSCREEN_TILE,
            y: board.TOP_WALL,
            speed: 200
        }, 
        {
            x: board.OFFSCREEN_TILE,
            y: board.TOP_WALL + board.TILE_HEIGHT,
            speed: 300
        }, 
        {
            x: board.OFFSCREEN_TILE - (board.TILE_WIDTH * 1.5),
            y: board.TOP_WALL + board.TILE_HEIGHT,
            speed: 300
        },
        {
            x: board.OFFSCREEN_TILE - (board.TILE_WIDTH * 2),
            y: board.TOP_WALL + (board.TILE_HEIGHT * 2),
            speed: 150
        }
    ];
    let allEnemies = [];

    for (let i = 0; i <= 3; i++) {
        const newEnemy = new Enemy(enemies[i].x, enemies[i].y, enemies[i].speed);
        allEnemies.push(newEnemy);
    }

    return allEnemies;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        // Arrows
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // WASD
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});