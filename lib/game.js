(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Game = Ribbit.Game = function (options) {
    this.score = 0;
    this.lives = 5;
    this.level = 1;
    this.dim_x = Game.WIDTH;
    this.dim_y = Game.HEIGHT;

    this.vehicles = [];
    this.floatingObjects = [];
    this.setup();
    this.addObjects();
  };

  Game.FIRST_ROW = 10;
  Game.ROW_HEIGHT = 50;
  Game.WIDTH = 1155;
  Game.HEIGHT = 800;
  Game.VEHICLE_SETUP = [
    {x: -25, y: 1, vel: -3, model: 1},
    {x: 200, y: 1, vel: -3, model: 3},
    {x: 500, y: 1, vel: -3, model: 1},
    {x: 800, y: 1, vel: -3, model: 3},
    {x: 1155, y: 1, vel: -3, model: 3},
    {x: 100, y: 2, vel: 2,  model: 0},
    {x: 400, y: 2, vel: 2,  model: 4},
    {x: 700, y: 2, vel: 2,  model: 0},
    {x: 1000, y: 2, vel: 2,  model: 0},
    {x: 150, y: 3, vel: 4,  model: 2},
    {x: 650, y: 3, vel: 4,  model: 0},
    {x: 955, y: 3, vel: 4,  model: 2},
    {x: 200, y: 4, vel: -5, model: 3},
    {x: 600, y: 4, vel: -5, model: 3},
    {x: 1155, y: 4, vel: -5, model: 3},
    {x: 1155, y: 5, vel: 4,  model: 0},
    {x: 100,  y: 6, vel: 4,  model: 4},
    {x: 500, y: 6, vel: 4,  model: 4},
    {x: 900, y: 6, vel: 4, model: 1}
  ];

  Game.FLOATER_SETUP = [
    {x: 399, y: 8, vel: 1, length: 1},
    {x: 170, y: 8, vel: 1, length: 1},
    {x: -25, y: 9, vel: -4, length: 2},
    {x: 200, y: 9, vel: -4, length: 2},
    {x: -25, y: 10, vel: 2, length: 0},
    {x: -25, y: 11, vel: -2, length: 1},
    {x: -25, y: 12, vel: 3, length: 1},
    {x: 100, y: 12, vel: 3, length: 0},
    {x: 100, y: 13, vel: -3, length: 2},
    {x: -25, y: 13, vel: -3, length: 1}
  ];

  Game.prototype.setup = function () {
    // this.startMusic();
    this.buildRows();
  };


  Game.prototype.buildRows = function () {
    this.rows = [];
    for (var i = Game.FIRST_ROW; this.rows.length < 15; i+= Game.ROW_HEIGHT) {
      this.rows.unshift(i);
    }
  };

  Game.prototype.startMusic = function () {
    var theme = document.createElement('audio');
    theme.setAttribute('src', 'vendor/frogger.mp3');
    theme.setAttribute('loop', 'true');
    theme.play();
  };

  Game.prototype.addObjects = function () {
    this.addFrog();
    this.addVehicles();
    this.addFloatingObjects();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.floatingObjects, this.vehicles);
  };

  Game.prototype.addFrog = function () {
    this.frog = new Ribbit.Frog({
      game: this,
      dim_y: this.rows[0]
    });
  };

  Game.prototype.addVehicles = function () {
    for (var i = 0; i < Game.VEHICLE_SETUP.length; i++) {
      var attr = Game.VEHICLE_SETUP[i];
      this.vehicles.push(new Ribbit.Vehicle({
        pos: [attr.x, this.rows[attr.y]],
        lane: attr.y,
        vel: attr.vel,
        model: attr.model,
        level: this.level
      }));
    }
  };

  Game.prototype.addFloatingObjects = function () {
    for (var i = 0; i < Game.FLOATER_SETUP.length; i++) {
      var attr = Game.FLOATER_SETUP[i];
      this.floatingObjects.push(new Ribbit.FloatingObject({
        pos: [attr.x, this.rows[attr.y]],
        lane: attr.y,
        vel: attr.vel,
        length: attr.length,
        level: this.level
      }));
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    // this.checkFrogStatus();
    // this.checkGameStatus();
  };

  Game.prototype.moveObjects = function (object) {
    this.allObjects().forEach(function (object) {
      object.move();
      if (!object.onCanvas(object)) { object.wrap(this.dim_x); }
    }.bind(this));
  };

  Game.prototype.checkFrogStatus = function () {
    if (this.frogOnLillypad()) {
      this.updateScore();
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    this.drawBG(ctx);
    this.allObjects().forEach(function (object) { object.draw(ctx); });
    this.frog.draw(ctx);
  };

  Game.prototype.drawBG = function (ctx) {
    var x = this.dim_x, y = this.dim_y;
    ctx.fillStyle = Ribbit.Util.RIVER_COLOR;
    ctx.fillRect(0, 0, x, y);
    ctx.fillStyle = Ribbit.Util.ROAD_COLOR;
    ctx.fillRect(0, (y / 2), x, (y / 2));
    ctx.drawImage(Ribbit.Util.sprites, 0, 55, 399, 60, 0, 0, x, 60);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[7], x, 45);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[0], x, 45);
    this.drawScore(ctx);
  };

  Game.prototype.drawScore = function (ctx) {
    var x = 10;
    var y = this.rows[0] + 50;
    for (var i = 0; i < this.lives; i++){
        ctx.drawImage(Ribbit.Util.sprites, 13, 334, 17, 23, x, y, 21, 25);
        x += 24;
    }
  };
})();
