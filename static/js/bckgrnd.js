function zoomline(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.xspeed = random(0,1);
    this.stroke = map(this.xspeed,0,1,1,5,true);
}

zoomline.prototype.show = function(){
    stroke(255);
    strokeWeight(this.stroke);
    line(this.x,this.y,this.x + 10,this.y);
}

zoomline.prototype.move = function(){
    this.x = this.x - this.xspeed;
    if(this.x < 0){
        this.x = width;
        this.y = random(0,height);
    }
    if(this.xspeed <= 150){
        this.xspeed = this.xspeed + universalacc*0.001; 
    }
}