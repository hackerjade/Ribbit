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
    this.drawScore();
    this.bindKeyHandlers();
    this.game = game;
    var that = this;

    this.interval = setInterval(function () {
      that.game.step();
      that.game.draw(that.ctx);
    }, 60);
  };

  View.prototype.drawScore = function () {
    var image = new Image();
    image.src = "https://fonts.googleapis.com/css?family=Press+Start+2P;"
    image.onerror = function() {
        ctx.font = '40px "Press Start 2P"';
        ctx.fillStyle = "rgb(0, 216, 0)";
        ctx.fillText("LIVES: ", 10, Ribbit.Game.ROW_HEIGHT - 50);
        ctx.fillText("SCORE: ", 900, Ribbit.Game.ROW_HEIGHT - 50);
    }.bind(this);
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
