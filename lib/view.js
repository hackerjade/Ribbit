(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var View = Ribbit.View = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    Ribbit.Util.loadSprites();
    this.bindKeyHandlers();
  };

  View.MOVES = {
    "up":   [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  View.prototype.greeting = function (welcome) {
    var that = this;
    this.interval = setInterval(function () { welcome.draw(that.ctx); }, 60);
  };

  View.prototype.start = function (game) {
    clearInterval(this.interval);
    this.game = game;
    var that = this;

    this.interval = setInterval(function () {
      that.game.step();
      that.game.draw(that.ctx);
    }, 60);
  };

  View.prototype.bindKeyHandlers = function () {
    var game = this.game;

    Object.keys(View.MOVES).forEach(function(k) {
      var dir = {};
      dir[k] =  View.MOVES[k];
      key(k, function(e) { game.frog.leap(dir); });
    });
  };
})();
