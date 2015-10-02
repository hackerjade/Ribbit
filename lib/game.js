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
    this.buildRows();
    this.addObjects();
    this.won = [false, '.game-won'];
    this.lost = [false, '.game-over'];
    this.lilies = [0, 1, 2, 3, 4];
    this.safeFrogs = [];
  };

  Game.HEIGHT = 533;
  Game.WIDTH = 770;
  Game.FIRST_ROW = Game.HEIGHT / 80;
  Game.ROW_HEIGHT = Game.HEIGHT / 16;
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

  Game.prototype.buildRows = function () {
    this.rows = [];
    for (var i = Game.FIRST_ROW; this.rows.length < 15; i+= Game.ROW_HEIGHT) {
      this.rows.unshift(i);
    }

    var firstLily = Game.WIDTH / 14.4;
    Game.LILIES = [];
    for (var j = firstLily; Game.LILIES.length < 5; j += (Game.WIDTH / 4.71)) {
      Game.LILIES.push(j);
    }
  };

  Game.prototype.addObjects = function () {
    this.addFrog();
    this.addObstacles();
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.floatingObjects, this.vehicles, this.frog);
  };

  Game.prototype.addFrog = function () {
    this.frog = new Ribbit.Frog({
      game: this,
      dim_x: Ribbit.Game.WIDTH / 2 + 10,
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
      }
    }.bind(this));
  };

  Game.prototype.addFloater = function (x, attrs) {
      var length = attrs.row % 3;
      this.floatingObjects.push(new Ribbit.FloatingObject({
        pos: [x, this.rows[attrs.row]],
        vel: attrs.vel,
        length: length,
        row: attrs.row,
        game: this
      }));
  };
  Game.prototype.addVehicle = function (x, attrs) {
      this.vehicles.push(new Ribbit.Vehicle({
        pos: [x, this.rows[attrs.row]],
        vel: attrs.vel,
        model: (attrs.row === 6) ? 4 : this.pickRandomCar(attrs),
        row: attrs.row,
        game: this
      }));
  };

  Game.prototype.calcSpacing = function (x, width, attrs) {
    return (x + (Game.WIDTH / 4.62) * (width + 1) + (Math.abs(attrs.vel) * 10)) % Game.WIDTH;
  };

  Game.prototype.pickRandomCar = function (attrs) {
      return Math.floor(Math.random() * 4);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkFrogStatus();
    this.checkGameStatus();
  };

  Game.prototype.moveObjects = function (object) {
    this.allObjects().forEach(function (object) {
      object.move();
      if (!object.onCanvas(object)) { object.wrap(this.dim_x); }
    }.bind(this));
  };

  Game.prototype.checkFrogStatus = function () {
    if (this.frogDrowned() || this.frogDownRiver() || this.frogSplat()) {
      this.loseLife();
    }

    if (!this.frogOnFloatingObject()) { this.frog.vel = 0; }
  };

  Game.prototype.frogOnLilypad = function () {
    if (this.onLily) { return true; }
    return this.lilies.some(function(idx) {
      return this.frogOnLily(idx);
    }.bind(this));
  };

  Game.prototype.frogOnLily = function (idx) {
    this.onLily = false;
    var left = this.frog.pos[0], right = this.frog.pos[1];
    var lily = Game.LILIES[idx];
    var lilyLeft = lily - 50, lilyRight = lily + 50;
    if (left > lilyLeft && left < lilyRight && right < this.rows[13]) {
      this.onLily = true;
      this.lilies.splice(idx, 1);
      this.safeFrogs.push(idx);
      this.onLily = false;
      this.updateScore();
      setTimeout(function () { this.onLily = false; }.bind(this), 60);
      return true;
    }
  };

  Game.prototype.updateScore = function () {
    this.score += 1;
    this.level += 1;
    $("#score").html(this.score);
    this.addFrog();
  };

  Game.prototype.checkGameStatus = function () {
    if (this.safeFrogs.length === 5) { this.won[0] = true; }
    if (this.lives === 0) { this.lost[0] = true;}
  };

  Game.prototype.frogDrowned = function(){
    return this.frogInRiver() && !this.frogOnFloatingObject() &&
    !this.frogOnLilypad();
  };

  Game.prototype.frogInRiver = function(){
    return this.frog.pos[1] < this.rows[7];
  };

  Game.prototype.frogOnFloatingObject = function(){
    return this.floatingObjects.some(function(floater){
      return this.frog.onALog(floater);
    }.bind(this));
  };

  Game.prototype.frogSplat = function(){
    return this.vehicles.some(function(vehicle){
        return this.frog.hitByCar(vehicle);
      }.bind(this));
  };

  Game.prototype.frogDownRiver = function () {
    return this.frog.pos[0] < 0 || this.frog.pos[0] > this.dim_x;
  };

  Game.prototype.loseLife = function () {
    if (this.frog.dead) { return; }
    this.killFrog();
    this.lives -= 1;
  };

  Game.prototype.killFrog = function () {
    this.frog.dead = true;
    setTimeout(function(){ this.addFrog(); }.bind(this), 1000);
  };

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
    ctx.drawImage(Ribbit.Util.sprites, 0, 55, 399, 60, 0, 0, x, 50);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[7], x, 35);
    ctx.drawImage(Ribbit.Util.sprites, 0, 119, 399, 34, 0, this.rows[0], x, 35);
    this.drawLilies(ctx);
    this.drawSafeFrogs(ctx);
    this.drawScore(ctx);
  };

  Game.prototype.drawSafeFrogs = function (ctx) {
    this.safeFrogs.forEach(function(idx) {
      var x = Game.LILIES[idx] - 15;
      ctx.drawImage(Ribbit.Util.happySprite, 0, 0, 32, 32, x, 15, 27, 27);
    });
  };

  Game.prototype.drawLilies = function (ctx) {
    this.lilies.forEach(function (i) {
      var x = Game.LILIES[i];
      [[0.75, 1.95], [1.25, 0.45]].forEach(function(el) {
        ctx.beginPath();
        ctx.arc(x, 30, 13, el[0] * Math.PI, el[1] * Math.PI, false);
        ctx.fillStyle = "rgb(0, 216, 0)";
        ctx.fill();
      });
    });
  };

  Game.prototype.drawScore = function (ctx) {
    var x = Game.WIDTH / 4.62, y = this.rows[0] + (Game.ROW_HEIGHT);
    for (var i = 0; i < this.lives; i++){
        ctx.drawImage(Ribbit.Util.sprites, 13, 334, 17, 23, x, y, 21, 26);
        x += 26;
    }
  };
})();
