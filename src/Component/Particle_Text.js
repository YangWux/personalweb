import React, { Component } from 'react';

class Particle_Text extends React.Component {
  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.Particle_init = this.Particle_init.bind(this);
    this.loop = this.loop.bind(this);
    this.updateDimention = this.updateDimention.bind(this);
    this.OnmouseMove = this.OnmouseMove.bind(this);
    this._mouseClick = this._mouseClick.bind(this);
    this.particles = [];
    this.init_x = 0;
    this.init_y = 0;
    this.distance = 0;
    this.a = 0;
    this.b = 0;
    this.radius = 1;
    this.colors = ['#c542f4', '#84edb8', '#db0a0a', '#fff899', '#0f0209'];
    this.mouseX = 0;
    this.mouseY = 0;
    this.amount = 0;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  componentDidUpdate() {
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    
    console.log(this.amount, 'did updated');
    console.log('im state from didupdate', this.state);
  }
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
   
    this.updateDimention();
   // window.addEventListener('resize', this.updateDimention);
  
    this.show();
    this.loop();
    console.log('im state from didmount', this.state);
  }
  componentWillMount(){ 
    
  window.addEventListener('resize', this.updateDimention);
   window.addEventListener('resize', this.Particle_init);
  }

  updateDimention() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  loop() {
    requestAnimationFrame(this.loop);
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.draw();
  }
  show() {
    this.Particle_init();
  }
  //initialize the particle with random location on the canvas
  Particle_init() {
    //clear particle array
    if (this.particles.length > 0) {
      this.particles.length = 0;
    }
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    console.log('im state', this.state);
    //Draw text on 2d canvas
    this.ctx.font = '150px Georgia';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Dreamer/Yang', this.state.width / 2, this.state.height / 1.8);
    let data = this.ctx.getImageData(0, 0, this.state.width, this.state.height).data;
    //

    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.ctx.globalCompositeOperation = 'screen';
    //nested for loop literate through all every pixel on canvas and locate the particle destination
    for (
      let i = 0;
      i < this.state.width;
      i += Math.round(this.state.width / 150)
    ) {
      for (
        let j = 0;
        j < this.state.height;
        j += Math.round(this.state.height / 150)
      ) {
        if (data[(i + j * this.state.width) * 4 + 3] > 150) {
          //particle start with random postion on canvas
          this.init_x = Math.random() * this.state.width;
          this.init_y = Math.random() * this.state.height;
          this.particles.push({
            x: this.init_x,
            y: this.init_y,
            accY: 0,
            accX: 0,
            dest: {
              destx: i,
              desty: j,
            },
            r: Math.random() * 5 + 5,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            friction: Math.random() * 0.05 + 0.94,
            colors: this.colors[Math.floor(Math.random() * 6)],
          });
        }
      }
    }

    this.amount = this.particles.length;
    console.log(this.amount, 'amount--from Particle');
  }
// draw particles
  draw() {
    this.update();
    let grd=this.ctx.createLinearGradient(this.state.width/1.5,this.state.height/2,220,10);
    //add color 
    grd.addColorStop(0,"black");
    grd.addColorStop(1,'gray');
    for (let i = 0; i < this.amount; i++) {
      this.ctx.fillStyle = grd;
      this.ctx.beginPath();
      this.ctx.arc(
        this.particles[i].x,
        this.particles[i].y,
        this.particles[i].r,
        false,
        2 * Math.PI
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  //formed a circle when clicked particle cannot touch it 
  _mouseClick(e) {
    this.radius++;
    if (this.radius > 7) {
      this.radius = 0;
    }
  }

  OnmouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
  //Apply physics force on particle 
  update() {
    let dx, dy;
    //console.log(this.amount, 'amount--from update')
    for (let i = 0; i < this.amount; i++) {
      this.particles[i].accX =
        (this.particles[i].dest.destx - this.particles[i].x) / 500;
      this.particles[i].accY =
        (this.particles[i].dest.desty - this.particles[i].y) / 500;
      this.particles[i].vx += this.particles[i].accX;
      this.particles[i].vy += this.particles[i].accY;
      this.particles[i].vx *= this.particles[i].friction;
      this.particles[i].vy *= this.particles[i].friction;

      this.particles[i].x += this.particles[i].vx;
      this.particles[i].y += this.particles[i].vy;

      dx = this.particles[i].x - this.mouseX;
      dy = this.particles[i].y - this.mouseY;
      // calculate the distance between particle destination and initial postion 
      this.distance = Math.sqrt(dx * dx + dy * dy);
    //determin the speed of particle based on the distance to destination 
      if (this.distance < this.radius * 25) {
        this.particles[i].accX = (this.particles[i].x - this.mouseX) / 1000;
        this.particles[i].accY = (this.particles[i].y - this.mouseY) / 100;
        this.particles[i].vx += this.particles[i].accX;
        this.particles[i].vy += this.particles[i].accY;
      }
      // make sure particle move inside the canvas
      if (this.particles[i].x < 0 || this.particles[i].x > this.state.width)
        this.particles[i].vx = -this.particles[i].vx;

      if (this.particles[i].y < 0 || this.particles[i].y > this.state.height)
        this.particles[i].vy = -this.particles[i].vy;
    }
  }

  render() {
    const Canstyle = {
      backgroundColor: 'white',
    };

    return (
      <canvas
        ref="canvas"
        onClick={this._mouseClick}
        onMouseMove={this.OnmouseMove}
     
        width={this.state.width}
        height={this.state.height-50}
        style={Canstyle}
      />
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.Particle);
  }
}
export default Particle_Text;
