require('gsap');
require('pixi.js');
var randrange = require('./randrange.js');
var webc = require('./webcolors.js');

var mouse = {
  is_down: undefined
}

window.onload = function(){
  _init();
};

function _init(){
  var app = new PIXI.Application(innerWidth, innerHeight, {
    antialias: true,
    backgroundColor: 0xffffff
  });
  document.body.appendChild(app.view);
  window.addEventListener('resize', function(){
    app.renderer.resize(innerWidth, innerHeight);
  });
  
  var tx = new PIXI.Texture.fromImage('images/cupcake.png');
  var mf = new PIXI.Sprite(tx);
  app.stage.addChild(mf);
  mf.width = 50;
  mf.height = 50;
  
  app.ticker.add(function(){
    console.log('Framerate: '+app.ticker.FPS);
  });
  window.addEventListener('click', function(e){
    draw(e.clientX, e.clientY);
  });
  window.addEventListener('mousemove', function(e){
    mf.x = e.clientX;
    mf.y = e.clientY;
    if(mouse.is_down == true){
      draw(e.clientX, e.clientY);
    }
  });
  window.addEventListener('mousedown', function(e){
    mouse.is_down = true;
  });
  window.addEventListener('mouseup', function(e){
    mouse.is_down = false;
  });
  function draw(x, y){
    var c = new PIXI.Graphics();
    c.beginFill(webc.colors()[randrange.random_range(0, webc.colors().length)]);
    c.drawCircle(0,0,1.5);
    c.endFill();
    app.stage.addChild(c);
    c.x = x; 
    c.y = y;
    var cnt = 0;
    var incr = Math.PI * 10/100;
    var rand_x = _rand();
    var rand_y = _rand();
    var rand_dir = _rand();
    app.ticker.add(function(){
      cnt += incr;
      c.x += Math.sin(cnt) * rand_x + rand_dir;
      c.y += Math.sin(cnt) * rand_y + rand_dir;
    });
  };
  
  function _rand(){
    var r = randrange.random_range(-2, 2);
    if(r == 0){
      r = 1;
    }
    return r;
  }
  
};

