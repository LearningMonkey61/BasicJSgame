// {% load staticfiles %} 
var universalacc = 10;
var universevel = 1;
var lines = [];
var ship;
var meteors = [];
var linenum = 200;
var meteornum = 20;

function POSTSCORE(score){
    var data = {'user' : 'PLY','score': score};
    $.post(URL, data, function(response){
        window.location.href = Redirect_url;
    });
}


window.addEventListener('DOMContentLoaded',function() {
  
    var s1= document.querySelector(".top-3 h4:nth-child(1)").innerHTML;
    var s2 =document.querySelector(".top-3 h4:nth-child(2)").innerHTML;
    var s3 =document.querySelector(".top-3 h4:nth-child(3)").innerHTML;
    document.getElementById("high1").innerHTML =s1;
     document.getElementById("high2").innerHTML=s2;
    document.getElementById("high3").innerHTML = s3;
});




function preload(){
    meteorimage = loadImage(meteor_img);
    spacefont = loadFont(font);
    theme =  loadSound(theme_music);
}

function setup(){
    var bgcanvas = createCanvas(windowWidth,(1/2)*windowHeight);
    bgcanvas.position(0,(2/8)*windowHeight);
    bgcanvas.style("cursor: none");

    theme.loop();
    theme.play();

    ship = new Ship();
    for(var i = 0 ; i < linenum ; i++){
        var l = new zoomline();
        lines.push(l);
    }
    for(var i = 0 ; i < meteornum ; i++){
        var m = new Meteor();
        meteors.push(m);
    }
}

function draw(){
    background(0);
    
    
    for(var i = 0 ; i < lines.length ; i++){
        lines[i].show();
        lines[i].move();
    }

    for(var i = 0 ; i < meteors.length ; i++){
        
        if(collideCircleCircle(ship.x,ship.y,100,meteors[i].x,meteors[i].y,meteors[i].radius)){
            ship.health = ship.health - meteors[i].radius * 0.05;
            meteors[i].explode();
            meteors.splice(i,1);
            meteors.push(new Meteor());
        }
        
        if(meteors[i].x >= 0){
            meteors[i].show();
            meteors[i].move();
        }
        else{
            meteors.splice(i,1);
            meteors.push(new Meteor());
        }
    }
    
    
    ship.show();
    ship.status();
    ship.score = Math.round(millis() * (universevel * 0.01)) ;
    
    var scores=document.querySelector(".top-3").children;
    let up = document.getElementById("up");
    up.innerHTML='';
    let down = document.getElementById("down");
    down.innerHTML=' ';
    for (let i = scores.length-1;i>=0;i--)
    {
        let x=scores[i].innerHTML.split("\t");
        let y=parseInt(x[1]);
        
        if(y>=ship.score)
        {
            if(i!=0)
            {
                down.innerHTML=scores[i+1].innerHTML;
            }
            up.innerHTML = scores[i].innerHTML;
            break;
        }
    }
    document.getElementById("your").innerHTML = ship.score;
    
    

    textSize(50);
    textFont(spacefont);
    text(ship.score, 10, 70);
    
    
    
    
    if(ship.health <= 0){
        noLoop();
        theme.stop();
        textSize(windowWidth/10);
        text("Game Over!",width/5, 3*height/5);
        POSTSCORE(ship.score);
    }
    
    if(universevel <= 150) {
        universevel = universevel + 0.001 * universalacc; 
    }
}

