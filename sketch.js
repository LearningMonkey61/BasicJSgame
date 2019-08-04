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
        if(response === 'success'){ alert('Yay!'); }
        else{ alert('Error! :('); }
    });
}

function preload(){
    meteorimage = loadImage("assets/meteor.gif");
    spacefont = loadFont('assets/space_invaders.ttf');
    theme =  loadSound('assets/theme.mp3');
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