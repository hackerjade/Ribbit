(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Frog = Ribbit.Frog = function (options) {
    this.game = options.game;
    this.vel = options.vel || [0, 0];
    this.radius = options.radius || 10;
    this.pos = [options.dim_x / 2, options.dim_y - 15];
    this.color = Frog.COLOR;
    this.previousDirection = [0, -1];
  };

  Frog.COLOR = "green";

  Frog.prototype.leap = function (direction) {
    this.pos[0] += direction[0] * this.game.lane_y;
    this.pos[1] += direction[1] * this.game.lane_y;
    this.previousDirection = direction;
  };

  Frog.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
  };
})();
