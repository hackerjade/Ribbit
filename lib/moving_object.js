(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var MovingObject = Ribbit.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
    this.loc = options.loc;
    this.sprites = options.sprites;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.sprites,
      this.loc[0],
      this.loc[1],
      this.loc[2],
      this.loc[3],
      this.pos[0],
      this.pos[1],
      this.loc[4],
      this.loc[5]
    );
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel;
  };

  MovingObject.prototype.wrap = function(canvas_x){
    this.pos[0] = this.vel > 0 ? 0 - this.dim_x : canvas_x;
  };
})();
