/*var gameState = "opening";
var logo;
var change;
var change1;
var bg;
var claire;


var platform;;

var platform2;


var bulletGrp


var timer=1100;
var magazine=55;
var resetButton;*/
var about
var gamestate = "wait"
var player, invisibleground1, invisibleground2, invisibleground3, invisibleground4;
var zombie;
var zombieGrp;
var bullet;
var lose;
var TimeToSafeZone = 1000;
var safeZone;
var bulletsLeft = 30;
var zombiesKilled = 0;
var win;

function preload() {
    nextimg = loadImage("change.gif");
    logoimg = loadImage("openingimage.gif")
    aboutimg = loadImage("about.png")
    bgaboutimg = loadImage("bgabout1.jpg")
    backimg = loadImage("back.gif")
    level1img = loadImage("level1.png")
    playerimg = loadImage("girlReady.gif")
    playerrunning = loadImage("girlRunning.gif")
    playerback = loadImage("girlReverse.gif")
    plrwon = loadImage("playerWon.gif")
    zombie1img = loadImage("zombie1.gif")
    zombie2img = loadImage("zombie2.gif")
    zombie3img = loadImage("zombie3.gif")
    zombie4img = loadImage("zombie4.gif")
    zombie5img = loadImage("zombie5.gif")
    zombie6img = loadImage("zombie6.gif")
    bulletimg = loadImage("bullet.png")
    loseimg = loadImage("gameOver.gif")
    deadSound = loadSound("coffinDance.mp3")
    hurtSound = loadSound("zombieDead.mp3")
    shootSound = loadSound("shoot.mp3")
    //safeZoneImg = loadImage("targetImg.png")
    wonimg = loadImage("won.gif")
    winSound = loadSound("winSound.mp3")

}



function setup() {

    createCanvas(windowWidth, windowHeight)


    aboutbackground = createSprite(windowWidth / 2, windowHeight / 2, width + 100, height)
    aboutbackground.addImage(bgaboutimg)
    aboutbackground.visible = false
    // aboutbackground.scale=1.25


    invisibleground1 = createSprite(windowWidth / 2, windowHeight - 5, windowWidth, 10)
    invisibleground2 = createSprite(windowWidth / 180, windowHeight / 2, 7, windowHeight)
    invisibleground3 = createSprite(windowWidth / 2 + 650, windowHeight / 2, 7, windowHeight)
    invisibleground4 = createSprite(width / 2, height / 200, windowWidth, 2)
    invisibleground1.visible = false
    invisibleground2.visible = false
    invisibleground3.visible = false

    level1 = createSprite(windowWidth / 2, 70)
    level1.addImage(level1img)
    level1.scale = 1.15
    level1.visible = false
    level1.velocityX = -1
    level1.x = width / 2


    next = createSprite(width - 100, height - 80, 20, 20);
    next.addImage(nextimg)
    next.scale = 0.5


    back = createSprite(width - 80, 80, 20, 20);
    back.addImage(backimg)
    back.scale = 0.5

    platform2 = createSprite(68, 400, 1000, 5)
    platform = createSprite(200, 280, 1000, 5)

    platform.visible = false;
    platform2.visible = false;

    logo = createSprite(width / 2, height / 2);
    logo.addImage(logoimg)
    logo.scale = 2

    about = createSprite(80, 80, 20, 20)
    about.addImage(aboutimg)

    player = createSprite(100, height - 50)
    player.addImage(playerimg)
    player.scale = 0.85
    player.visible = false
    // player.debug = true
    player.setCollider("rectangle", -40, 0, 100, 200)

    /* safeZone = createSprite(width / 4-200, height - 570)
     safeZone.addImage(safeZoneImg)
     safeZone.visible=false*/




    about.visible = false
    logo.visible = false
    next.visible = false
    back.visible = false
    aboutbackground.visible = false
    bulletGrp = createGroup();
    zombieGrp = createGroup();


}

