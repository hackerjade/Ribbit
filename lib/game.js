(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Game = Ribbit.Game = function (options) {
    this.score = 0;
    this.lives = 3;
    this.vehicles = [];
    this.floatingObjects = [];
    this.loadSprites();
    // this.startMusic();
    this.dim_x = options.width;
    this.dim_y = options.height;
    console.log(this.dim_x, this.dim_y);

    this.frog = new Ribbit.Frog({
      game: this,
      dim_x: this.dim_x,
      dim_y: this.dim_y
    });
  };

  // Game.DIM_X = 1000;
  // Game.DIM_Y = 600;
  Game.BG_COLOR = "#191970";

  Game.prototype.startMusic = function () {
    var theme = document.createElement('audio');
    theme.setAttribute('src', 'vendor/frogger.mp3');
    theme.setAttribute('loop', 'true');
    theme.play();
  };

  Game.prototype.loadSprites = function () {
    this.sprites = new Image();
    this.sprites.src = "vendor/frogger_sprites.png";
    this.deadSprite = new Image();
    this.deadSprite.src = "vendor/dead_frog.png";
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.floatingObjects, this.vehicles, this.frog);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkFrogStatus();
    this.checkGameStatus();
  };

  Game.prototype.moveObjects = function (object) {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.checkFrogStatus = function () {
    if (this.frogOnLillypad()) {
      this.updateScore();
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    // draw river
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, this.dim_x, this.dim_y);
    // draw road
    ctx.fillStyle ="#000000";
    ctx.fillRect(0, this.dim_y / 2, this.dim_x, this.dim_y / 2);
    // upper sidewalk
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.dim_y / 2, this.dim_x, 55);
    // lower sidewalk
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.dim_y - 100, this.dim_x, 55);


    // draw grass
    ctx.drawImage(this.sprites, 0, 55, 399, 60, 0, 0, this.dim_x, 80);

    // this.allObjects().forEach(function (object) {
    //   object.draw(ctx);
    this.frog.draw(ctx);
    // });
  };

  Game.prototype.drawBG = function (ctx) {
    // draw river
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, this.dim_x, this.dim_y);
    // draw road
    ctx.fillStyle ="#000000";
    ctx.fillRect(0, this.dim_y / 2, this.dim_x, this.dim_y / 2);
    // upper sidewalk
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.dim_y / 2, this.dim_x, 55);
    // lower sidewalk
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.dim_y - 100, this.dim_x, 55);
    // draw grass
    ctx.drawImage(this.sprites, 0, 55, 399, 60, 0, 0, this.dim_x, 80);
  };
})();
