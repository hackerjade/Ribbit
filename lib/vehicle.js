(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Vehicle = Ribbit.Vehicle = function (options) {
    this.lane = options.lane;
    this.model = options.model;
    // this.pos = options.pos;
    // this.vel = options.vel;
    options.vel = options.vel
    options.loc = Vehicle.ATTRIBUTES[this.model].loc;
    options.dim_x = Vehicle.ATTRIBUTES[this.model].width;
    options.dim_y = Vehicle.ATTRIBUTES[this.model].height;
    Ribbit.MovingObject.call(this, options);
  };

  Ribbit.Util.inherits(Ribbit.Vehicle, Ribbit.MovingObject);

  Vehicle.ATTRIBUTES = [
    { width: 30, height: 22, dir: 1,  loc: [8, 265, 30, 22, 50, 42] },
    { width: 29, height: 24, dir: -1, loc: [45, 264, 29, 24, 49, 44] },
    { width: 24, height: 26, dir: 1,  loc: [81, 263, 24, 26, 44, 46] },
    { width: 24, height: 21, dir: -1, loc: [9, 300, 24, 21, 44, 41] },
    { width: 46, height: 19, dir: 1,  loc: [105, 301, 46, 19, 66, 39] }
  ];
})();
