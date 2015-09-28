(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Vehicle = Ribbit.Vehicle = function (options) {
    x = options.model;
    options.loc = Vehicle.SIZES[x];
    Ribbit.MovingObject.call(this, options);
  };

  Ribbit.Util.inherits(Ribbit.Vehicle, Ribbit.MovingObject);

  Vehicle.SIZES = [
    [8, 265, 30, 22, 50, 42],
    [45, 264, 29, 24, 49, 44],
    [81, 263, 24, 26, 44, 46],
    [9, 300, 24, 21, 44, 41],
    [105, 301, 46, 19, 66, 39]
  ];
})();
