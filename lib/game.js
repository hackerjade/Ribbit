(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Game = Ribbit.Game = function (options) {
    this.score = 0;
    this.lives = 3;
    this.vehicles = [];
    this.floatingObjects = [];
    this.loadSprites();
    // this.startMusic();
    this.dim_x = options.x;
    this.dim_y = options.y;

    this.frog = new Ribbit.Frog({
      game: this,
      dim_x: this.dim_x,
      dim_y: this.dim_y
    });
    this.buildRows();
    this.logs = this.makeLogs();
    this.addVehicles();
  };

  Game.STARTING_LOG = 10;
  Game.RIVER_COLOR = "#191970";
  Game.ROAD_COLOR = "#000000";
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
    {x: 200, y: 4, vel: -3, model: 3},
    {x: 600, y: 4, vel: -3, model: 3},
    {x: 1155, y: 4, vel: -3, model: 3},
    {x: 1155, y: 5, vel: 4,  model: 0},
    {x: 100,  y: 6, vel: 4,  model: 4},
    {x: 500, y: 6, vel: 4,  model: 4},
    {x: 900, y: 6, vel: 4, model: 1}
  ];

  Game.prototype.buildRows = function () {
    this.rows = [];
    for (var i = Game.STARTING_LOG; this.rows.length < 15; i+= 50) {
      this.rows.unshift(i);
    }
  };

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

  Game.prototype.addVehicles = function (row, x, model) {
    for (var i = 0; i < Game.VEHICLE_SETUP.length; i++) {
      var attr = Game.VEHICLE_SETUP[i];
      this.vehicles.push(new Ribbit.Vehicle({
        pos: [attr.x, this.rows[attr.y]],
        lane: attr.y,
        vel: attr.vel,
        model: attr.model,
        sprites: this.sprites
      }));
    }
  };

  Game.prototype.step = function () {
    this.vehicles.forEach(function(vehicle){
      vehicle.move();
        if (!this.onCanvas(vehicle)){
          vehicle.wrap(this.dim_x);
        }
      }.bind(this));
    // this.moveObjects();
    // this.checkFrogStatus();
    // this.checkGameStatus();
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
    this.drawBG(ctx);
    // this.allObjects().forEach(function (object) {
    //   object.draw(ctx);
    this.frog.draw(ctx);
    this.drawLogs(ctx, this.sprites);
    this.vehicles.forEach(function (vehicle) {
      vehicle.draw(ctx);
    });
    // });
  };

  Game.prototype.drawBG = function (ctx) {
    ctx.fillStyle = Game.RIVER_COLOR;
    ctx.fillRect(0, 0, this.dim_x, this.dim_y);
    ctx.fillStyle = Game.ROAD_COLOR;
    ctx.fillRect(0, this.dim_y / 2, this.dim_x, this.dim_y / 2);
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.rows[7], this.dim_x, 45);
    ctx.drawImage(this.sprites, 0, 119, 399, 34, 0, this.rows[0], this.dim_x, 45);
    ctx.drawImage(this.sprites, 0, 55, 399, 60, 0, 0, this.dim_x, 60);
  };

  Game.prototype.onCanvas = function(object){
    var left = object.pos[0];
    var right = object.pos[0] + object.dim_x;
    if ((left < 0 && right < 0) || left > this.dim_x + 1){
      return false;
    } else {
      return true;
    }
  };


  // **********************************************************************

  Game.prototype.makeLogs = function() {
    return [this.makeLog(8), this.makeLog(8, 170), this.makeLog(9), this.makeLog(9, 200), this.makeLog(10), this.makeLog(11), this.makeLog(12), this.makeLog(12, 100, 0), this.makeLog(13, 100, 0), this.makeLog(12)];
};

Game.prototype.makeLog = function(row, x, len) {
    switch(row) {
        case 8:
            return new Log(x==null?399:x, this.rows[row], row, 1, 1, len==null?1:len);
            break;
        case 9:
            return new Log(x==null?399:x, this.rows[row], row, 4, -1, len==null?2:len);
            break;
        case 10:
            return new Log(x==null?399:x, this.rows[row], row, 2, 1, len==null?0:len);
            break;
        case 11:
            return new Log(x==null?399:x, this.rows[row], row, 2, -1, len==null?1:len);
            break;
        case 12:
            return new Log(x==null?399:x, this.rows[row], row, 3, 1, len==null?1:len);
            break;
        case 13:
            return new Log(x==null?399:x, this.rows[row], row, 3, -1, len==null?2:len);
            break;
    }
}

var lengths = [{width: 179, height: 21}, {width: 118, height: 21}, {width: 85, height: 22}];

function Log (x, y, row, speed, dir, length) {
    this.posX = x;
    this.posY = y;
    this.row = row;
    this.speed = speed;
    this.dir = dir;
    this.length = length;
    this.width = lengths[length].width;
    this.height = lengths[length].height;
    console.log(this.posY);
    this.move = function() {
        this.posX = this.posX - (this.dir * this.speed);
    };
    this.draw = function (context, sprites) {
        switch(this.length) {
            case 0:
                context.drawImage(sprites, 6, 165, 179, 21, this.posX, this.posY, 179, 41);
                break;

            case 1:
                context.drawImage(sprites, 5, 197, 118, 21, this.posX, this.posY, 118, 41);
                break;

            case 2:
                context.drawImage(sprites, 6, 229, 85, 22, this.posX, this.posY, 85, 42);
                break;
        }
    };
    this.out_of_bounds = function() {
        return ((this.posX + this.width) < 0 || this.posX > 399);
    };
}

Game.prototype.drawLogs = function(ctx, sprites) {
    for (var i=0; i< this.logs.length; i++) {
        // this.logs[i].move();
        // if (this.logs[i].out_of_bounds()) {
        //     this.logs[i] = this.makeLogs(this.logs[i].row);
        // }
        this.logs[i].draw(ctx, sprites);
    }
};

})();
