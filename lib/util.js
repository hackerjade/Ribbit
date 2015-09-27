(function(){
  var Ribbit = window.Ribbit = window.Ribbit || {};

  var Util = Ribbit.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

})();
