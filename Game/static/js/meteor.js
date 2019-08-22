function Meteor(){
    this.x = random(width,2*width);
    this.y = random(0,width);
    this.xspeed = universevel;
    this.radius = random(50,80);
}

Meteor.prototype.show = function(){
    stroke(255);
    strokeWeight(2);
    image(meteorimage,this.x,this.y,this.radius*(1/0.7),this.radius);
    
}

Meteor.prototype.move = function(){
    this.x = this.x - this.xspeed;
    this.y = this.y+random(-4, 4);
}

Meteor.prototype.explode = function(){
    noStroke();
        fill(255,0,0);
    ellipse(this.x + random(-this.radius/2,this.radius/2),this.y + random(-this.radius/2,this.radius/2),this.radius*random(1,2.5));
        fill(255,242,0);
    ellipse(this.x + random(-this.radius/2,this.radius/2),this.y + random(-this.radius/2,this.radius/2),this.radius*random(1,2.5));
        fill(255,106,0);
    ellipse(this.x + random(-this.radius/2,this.radius/2),this.y + random(-this.radius/2,this.radius/2),this.radius*random(1,2.5));
        fill(255,13,0);
    ellipse(this.x + random(-this.radius/2,this.radius/2),this.y + random(-this.radius/2,this.radius/2),this.radius*random(1,2.5));
    fill(255);
}