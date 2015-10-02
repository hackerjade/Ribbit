(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var FloatingObject = Ribbit.FloatingObject = function (options) {
      var x = options.length;
      options.loc = FloatingObject.LENGTHS[x];
      Ribbit.MovingObject.call(this, options);
  };

  Ribbit.Util.inherits(Ribbit.FloatingObject, Ribbit.MovingObject);

  FloatingObject.LENGTHS = [
    [6, 165, 179, 21, 300, 31],
    [5, 197, 118, 21, 240, 31],
    [6, 229, 85, 22, 210, 32]
  ];
})();
