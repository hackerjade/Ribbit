(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Frog = Ribbit.Frog = function (options) {
    options.row = 0;
    options.vel = options.vel || 0;
    Ribbit.MovingObject.call(this, options);
    this.game = options.game;
    this.facing = "up";
    this.delta = options.delta || 0;
    this.positionFrog();
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
    this.previousDirection = [0, -1];
  };

  Frog.prototype.leap = function (dir) {
    var pos = Object.keys(dir), direction = dir[pos];
    this.facing = pos;
    if (this.restricted() || this.pos[1] > 730) { return; }
    this.pos[0] += direction[0] * Frog.HOP_DISTANCE;
    this.pos[1] += direction[1] * Frog.HOP_DISTANCE;
    if (this.row - direction[1] > 0) { this.row -= direction[1]; }
    this.CheckBounds();
    this.previousDirection = direction;
  };

  Frog.prototype.CheckBounds = function () {
    var pos = this.facing;
    var left = 0 - this.delta;
    var right = Ribbit.Game.WIDTH - (this.width + this.delta);

    if (this.pos[0] < left && pos == "left") { this.pos[0] = left; }
    if (this.pos[0] > right && pos == "right") { this.pos[0] = right; }
    if (this.pos[1] > 710 && pos == "down") {this.pos[1] = 710; }
  };

  Frog.prototype.restricted = function () {
    return this.delta > 0 && (this.facing == "up" || this.facing == "down");
  };

  Frog.prototype.draw = function (ctx) {
    var x = Frog.DIRECTIONS[this.facing];
    ctx.drawImage(
      Ribbit.Util.sprites,
      x[0],
      x[1],
      x[2],
      x[3],
      this.pos[0] + this.delta,
      this.pos[1],
      x[4] + this.delta,
      x[5] + this.delta
    );
  };
})();
