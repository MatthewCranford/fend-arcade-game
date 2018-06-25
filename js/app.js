const LEFT_WALL = 0;
const RIGHT_WALL = 404;
const TOP_WALL = 53;
const BOTTOM_WALL = 385;
const CANVAS_TILE_WIDTH = 101;
const CANVAS_TILE_HEIGHT = 83;
const heroStartTileX = LEFT_WALL + (CANVAS_TILE_WIDTH * 2);
const heroStartTileY = TOP_WALL + (CANVAS_TILE_HEIGHT * 4);
const enemyOneStartTileX = LEFT_WALL - CANVAS_TILE_WIDTH;
const enemyOneStartTileY = TOP_WALL;
const enemyTwoStartTileX = LEFT_WALL - CANVAS_TILE_WIDTH;
const enemyTwoStartTileY = TOP_WALL + CANVAS_TILE_HEIGHT;
const enemyThreeStartTileX = LEFT_WALL - (CANVAS_TILE_WIDTH * 3);
const enemyThreeStartTileY = TOP_WALL + CANVAS_TILE_HEIGHT;
const enemyFourStartTileX = LEFT_WALL - (CANVAS_TILE_WIDTH * 2);
const enemyFourStartTileY = TOP_WALL + (CANVAS_TILE_HEIGHT * 2);


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
    if (this.x < RIGHT_WALL +CANVAS_TILE_WIDTH) {
        this.x += this.speed * dt;
    }
    else {
        this.x = enemyOneStartTileX;
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
                if (this.x > LEFT_WALL) {
                    this.x -= CANVAS_TILE_WIDTH;
                }
                break;
            case 'right':
                if (this.x < RIGHT_WALL) {
                    this.x += CANVAS_TILE_WIDTH;
                }
                break;
            case 'up':
               if (this.y > TOP_WALL) {
                    this.y -= CANVAS_TILE_HEIGHT;
                }
                break;
            case 'down':
                if (this.y < BOTTOM_WALL) {
                    this.y += CANVAS_TILE_HEIGHT;
                }
                break;
        }

        console.log(this.x,this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero(heroStartTileX, heroStartTileY, 'images/char-boy.png');
const enemyOne = new Enemy(enemyOneStartTileX, enemyOneStartTileY); // Top row
const enemyTwo = new Enemy(enemyTwoStartTileX, enemyTwoStartTileY, 400); // Second row
const enemyThree = new Enemy(enemyThreeStartTileX, enemyThreeStartTileY, 400); // Second row
const enemyFour = new Enemy(enemyFourStartTileX, enemyFourStartTileY, 300); // Third row
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
