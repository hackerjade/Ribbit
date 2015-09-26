(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var View = Ribbit.View = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;

  };

  View.MOVES = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  View.prototype.start = function () {
    var that = this;
    this.bindKeyHandlers();

    this.interval = setInterval(function () {
      // View.game.step();
      that.game.draw(that.ctx);
    }, 60);
  };

  View.prototype.bindKeyHandlers = function () {
    var game = this.game;

    Object.keys(View.MOVES).forEach(function(k) {
      var dir = View.MOVES[k];
      key(k, game.frog.leap(dir));
    });
  };
})();