function draw() {



    player.collide(invisibleground1)
    player.collide(invisibleground2)
    player.collide(invisibleground3)
    player.collide(invisibleground4)
    player.velocityY = 10;

    if (gamestate === "wait") {
        background(0)
        about.visible = true
        logo.visible = true
        next.visible = true

    }
    else if (gamestate === "level1") {

        // text("TimeToSafeZone"+TimeToSafeZone,width/4,100)

        about.visible = false
        logo.visible = false
        next.visible = false
        aboutbackground.visible = false
        back.visible = true

        level1.visible = true
        // score.visible = true

        if (level1.x < level1.width / 4) {
            level1.x = level1.width / 2
        }

        spawnZombie();
        shoot();

        if (bulletsLeft === 0 && TimeToSafeZone != 0) {
            gamestate = "defeat"
        }

        TimeToSafeZone = TimeToSafeZone - 1;

        if (TimeToSafeZone === 0) {
            gamestate = "won"
        }

        if (gamestate === "won") {
            won()
            textSize(80)
            textFont("chiller")
            fill("green")
            text("YOU WON", width / 2, height / 2)
        }

        if (bulletGrp.isTouching(zombieGrp)) {
            for (var j = 0; j < bulletGrp.length; j++) {
                for (var k = 0; k < zombieGrp.length; k++) {
                    if (bulletGrp.get(j).isTouching(zombieGrp.get(k))) {
                        //bulletGrp.destroyEach();
                        bulletGrp.get(j).destroy();
                        zombieGrp.get(k).destroy();
                        //j--;
                        hurtSound.play();
                        zombiesKilled = zombiesKilled + 1

                    }
                }
            }
        }

    }


    if (zombieGrp.isTouching(invisibleground2)) {
        gamestate = "defeat"
    }

    if (zombieGrp.isTouching(player)) {
        gamestate = "defeat"
    }

    if (gamestate === "defeat") {
        defeat()
    }


    if (mousePressedOver(about)) {
        gamestate = "info"

        /*aboutbackground.visible=true
        about.visible=false
        logo.visible=false
        next.visible=true*/
    }

    if (mousePressedOver(next)) {
        gamestate = "next"
    }

    if (mousePressedOver(back)) {
        gamestate = "back"
    }

    drawSprites();

    if (gamestate === "level1") {
        textFont("chiller")
        fill("green")
        textSize(40)
        text("TimeToSafeZone:-" + TimeToSafeZone, width / 5 - 200, height - 540)

        textFont("chiller")
        fill("red")
        textSize(40)
        text("BULLETS LEFT:-" + bulletsLeft, width / 1.5, height - 540)

        textFont("chiller")
        fill("green")
        textSize(40)
        text("ZOMBIES KILLED:-" + zombiesKilled, width / 2.5, height - 540)
    }

   /* if (gamestate === "defeat") {
        textSize(80)
        fill("green")
        textFont("chiller")
        text("YOU LOSE", width / 2.5, lose.height - 400)
    }*/


    if (gamestate === "info") {
        aboutbackground.visible = true
        about.visible = false
        logo.visible = false
        next.visible = true
        back.visible = true
        fill("yellow");
        textSize(50);
        stroke(0)
        strokeWeight(5)

        text("Hi! You have come as a Saviour to US", width / 4, 90);

        textSize(35);
        stroke(0)
        strokeWeight(5)
        text("Follow the below  mentioned instructions to HELP US from these Zombies ...", 100, 150);


        fill("blue");
        textSize(35);
        text("-Use 'Right arrow' to run forward.", 200, 250);
        textSize(35);
        text("-Use 'Left arrow' to run backward.", 200, 300);
        textSize(35);
        text("-Use 'Up/Down' to move UP or Down", 200, 350);

        textSize(35);
        text("-Use 'Space' to shoot ", 200, 400);


        textSize(50);
        fill("red");
        stroke(0)
        strokeWeight(5)
        text("Don't let zombies enter the city.", 200, 200);


    }


    if (mousePressedOver(back)) {
        gamestate = "wait"
        background(0)
        about.visible = true
        logo.visible = true
        next.visible = true
        aboutbackground.visible = false
        back.visible = false
        // lose.destroy();
        deadSound.pause();
        // win.visible=false
    }



    if (mousePressedOver(next)) {
        gamestate = "level1"
        background(0)
        about.visible = false
        logo.visible = false
        next.visible = false
        aboutbackground.visible = false
        level1.visible = true
        player.visible = true
       

    }

    if (keyDown("RIGHT_ARROW")) {
        player.x = player.x + 15
        player.addImage(playerrunning)
    } else {
        player.addImage(playerimg)
    }


    if (keyDown("LEFT_ARROW")) {

        player.x = player.x - 15
        player.addImage(playerback)

    }




    if (keyDown("UP_ARROW")) {
        player.velocityY = -15
        player.addImage(plrwon)
        player.velocityY = player.velocityY + 0.8
    }




    if (mousePressedOver(back)) {
        gamestate = "wait"
        background(0)
        about.visible = true
        logo.visible = true
        next.visible = true
        aboutbackground.visible = false
        back.visible = false
        level1.visible = false
        player.visible = false
        zombieGrp.destroyEach();

    }

    if (gamestate === "won" && mousePressedOver(back)) {
        win.visible = false

    }

    if(gamestate==="defeat"&& mousePressedOver(back)){
        lose.visible=false
    }
}

