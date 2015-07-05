// Put all your game code within this function definition
window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

  function preload() {

    game.load.tilemap('level1', 'images/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'images/tiles-1.png');
    game.load.spritesheet('mermaid', 'images/mermaids.png', 72, 72);
    game.load.spritesheet('droid', 'images/droid.png', 32, 32);
    game.load.image('starSmall', 'images/star.png');
    game.load.image('starBig', 'images/star2.png');
    game.load.image('background', 'images/background.jpg');
    game.load.image('water', 'images/water.jpg');
  }

  var map;
  var tileset;
  var layer;
  var player;
  var facing = 'left';
  var jumpTimer = 0;
  var cursors;
  var jumpButton;
  var bg;
  var water;

  function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    water = game.add.tileSprite(0, 0, 1024, 10000, 'water');
    water.fixedToCamera = false;

    bg = game.add.tileSprite(0, 0, 2048, 247, 'background');
    bg.fixedToCamera = false;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    game.physics.arcade.gravity.y = 0;

    player = game.add.sprite(32, 32, 'mermaid');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    // player.body.bounce.y = 0;
    player.body.velocity.y= 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('down',  [0, 1], 10, true);
    player.animations.add('left',  [2, 3], 10, true);
    player.animations.add('right', [4, 5], 10, true);
    player.animations.add('up',    [6, 7], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  }

  function update() {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    if (cursors.down.isDown)
    {
        player.body.velocity.y = 150;
        player.animations.play('down');
    }
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -150;
        player.animations.play('up');
    }

    if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown)
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

     
        
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
  }

  function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

  }
};

