
//declaring about  all variables.
var gameState = "opening";
var logo;
var change;
var change1;
var bg;
var claire;
var player;
var bullet;
var platform=createSprite(200,280,1000,5);
platform.visible=false;
var platform2=createSprite(68,400,1000,5);
platform2.visible=false;
var zombie;
var bulletGrp=createGroup();
var zombieGrp=createGroup();
var score=0;
var timer=1100;
var magazine=55;
var resetButton;

function preload(){
    changeimg = loadImage("change.png");
logoimg=loadImage("openingimage.gif")
}

function setup(){
    createCanvas("windowWidth","windowHeight")
    change = createSprite(195,320,20,20);
    change.addImage(changeimg)

    logo = createSprite(200,130,20,20);


}
function draw() {

//gameState opening condition.
if (gameState === "opening"){
  background("black"); 
  textSize(40);
  stroke("white");
  textFont("chiller");
  text("Welcome to Demolitia Bravo",45,280);
  
  
  change.scale=0.5;
  
  logo.setAnimation("images.jpg_1");
 logo.scale= 0.8;
}

//gameState changes to in formation.
if(mousePressedOver(change)){
 gameState = "information";
 var Back=createSprite(200,200);
 Back.setAnimation("Back");
 Back.scale=5;
 Back.depth=logo.depth+1;
 logo.destroy();
 change.destroy();
 }

 //game will start as you click on change1-green arrow on screen
if(mousePressedOver(change1)){
 gameState="start";
 gameStart();
  }   

//gamestate start condition.
if(gameState === "start"){
  shoot();
  spawnZombie();
  
  timer=timer-0.5;
 // timer=timer-0.033;
  
  //key controls
   if(keyDown("UP_ARROW")){
    player.y=player.y-5;
  }
  
  if(keyDown("DOWN_ARROW")){
    player.y=player.y+5;
  }
  
   player.collide(platform);
   player.collide(platform2);
   
   //destroying each bullet and each zombie when that bullet collides with zombie 
   if(bulletGrp.isTouching(zombieGrp)){
    for(var j=0; j<bulletGrp.length; j++){
      for(var k=0; k<zombieGrp.length; k++){
         if(bulletGrp.get(j).isTouching(zombieGrp.get(k))){
           //bulletGrp.destroyEach();
              bulletGrp.get(j).destroy();
               zombieGrp.get(k).destroy();
               j--;
               score=score+1;  
           playSound("Zombie-Hurt-Nr-1-Minecraft-Sound-(mp3cut.net).mp3",false);
      }  
    } 
   }
  }
  
  if(timer !=0 && score===5){ 
        gameState="won";
  }
   
  if(gameState === "won"){
    win();
  }
  
  if(magazine===0 && score!=50 ){
    gameState = "lose";
    //lose();
  }
  if(timer==0){
    gameState="lose";
  }

  if(zombieGrp.isTouching(player)){
    gameState = "lose";
  }
  
  if(gameState === "lose"){
    lose();
  }
  
  if(keyWentDown(RIGHT_ARROW)){
    player.setAnimation("running1.png_1");
    bg.velocityX=-5;
  }
  
  if(keyWentUp(RIGHT_ARROW)){
    player.setAnimation("readypos1.png_1");
    bg.velocityX=0;
  }
  //resetting the background
  if(bg.x<-250){
    bg.x=630;
  }
  
}

drawSprites();

if(gameState === "information"){
 claire=createSprite(70,150,20,20);
 claire.setAnimation("claire.png");
 claire.scale=0.8;
 
 change1=createSprite(350,360,20,20);
 change1.setAnimation("right_green_result_1");
 change1.scale=0.1;
 
 fill("red");
 textSize(27);
 text("Hi! I am Claire Redfield",120,90);
 
 fill("blue");
 textSize(23);
 text("-Use 'Space' to shoot ",133,135);
 textSize(23);
 text("-Use 'Right arrow' to run.",133,169);
 textSize(23);
 text("-Use 'Up/Down' to move",133,200);
 
 fill("dark green");
 textSize(25);
 text("Don't let zombies to go to the city.",20,330);

}
   
textSize(25);
fill("darkgreen");
text("Score: "+score,100,30);

textSize(25);
fill("darkgreen");
text("Time: "+ Math.round(timer),270,30);

textSize(25);
fill("lime");
text("Bullets left: "+ magazine,20,380);
}

function gameStart(){
  claire.destroy();
  bg=createSprite(600,200,20,20);
  bg.setAnimation("bg1");
  bg.scale=2;
  player=createSprite(50,310,20,20);
  player.setAnimation("readypos1.png_1");
  player.scale=0.2;
 // player.debug=true;

}

function shoot(){
  if(keyWentDown("space")){
    bullet=createSprite(player.x+25,player.y-1,20,20);
    bullet.setAnimation("images-removebg-preview.png_1");
    bullet.scale=0.2;
    bullet.velocityX=20;
    bullet.lifetime=30;
    magazine=magazine-1;
    playSound("pistol-(online-audio-converter-(mp3cut.net).mp3",false);
   // bullet.debug=true;
    bulletGrp.add(bullet);
    
  }
}


function spawnZombie(){
  if(World.frameCount % 47 === 0){
    zombie = createSprite(450,250,1,1);
    zombie.scale=0.2;
    zombie.velocityX=-(4+score/5);
    zombie.lifetime=300;
   // zombie.debug=true;
    zombie.setCollider("circle",0,0,60);
    zombie.y=Math.round(randomNumber(310,370));
    zombieGrp.add(zombie);
    var rand = Math.round(random(1,5));
    switch (rand){
      case 1:zombie.setAnimation("zombie1-removebg-preview.png_1");
              break;
      case 2: zombie.setAnimation("child1.png_1");
              break;
      case 3: zombie.setAnimation("leader1-removebg-preview.png_1");
              break;
      case 4: zombie.setAnimation("old1");
              break;
              
      case 5: zombie.setAnimation("big1-removebg-preview.png_1");
              break;
      default:break;
    }
    
  }
  
}
  
function win(){
 var won=createSprite(200,200);
 won.setAnimation("win.jpg");
 won.scale=0.9;
 playSound("sound://category_achievements/peaceful_win_8.mp3");
 player.destroy();
 zombieGrp.destroyEach();
}

function lose(){
  var defeat=createSprite(200,253);
  defeat.setAnimation("lose.png");
  defeat.scale=0.8;
  zombieGrp.setVelocityXEach(0);
  playSound("Zombie-Throat-Hiss-www.fesliyanstudios.com.mp3",false);
  
}

 
