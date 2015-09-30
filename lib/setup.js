var Ribbit = window.Ribbit = window.Ribbit || {};

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Ribbit.Game.WIDTH;
canvasEl.height = Ribbit.Game.HEIGHT;

var ctx = canvasEl.getContext("2d");
var welcome = new Ribbit.Welcome({
   x: canvasEl.width,
   y: canvasEl.height
});

  view = new Ribbit.View(ctx);
  view.greeting(welcome);

$(".start-button").click(function () {
  var game = new Ribbit.Game();
  var hidden_messages = ".welcome, .game-over, .game-won";
  $(hidden_messages).removeClass("revealed").addClass("hidden");
  $('.score-bar').removeClass("hidden").addClass("revealed");
  view.start(game);
});
