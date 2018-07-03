'use strict';

// IIFE call with global window object
(function(global) {

    // Escape global space by storing game in object
    global.game = {}

    // Game content and logic
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

            // Start coords of enemies
            this.enemies = [
                {
                    x: this.OFFSCREEN_TILE,
                    y: this.TOP_WALL
                }, 
                {
                    x: this.OFFSCREEN_TILE,
                    y: this.TOP_WALL + this.TILE_HEIGHT
                }, 
                {
                    x: this.OFFSCREEN_TILE - (this.TILE_WIDTH * 1.5),
                    y: this.TOP_WALL + this.TILE_HEIGHT
                },
                {
                    x: this.OFFSCREEN_TILE - (this.TILE_WIDTH * 2),
                    y: this.TOP_WALL + (this.TILE_HEIGHT * 2)
                }
            ];

            // Controls painting next animation frame
            this.paintNextFrame = true;
        }

        initBoard() {
            this.initEnemies();
            this.initPlayer();
            this.initKeys();
        }

        // Create instances of all enemies
        initEnemies() {
            game.allEnemies = [];
            for (let i = 0; i <= 3; i++) {
                const newEnemy = new Enemy(this.enemies[i].x, this.enemies[i].y);
                game.allEnemies.push(newEnemy);
            }
        }

        // Create player instance
        initPlayer() {
            game.player = new Hero(this.heroStartTileX, this.heroStartTileY, 'images/char-boy.png');
        }
 
        // This listens for key presses and sends the keys to your
        // Player.handleInput() method. You don't need to modify this.
        initKeys() {
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
                game.player.handleInput(allowedKeys[e.keyCode]);
            });
        } 

        // Handle victory modal's on/off state
       toggleVictoryModal() {
            const modal = document.querySelector('.modal');
            modal.classList.toggle('hide');
        } 
    }

    /**
     * Player character
     * 
     * @param  {int} x - x coord position
     * @param  {int} y - y coord position
     * @param  {string} sprite - Player sprite
     */
    class Hero {
        constructor(x, y, sprite) {
            this.startX = x;
            this.startY = y;
            this.x = this.startX;
            this.y = this.startY;
            this.sprite = sprite;
        }

        // Player position logic
        update() {
            checkCollision();
            checkVictory();

            // Checks if player collides with enemy
            function checkCollision() {
                game.allEnemies.forEach(enemy => {
                    if (collision(enemy)) {
                        game.player.resetHero();
                    }
                });

                /**
                 * Return boolean on whether a game.player and enemy collision occurred
                 * 
                 * @param  {object} enemy - Enemy object
                 */
                function collision(enemy) {
                    const COLLISION_BUFFER = 2 // Reduce hitbox size
                    const enemyLeft = enemy.x;
                    const enemyRight = enemy.x + (game.board.TILE_WIDTH / COLLISION_BUFFER);
                    const playerLeft = game.player.x;
                    const playerRight = game.player.x + (game.board.TILE_WIDTH / COLLISION_BUFFER);
                    return ((enemyRight > playerLeft &&
                        enemyLeft < playerRight) &&
                        (enemy.y === game.player.y));
                }
            }

            // Check if player reached river
            function checkVictory() {
                if (victory()) {
                    game.board.paintNextFrame = false;
                }

                // Check if player reached the water
                function victory() {              
                    if (game.player.y === game.board.TOP_WALL) {
                        return true;
                    }
                }
            }
        }

        // Render hero
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

        // Hero movement
        handleInput(key) {
            switch (key) {
                case 'left':
                    if (this.x > game.board.LEFT_WALL) {
                        this.x -= game.board.TILE_WIDTH;
                    }
                    break;
                case 'right':
                    if (this.x < game.board.RIGHT_WALL) {
                        this.x += game.board.TILE_WIDTH;
                    }
                    break;
                case 'up':
                if (this.y > game.board.TOP_WALL) {
                        this.y -= game.board.TILE_HEIGHT;
                    }
                    break;
                case 'down':
                    if (this.y < game.board.BOTTOM_WALL) {
                        this.y += game.board.TILE_HEIGHT;
                    }
                    break;
            }
        }

        // Reset hero back to starting coords
        resetHero() {
            this.x = this.startX;
            this.y = this.startY;
        }
    }

    /**
     * Enemies our player must avoid
     * 
     * @param  {int} x - x coord position
     * @param  {int} y - y coord position
     * @param  {int} speed=200 - Movement speed
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
            if (this.x < game.board.RIGHT_WALL - game.board.OFFSCREEN_TILE) {
                this.x += this.speed * dt;
            }
            else {
                this.x = game.board.OFFSCREEN_TILE;
            }
        }  
        // Draw the enemy on the screen, required method for game
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        } 
    };

    game.board = new Board();
    game.board.initBoard();
  
})(window)

