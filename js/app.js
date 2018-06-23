// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    // Update
    update() {

    }
    // Render hero
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handle user keyboard input
    handleInput(key) {
        const LEFT_WALL = 0;
        const RIGHT_WALL = 404;
        const TOP_WALL = 53;
        const BOTTOM_WALL = 385;

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
        console.log(this.x,this.y)
    }
}

const CANVAS_TILE_WIDTH = 101;
const CANVAS_TILE_HEIGHT = 83;
const startingTileX = Math.floor(CANVAS_TILE_WIDTH * 2);
const startingTileY = Math.floor(CANVAS_TILE_HEIGHT * 5 -30);

const player = new Hero('images/char-boy.png', startingTileX, startingTileY);




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
