var Ribbit = window.Ribbit = window.Ribbit || {};

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = 1155;//Ribbit.Game.WIDTH;
canvasEl.height = 800;//Ribbit.Game.HEIGHT;

var ctx = canvasEl.getContext("2d");
var welcome = new Ribbit.Welcome({
   x: canvasEl.width,
   y: canvasEl.height
});

var game = new Ribbit.Game(), view = new Ribbit.View(game, ctx);
view.greeting(welcome);

// $(".start-button").click(function () {
  // turn this into a js file
  var hidden_messages = ".welcome, .game-over, .game-won, .welcome-canvas";
  $(hidden_messages).removeClass("revealed").addClass("hidden");
  view.start(game);
// })
