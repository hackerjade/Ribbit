(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Frog = Ribbit.Frog = function (options) {
    this.game = options.game;
    this.vel = options.vel || [0, 0];
    this.pos = [options.dim_x / 2, options.dim_y + 5];
    this.previousDirection = [0, -1];
    this.facing = Frog.DIRECTIONS.up;
  };

  Frog.HOP_DISTANCE = 45;
  Frog.DIRECTIONS = {
    up:   [12, 369, 23, 17, 43, 37],
    down: [80, 369, 23, 17, 43, 37],
    left: [80, 335, 19, 23, 39, 43],
    right:[12, 335, 19, 23, 39, 43]
  };

  Frog.prototype.leap = function (dir) {
    var pos = Object.keys(dir), direction = dir[pos];
    this.facing = Frog.DIRECTIONS[pos];
    this.pos[0] += direction[0] * Frog.HOP_DISTANCE;
    this.pos[1] += direction[1] * Frog.HOP_DISTANCE;
    this.previousDirection = direction;
  };

  Frog.prototype.draw = function (ctx) {
    var x = this.facing;
    ctx.drawImage(
      Ribbit.Util.sprites,
      x[0],
      x[1],
      x[2],
      x[3],
      this.pos[0],
      this.pos[1],
      x[4],
      x[5]
    );
  };
})();
