(function () {

  var Windmill = function (el) {
    var self = this;
    this.el = el;

    this.size = el.clientHeight < el.clientWidth ? el.clientHeight : el.clientWidth;
    this.size = this.size || 400;

    this.angle = 0;
    this.velocity = 0;
    this.acceleration = 0;

    this.velocityMax = 0.2;
    this.accelerationMax = 0.0003;

    this.friction = 0.998;


    // Init
    this.setup();


    // Define main loop
    loop = function loop(timestamp) {
      window.requestAnimationFrame(loop);

      self.update(timestamp);
      self.draw();
    };

    // Start main loop
    window.requestAnimationFrame(loop);

  };



  Windmill.debugView = false;



  Windmill.prototype.setup = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.el.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');
  }



  Windmill.prototype.update = function (timestamp) {
    this.acceleration += Math.random() * 0.00004 - 0.00002;
    this.acceleration = Math.min(Math.max(this.acceleration, 0), this.accelerationMax);

    this.velocity += this.acceleration;
    this.velocity *= this.friction;
    this.velocity = Math.min(Math.max(this.velocity, 0), this.velocityMax);

    this.angle += this.velocity;
  };



  Windmill.prototype.draw = function () {
    var center = this.size/2;

    this.context.clearRect(0, 0, this.size, this.size);


    this.context.fillStyle = '#444';
    this.context.beginPath();
    this.context.ellipse(center, center, this.size*0.4, this.size*0.1, this.angle, 0, Math.PI*2);
    this.context.ellipse(center, center, this.size*0.4, this.size*0.1, this.angle + Math.PI/2, 0, Math.PI*2);

    this.context.fill();


    // Debug view
    if (Windmill.debugView) {

      // Acceleration
      var windForce = this.acceleration * this.size / this.accelerationMax;

      this.context.fillStyle = 'rgba(0,0,0,0.1)';
      this.context.fillRect(0, 0, this.size, 3);
      this.context.fillStyle = '#0AF';
      this.context.fillRect(0, 0, windForce, 3);

      // Velocity
      var velocity = this.velocity * this.size / this.velocityMax;

      this.context.fillStyle = 'rgba(0,0,0,0.1)';
      this.context.fillRect(0, 4, this.size, 3);
      this.context.fillStyle = '#0AF';
      this.context.fillRect(0, 4, velocity, 3);
    }
  };



  window.Windmill = Windmill;

})()
