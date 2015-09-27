(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Vehicle = Ribbit.Vehicle = function (options) {
    this.model = options.model;
    this.pos = options.pos;
    this.lane = options.lane;
    this.vel = options.vel;
    this.dim_x = Vehicle.ATTRIBUTES[this.model].width;
    this.dim_y = Vehicle.ATTRIBUTES[this.model].height;
  };

  Vehicle.ATTRIBUTES = [
    { width: 30, height: 22, dir: 1,  loc: [8, 265, 30, 22, 30, 22] },
    { width: 29, height: 24, dir: -1, loc: [45, 264, 29, 24, 29, 24] },
    { width: 24, height: 26, dir: 1,  loc: [81, 263, 24, 26, 24, 26] },
    { width: 24, height: 21, dir: -1, loc: [9, 300, 24, 21, 24, 21] },
    { width: 46, height: 19, dir: 1,  loc: [105, 301, 46, 19, 46, 19] }
  ];

  Vehicle.prototype.draw = function (ctx) {
    var loc = Vehicle.ATTRIBUTES[this.model];
    context.drawImage(sprites,
      loc[0],
      loc[1],
      loc[2],
      loc[3],
      this.pos[0],
      this.pos[1],
      loc[4],
      loc[5]
    );
  };

  Vehicle.prototype.

})();
