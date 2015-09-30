(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var View = Ribbit.View = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    Ribbit.Util.loadSprites();
  };

  View.MOVES = {
    "up":   [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  View.prototype.greeting = function (welcome) {
    this.bindKeyHandlers(welcome);
    var that = this;
    this.interval = setInterval(function () { welcome.draw(that.ctx); }, 60);
  };

  View.prototype.start = function (game) {
    clearInterval(this.interval);
    this.bindKeyHandlers();
    this.game = game;
    var that = this;

    this.interval = setInterval(function () {
      that.game.step();
      that.game.draw(that.ctx);
      that.checkGameStatus();
    }, 60);
  };

  View.prototype.checkGameStatus = function () {
    if (this.game.won[0]){
        this.closeGame(this.game.won[1]);
      } else if (this.game.lost[0]){
        this.closeGame(this.game.lost[1]);
      }
  };

  View.prototype.closeGame = function (selector) {
      $(".score-bar").removeClass("revealed").addClass("hidden");
      clearInterval(this.interval);
      $(selector).removeClass("hidden").addClass("revealed");
      this.greeting(new Ribbit.Welcome({}));
  };

  View.prototype.bindKeyHandlers = function (object) {
    var that = object || this.game;

    Object.keys(View.MOVES).forEach(function(k) {
      var dir = {};
      dir[k] =  View.MOVES[k];
      key(k, function(e) { that.frog.leap(dir); });
    });
  };
})();
