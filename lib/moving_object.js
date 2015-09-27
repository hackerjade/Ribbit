(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var MovingObject = Ribbit.MovingObject = function (options) {
    // this.model = options.model;
    this.pos = options.pos;
    // this.lane = options.lane;
    this.vel = options.vel;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
    this.loc = options.loc;
  };

  MovingObject.prototype.draw = function (ctx) {
    context.drawImage(sprites,
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
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.wrap = function(canvas_x){
    if (this.vel[0] > 0){
      var x = 0 - this.dim_x;

    } else {
      var x = canvas_x;
    }
    var y = this.pos[1];
    this.pos = [x,y];
  };

})();