function spawnZombie() {
    if (frameCount % 43 === 0) {
        zombie = createSprite(windowWidth, windowHeight - 100);
        zombie.velocityX = -10;
        zombie.lifetime = 300;
        //zombie.velocityY = zombie.velocityY + 10;

        //zombie.debug = true;
        zombie.setCollider("circle", 0, 0, 100);
        zombieGrp.add(zombie);
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1: zombie.addImage(zombie1img);
                zombie.scale = 1
                break;

            case 2: zombie.addImage(zombie2img);
                break;
            case 3: zombie.addImage(zombie3img);
                zombie.scale = 0.5
                break;
            case 4: zombie.addImage(zombie4img);
                zombie.scale = 0.7

                break;

            case 5: zombie.addImage(zombie5img);
                zombie.x = width - 130
                break;

            case 6: zombie.addImage(zombie6img);
                zombie.y = height - 500
                break;



            default: break;
        }

    }

}



function shoot() {
    if (keyWentDown("space")) {
        bullet = createSprite(player.x + 180, player.y + 15, 20, 20);
        bullet.addImage(bulletimg)
        shootSound.play();
        bullet.scale = 1
        bullet.velocityX = 40;
        bullet.lifetime = 300;
        //magazine = magazine - 1;
        //playSound("pistol-(online-audio-converter-(mp3cut.net).mp3", false);
        // bullet.debug=true;
        bulletGrp.add(bullet);
        bulletsLeft = bulletsLeft - 1

    }
}

function defeat() {
    background(loseimg)
    zombieGrp.destroyEach();
    zombieGrp.velocityX = 0
    player.destroy();
    bulletGrp.destroyEach();
   lose = createSprite(width / 2, height - 253)
   lose.visible=false
    /* lose.addImage(loseimg)
    lose.scale = 1*/
    level1.visible = false
    //deadSound.play();
    //text("YOU LOSE", width / 3, lose.height - 20)
    back.visible=false
    back.destroy()

}

function won() {
    background(wonimg)
    win = createSprite(width / 2, height / 2);
    //win.visible=false
    win.addImage(wonimg);
    win.scale = 2.95;
    player.destroy();
    zombieGrp.destroyEach();
    bulletGrp.destroyEach();
    level1.visible = false
    winSound.play();
    back.visible=false
    next.visible=false
    about.visible=false

    next.destroy()
    back.destroy()
    about.destroy()

}
