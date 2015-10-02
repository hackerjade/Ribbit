(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Vehicle = Ribbit.Vehicle = function (options) {
    x = options.model;
    options.loc = Vehicle.SIZES[x];
    Ribbit.MovingObject.call(this, options);
  };

  Ribbit.Util.inherits(Ribbit.Vehicle, Ribbit.MovingObject);

  Vehicle.SIZES = [
    [8, 265, 30, 22, 35, 27],
    [45, 264, 29, 24, 34, 29],
    [81, 263, 24, 26, 29, 31],
    [9, 300, 24, 21, 30, 26],
    [105, 301, 46, 19, 51, 24]
  ];
})();
