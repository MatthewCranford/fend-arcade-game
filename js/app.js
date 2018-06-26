// Enemies our player must avoid
/*
Accepts 3 parameters:
    x position,
    y position,
    and movement speed
*/
var Enemy = function(x, y, speed = 200) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Save initial spawn location
    this.startingX = x;
    this.startingY = y;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(dt * 12);
    if (this.x < board.RIGHT_WALL - board.OFFSCREEN_TILE) {
        this.x += this.speed * dt;
    }
    else {
        this.x = board.OFFSCREEN_TILE;
        console.log(this.startingX);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/*
Accepts 3 parameters:
    x position,
    y position,
    and sprite avatar
*/
class Hero {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
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
        this.heroStartTileX = this.TILE_WIDTH * 2;
        this.heroStartTileY = this.TOP_WALL + (this.TILE_HEIGHT * 4);
        this.enemyOneStartTileX = this.OFFSCREEN_TILE;
        this.enemyOneStartTileY = this.TOP_WALL;
        this.enemyTwoStartTileX = this.OFFSCREEN_TILE;
        this.enemyTwoStartTileY = this.TOP_WALL + this.TILE_HEIGHT;
        this.enemyThreeStartTileX = this.OFFSCREEN_TILE - (this.TILE_WIDTH * 1.5);
        this.enemyThreeStartTileY = this.TOP_WALL + this.TILE_HEIGHT;
        this.enemyFourStartTileX = this.OFFSCREEN_TILE - (this.TILE_WIDTH * 2);
        this.enemyFourStartTileY = this.TOP_WALL + (this.TILE_HEIGHT * 2);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const board = new Board();
const player = new Hero(board.heroStartTileX, board.heroStartTileY, 'images/char-boy.png');
const enemyOne = new Enemy(board.enemyOneStartTileX, board.enemyOneStartTileY); // Top row
const enemyTwo = new Enemy(board.enemyTwoStartTileX, board.enemyTwoStartTileY, 350); // Second row
const enemyThree = new Enemy(board.enemyThreeStartTileX, board.enemyThreeStartTileY, 350); // Second row
const enemyFour = new Enemy(board.enemyFourStartTileX, board.enemyFourStartTileY, 150); // Third row
const allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];




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