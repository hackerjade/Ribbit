(function() {
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Game = Ribbit.Game = function (options) {
    this.score = 0;
    this.lives = 5;
    this.level = 1;
    this.dim_x = Game.WIDTH;
    this.dim_y = Game.HEIGHT;
    this.vehicles = [];
    this.floatingObjects = [];
    this.setup();
    this.addObjects();
  };

  Game.FIRST_ROW = 10;
  Game.ROW_HEIGHT = 50;
  Game.WIDTH = 1155;
  Game.HEIGHT = 800;
  Game.VEHICLE_SETUP = [
    { row: 1, vel: -3, per_row: 4},
    { row: 2, vel: 2, per_row: 4 },
    { row: 3, vel: 4, per_row: 3 },
    { row: 4, vel: -5, per_row: 3 },
    { row: 5, vel: 4, per_row: 1 },
    { row: 6, vel: 4, per_row: 3 }
  ];

  Game.FLOATER_SETUP = [
    { row: 8, vel: 1, per_row: 3},
    { row: 9, vel: -4, per_row: 2 },
    { row: 10, vel: 2, per_row: 1 },
    { row: 11, vel: -2, per_row: 1 },
    { row: 12, vel: 3, per_row: 2 },
    { row: 13, vel: -3, per_row: 2 }
  ];

  Game.prototype.setup = function () {
    this.startMusic();
    this.buildRows();
  };


  Game.prototype.buildRows = function () {
    this.rows = [];
    for (var i = Game.FIRST_ROW; this.rows.length < 15; i+= Game.ROW_HEIGHT) {
      this.rows.unshift(i);
    }
  };

  Game.prototype.startMusic = function () {
    var theme = document.createElement('audio');
    theme.setAttribute('src', 'vendor/frogger.mp3');
    theme.setAttribute('loop', 'true');
    theme.play();
  };

  Game.prototype.addObjects = function () {
    this.addFrog();
    this.addObstacles();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.floatingObjects, this.vehicles);
  };

  Game.prototype.addFrog = function () {
    this.frog = new Ribbit.Frog({
      game: this,
      dim_x: Ribbit.Game.WIDTH / 2,
      dim_y: this.rows[0]
    });
  };

  Game.prototype.addObstacles = function () {
    var setup = {
      vehicles: { arr: Game.VEHICLE_SETUP, func: this.addVehicle.bind(this) },
      floaters: { arr: Game.FLOATER_SETUP, func: this.addFloater.bind(this) }
    };

    ['vehicles', 'floaters'].forEach(function(item, width) {
      var x = -25, row = 0, i = 0, object = setup[item];
      while (row < object.arr.length) {
        i++;
        var attrs = object.arr[row];
        object.func(x, attrs);
        if (i === attrs.per_row) { row++; i = 0; }
        x = this.calcSpacing(x, width, attrs);
        // debugger;
      }
    }.bind(this));
  };

  Game.prototype.addFloater = function (x, attrs) {
      // var length = Math.floor(Math.random() * (3 - 0));
      var length = attrs.row % 3;
      this.floatingObjects.push(new Ribbit.FloatingObject({
        pos: [x, this.rows[attrs.row]],
        vel: attrs.vel,
        length: length,
        row: attrs.row,
        level: this.level
      }));
  };
  Game.prototype.addVehicle = function (x, attrs) {
      this.vehicles.push(new Ribbit.Vehicle({
        pos: [x, this.rows[attrs.row]],
        vel: attrs.vel,
        model: (attrs.row === 6) ? 4 : this.pickRandomCar(attrs),
        row: attrs.row,
        level: this.level
      }));
  };

  Game.prototype.calcSpacing = function (x, width, attrs) {
    return (x + 250 * (width + 1) + (Math.abs(attrs.vel) * 10)) % Game.WIDTH;
  };

  Game.prototype.pickRandomCar = function (attrs) {
      return Math.floor(Math.random() * 4);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.frogOnFloatingObject();
    // this.checkFrogStatus();
    // this.checkGameStatus();
  };

  Game.prototype.moveObjects = function (object) {
    this.allObjects().forEach(function (object) {
      object.move();
      if (!object.onCanvas(object)) { object.wrap(this.dim_x); }
    }.bind(this));
  };

  Game.prototype.checkFrogStatus = function () {
    if (this.frogOnLillypad()) {
      this.updateScore();
    }
    this.frogInRiver();
  };

  Game.prototype.frogInRiver = function(){
    return this.frog.pos[1] < this.rows[7];
  };

  Game.prototype.frogDrowned = function(){
    return this.frogInRiver() && !this.frogOnFloatingObject();
  };

  Game.prototype.frogOnFloatingObject = function(){
    var frogCenter = this.frog.pos[1];
    var frogLeft = this.frog.pos[0];
    var frogRight = this.frog.pos[0] + this.frog.width;
    var floating = false;
    this.floatingObjects.forEach(function(floatingObject){
      if (frogLeft > floatingObject.pos[0] && frogRight < floatingObject.pos[0] + floatingObject.dim_x){
        if (this.frog.row === floatingObject.row){
          this.frog.vel[0] = floatingObject.vel;
          floating = true;
        }
      }
    }.bind(this));
    return floating;
  };

// Game.prototype.frogCrushed = function(){
//   return this.frog.pos[1] < 60 && !this.frogOnLilypad();
// };
//
// Game.prototype.frogSmooshed = function(){
//   var frogCenter = this.frog.pos;
//   var frogLeft = this.frog.pos[0] - this.frog.radius / 2;
//   var frogRight = this.frog.pos[0] + this.frog.radius / 2;
//   var smooshed = false;
//   this.vehicles.forEach(function(vehicle){
//     if ((frogRight >= vehicle.pos[0] &&  frogRight <= vehicle.pos[0] + vehicle.dim_x) ||
//         (frogLeft >= vehicle.pos[0] &&  frogLeft <= vehicle.pos[0] + vehicle.dim_x)){
//       if (frogCenter[1] > vehicle.pos[1] && frogCenter[1] < vehicle.pos[1] + vehicle.dim_y){
//         this.frog.vel = vehicle.vel
//         smooshed = true;
//       }
//     }
//   }.bind(this))
//   return smooshed;
// }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    this.drawBG(ctx);
    this.allObjects().forEach(function (object) { object.draw(ctx); });
    this.frog.draw(ctx);
  };

  Game.prototype.drawBG = function (ctx) {
    var x = this.dim_x, y = this.dim_y;
    ctx.fillStyle = Ribbit.Util.RIVER_COLOR;
    ctx.fillRect(0, 0, x, y);
    ctx.fillStyle = Ribbit.Util.ROAD_COLOR;
    ctx.fillRect(0, (y / 2), x, (y / 2));
    ctx.drawImage(Ribbit.Util.sprites, 0, 55, 399, 60, 0, 0, x, 60);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[7], x, 45);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[0], x, 45);
    this.drawScore(ctx);
  };

  Game.prototype.drawScore = function (ctx) {
    var x = 250;
    var y = this.rows[0] + 53;
    for (var i = 0; i < this.lives; i++){
        ctx.drawImage(Ribbit.Util.sprites, 13, 334, 17, 23, x, y, 26, 31);
        x += 33;
    }
  };
})();
