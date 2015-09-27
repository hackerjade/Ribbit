(function(){
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Util = Ribbit.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.RIVER_COLOR = "#191970";
  Util.ROAD_COLOR = "#000000";

  Util.loadSprites = function() {
    this.sprites = new Image();
    this.sprites.src = "vendor/frogger_sprites.png";
    this.deadSprite = new Image();
    this.deadSprite.src = "vendor/dead_frog.png";
  };
})();
