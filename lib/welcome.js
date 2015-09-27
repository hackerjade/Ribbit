(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Welcome = Ribbit.Welcome = function (options) {
    this.dim_x = options.x;
    this.dim_y = options.y;
    this.addFrog();
  };

  Welcome.prototype.draw = function (ctx) {
    var x = this.dim_x, y = this.dim_y;
    ctx.fillStyle = Ribbit.Util.ROAD_COLOR;
    ctx.fillRect(0, 0, x, y);
    ctx.fillRect(0, (y / 2), x, (y / 2));
    ctx.drawImage(Ribbit.Util.sprites, 0, 55, 399, 60, 0, 0, x, 80);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, 720, x, 80);
    this.frog.draw(ctx, 20);
  };

  Welcome.prototype.addFrog = function () {
      this.frog = new Ribbit.Frog({
      game: this,
      dim_x: this.dim_x,
      dim_y: this.dim_y - 70
    });
  };
})();
