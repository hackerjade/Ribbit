(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Frog = Ribbit.Frog = function (options) {
    options.row = 0;
    options.vel = options.vel || 0;
    Ribbit.MovingObject.call(this, options);
    this.game = options.game;
    this.facing = "up";
    this.positionFrog();
    this.dead = false;
    this.safe = false;
  };

  Ribbit.Util.inherits(Ribbit.Frog, Ribbit.MovingObject);

  Frog.HOP_DISTANCE = Ribbit.Game.ROW_HEIGHT;
  Frog.DIRECTIONS = {
    up:   [12, 369, 23, 17, 43, 37],
    down: [80, 369, 23, 17, 43, 37],
    left: [80, 335, 19, 23, 39, 43],
    right:[12, 335, 19, 23, 39, 43]
  };

  Frog.prototype.positionFrog = function () {
    this.width = Frog.DIRECTIONS[this.facing][4] + this.delta;
    this.pos = [this.dim_x - this.width, this.dim_y];
  };

  Frog.prototype.leap = function (dir) {
    var pos = Object.keys(dir), direction = dir[pos];
    this.facing = pos;
    if (this.dead || this.restricted()) { return; }
    this.pos.forEach(function(el, x) {
      this.pos[x] += direction[x] * Frog.HOP_DISTANCE;
    }.bind(this));
    this.CheckBounds(direction);
  };

  Frog.prototype.CheckBounds = function (direction) {
    if (this.row - direction[1] > 0) { this.row -= direction[1]; }
    var left = 0 - this.delta, right = Ribbit.Game.WIDTH - (left + this.width);
    var pos = this.facing;

    if (this.pos[0] < left && pos == "left") { this.pos[0] = left; }
    if (this.pos[0] > right && pos == "right") { this.pos[0] = right - this.delta; }
    if (this.pos[1] > 710 && pos == "down") {this.pos[1] = 710; }
  };

  Frog.prototype.restricted = function () {
    return (this.delta > 0 && (this.facing == "up" || this.facing == "down")) ||
      this.pos[1] > 730;
  };

  Frog.prototype.draw = function (ctx) {
    if (this.drawSkull()) { return; }
    this.loc = Frog.DIRECTIONS[this.facing];
    Ribbit.MovingObject.prototype.draw.call(this, ctx);
  };

  Frog.prototype.drawSkull = function () {
    if (this.dead) {
      var x = this.pos[0], y = this.pos[1];
      ctx.drawImage(Ribbit.Util.deadSprite, 4, 2, 19, 24, x, y, 39, 44);
      return true;
    }
    return false;
  };

  // Frog.prototype.drawHappy = function () {
  //   if (this.safe) {
  //     var x = this.pos[0], y = this.pos[1];
  //     ctx.drawImage(Ribbit.Util.happySprite, 0, 0, 32, 32, x, y, 37, 37);
  //     return true;
  //   }
  //   return false;
  // };

  Frog.prototype.onALog = function (log) {
    var frogLeft = this.pos[0], frogRight = frogLeft + this.width;
    var logLeft = log.pos[0], logRight = logLeft + log.dim_x;

    if (frogLeft > logLeft && frogRight < logRight && this.row === log.row) {
      return (this.vel = log.vel);
    }
  };

  Frog.prototype.hitByCar = function (car) {
    if (this.row !== car.row) { return; }
    var frogLeft = this.pos[0], frogRight = frogLeft + this.width;
    return this.touchingCar(frogLeft, car) || this.touchingCar(frogLeft, car);
  };

  Frog.prototype.touchingCar = function (frogSide, car) {
    var carLeft = car.pos[0], carRight = carLeft + car.dim_x;
    return frogSide >= carLeft && frogSide <= carRight;
  };
})();
