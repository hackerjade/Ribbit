(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Frog = Ribbit.Frog = function (options) {
    this.game = options.game;
    this.vel = options.vel || [0, 0];
    this.pos = [options.dim_x / 2, options.dim_y + 5];
    this.previousDirection = [0, -1];
    this.facing = "up";
  };

  Frog.HOP_DISTANCE = Ribbit.Game.ROW_HEIGHT;
  Frog.DIRECTIONS = {
    up:   [12, 369, 23, 17, 43, 37],
    down: [80, 369, 23, 17, 43, 37],
    left: [80, 335, 19, 23, 39, 43],
    right:[12, 335, 19, 23, 39, 43]
  };

  Frog.prototype.leap = function (dir, restrict) {
    var pos = Object.keys(dir), direction = dir[pos];
    this.facing = pos;
    if (this.outOfBounds() || this.restricted(restrict)) { return; }
    this.pos[0] = this.pos[0] + direction[0] * Frog.HOP_DISTANCE;
    this.pos[1] = this.pos[1] + direction[1] * Frog.HOP_DISTANCE;
    this.previousDirection = direction;
  };

  Frog.prototype.outOfBounds = function () {
    var next = this.nextLocation(), edge = Ribbit.Game.WIDTH, pos = this.facing;
    return (next[0] < 0 && pos == "left") || (next[1] > edge && pos == "right");
  };

  Frog.prototype.nextLocation = function () {
    var hop = Frog.HOP_DISTANCE * 2;
    return [this.pos[0], this.pos[0] + hop];
  };

  Frog.prototype.restricted = function (restrict) {
    return restrict && (this.pos == "up" || this.pos == "down");
  };

  Frog.prototype.draw = function (ctx, bigger) {
    var delta = bigger || 0;
    var x = Frog.DIRECTIONS[this.facing];
    ctx.drawImage(
      Ribbit.Util.sprites,
      x[0],
      x[1],
      x[2],
      x[3],
      this.pos[0] + delta,
      this.pos[1],
      x[4] + delta,
      x[5] + delta
    );
  };
})();
