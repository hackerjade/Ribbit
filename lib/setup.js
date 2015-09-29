var Ribbit = window.Ribbit = window.Ribbit || {};

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Ribbit.Game.WIDTH;
canvasEl.height = Ribbit.Game.HEIGHT;

var ctx = canvasEl.getContext("2d");
var welcome = new Ribbit.Welcome({
   x: canvasEl.width,
   y: canvasEl.height
});

var game = new Ribbit.Game(), view = new Ribbit.View(game, ctx);
view.greeting(welcome);

// $(".start-button").click(function () {
  var hidden_messages = ".welcome, .game-over, .game-won, .welcome-canvas";
  $(hidden_messages).removeClass("revealed").addClass("hidden");
  view.start(game);
// });
