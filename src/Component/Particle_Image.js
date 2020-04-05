import React, { Component } from 'react';
import Pic from './321.jpg'

class Image extends React.Component {
    constructor(props) {
      super(props);
      this.draw = this.draw.bind(this);
      this.show = this.show.bind(this);
      this.update = this.update.bind(this);
      this.particle = this.particle.bind(this);
      this.loop = this.loop.bind(this);
      this.resize = this.resize.bind(this);
      
      this.particles = []
      this.notx= 0
      this.noty= 0
      this.colors = ["#c542f4","#84edb8", "#db0a0a","#fff899", "#0f0209"]
      this.x=0
      this.y=0
       this.state = {
        width:800,
        height:800,
       
       
      }
    
    }

  componentDidUpdate(){
 
  }
    componentDidMount() {
     
      this.ctx = this.refs.canvas.getContext('2d');
      this.ctx1 = this.refs.canvas1.getContext('2d');
      this.img = this.refs.image
      this.img.onload =this.particle
     
      this.loop()
    
     
    }
     //this.ctx.drawImage(picture,0,0);
      //this.particle()

    


    
    resize(){
      const Cheight = document.getElementById('fullscreen').clientHeight;
      const Cwidth = document.getElementById('fullscreen').clientWidth;
      this.setState({ width:Cwidth,height:Cheight }, () => {
        
        console.log(this.state.height, 'height')
      }); 
      //this.setState({width:Cwidth,height:Cheight})
     
    }
    loop(){
      

      this.update()
        this.draw()
        //console.log("particles",this.particles)
     requestAnimationFrame(this.loop)
    }
    show(){
     
      
      this.particle()
      
      
      
     
    // requestAnimationFrame(this.show)
    }   
    particle (){
        if (this.particles.length > 0) {
            this.particles.length = 0;
          }
      this.ctx.drawImage(this.img, 0, 0)
          console.log("im the data",this.img.height)
      let data  = this.ctx.getImageData(0, 0, this.state.width, this.state.height);
      this.ctx.clearRect(0,0,this.state.width, this.state.height);

    //disthering 
    //   let yy=-1

    //   for (let i =0; i<data.data.length; i+=data.width*4){
    //     yy++
    //     let xx = -1
    //     for(let j=0;j<data.width*4;j+=4){
    //       xx++
    //       let g = data.data[yy*data.width*4+(xx*4)]
    //      let oldpixel = g
    //      let newpixel = oldpixel<128? 0:255;
    //      let qunt_err= oldpixel-newpixel
    //      let xy = yy*data.length*4+xx*4
    //      var xp1y=yy*data.width*4+((xx+1)*4);
    //      var xm1yp1=(yy+1)*data.width*4+((xx-1)*4);
    //      var xyp1=(yy+1)*data.width*4+(xx*4);
    //      var xp1yp1=(yy+1)*data.width*4+((xx+1)*4);
    //      data.data[xy]=newpixel;
    // data.data[xp1y]=Math.floor(data.data[xp1y]+qunt_err*7/16);
    // data.data[xm1yp1]=Math.floor(data.data[xm1yp1]+qunt_err*3/16);
    // data.data[xyp1]=Math.floor(data.data[xyp1]+qunt_err*5/16);
    // data.data[xp1yp1]=Math.floor(data.data[xp1yp1]+qunt_err*1/16);
    // for(var h=1;h<3;h++){
    //   data.data[xy+h]=data.data[xy];
    //   //if(xx<c.width-1 && yy < c.height-1){
    //     data.data[xp1y+h]=data.data[xp1y];
    //     data.data[xm1yp1+h]=data.data[xm1yp1];
    //     data.data[xyp1+h]=data.data[xyp1];
    //     data.data[xp1yp1+h]=data.data[xp1yp1];
    //   //}
    // }
         
    //     }  
    //   } 
      for (let i =0; i<data.height; i++){
        for(let j=0;j<data.width;j++){
          if(data.data[ (i *4 + j*4*data.width)]>200 && data.data[ (i *4 + j*4*data.width)+2] !==255){
            this.notx = Math.random() *this.state.width
            this.noty = Math.random() *this.state.height
              this.particles.push({
                x: this.notx,
                y: this.noty,
                accY:0,
                accX:0,
                dest : {
                      destx : i,
                      desty: j
                      },
                r :  Math.random()*1,
                vx :(Math.random()-0.5)*20,
                vy : (Math.random()-0.5)*20,
                friction :Math.random()*0.05 + 0.94,
                colors:this.colors[Math.floor(Math.random()*6)]
                })
             

              
          }
        }  
      } 
     
  //  console.log("im the data",data)
 // this.ctx1.putImageData(data,0,0);
 this.ctx1.font = "100px Georgia";
 this.ctx1.fillStyle= 'white'
  this.ctx1.fillText("Young", this.state.width/2, this.state.height/2);
    }
   
 
    draw() {
      let amount =this.particles.length
      //console.log("particlesx from update",amount)
     
      this.ctx.clearRect(0,0,this.state.width,this.state.height)
     
      this.update()
      for (let i =amount-10; i>=0; i--){
        this.ctx.fillStyle = 'white'
      this.ctx.beginPath();
      this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].r, 0, 2 * Math.PI);
      this.ctx.closePath(); 
      this.ctx.fill();
      }
     // console.log("particlesx",this.particles[0].x)
     // console.log("particlesx updated",this.particles[0].x)

    //requestAnimationFrame(this.draw); 
 }

update(){
  let amount =this.particles.length
  //console.log("particlesx from update",amount)
  
 
  for (let i =0; i<=amount-10; i++){
    
    this.particles[i].accX = (this.particles[i].dest.destx - this.particles[i].x)/1000;
    this.particles[i].accY = (this.particles[i].dest.desty - this.particles[i].y)/1000;
    this.particles[i].vx += this.particles[i].accX;
    this.particles[i].vy += this.particles[i].accY;
    this.particles[i].vx *= this.particles[i].friction;
    this.particles[i].vy *= this.particles[i].friction;

    this.particles[i].x += this.particles[i].vx;
    this.particles[i].y +=  this.particles[i].vy;
    this.particles[i].x+=this.particles[i].vx
    this.particles[i].y += this.particles[i].vy;
 
 
  if (this.particles[i].x<0 || this.particles[i].x > this.state.width)
  this.particles[i].vx= -this.particles[i].vx

  if (this.particles[i].y< 0 || this.particles[i].y> this.state.height)
  this.particles[i].vy = -this.particles[i].vy;
}
}



  
    render() {
      const Canstyle ={
     
        position: 'absolute',
        backgroundColor: 'black',
      }
      const Canstyle1 ={
        position: 'relative',
        backgroundColor: 'black',
        opacity:0.5
      }
      const imstyle ={
      width:'400',
      height:'400',
        display: 'none',
 
      }
      
      const size =this.state
      
    //   (<img src={Pic}/>) 
       return(
           <div>
 <canvas ref="canvas"  width ={size.width} height ={size.height} style ={Canstyle} /> 
 <canvas ref="canvas1"  width ={size.width} height ={size.height} style ={Canstyle1} /> 
 <img ref="image" src={Pic} style ={imstyle} alt = "" />
           </div>
       )
       
      
       }
  
  
}
 

export default Image;