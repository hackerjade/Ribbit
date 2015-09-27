(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var FloatingObject = Ribbit.FloatingObject = function (options) {
      var x = options.length;
      options.loc = FloatingObject.LENGTHS[x];
      Ribbit.MovingObject.call(this, options);
  };

  Ribbit.Util.inherits(Ribbit.FloatingObject, Ribbit.MovingObject);

  FloatingObject.LENGTHS = [
    { width: 179, height: 21, loc: [6, 165, 179, 21, 179, 41] },
    { width: 118, height: 21, loc: [5, 197, 118, 21, 118, 41] },
    { width: 85, height: 22, loc: [6, 229, 85, 22, 85, 42] }
  ];
})();
