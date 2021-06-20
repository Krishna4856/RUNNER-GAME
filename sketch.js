var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player,enemy,playerImg,enemyImg;
var ground,backImg;
var helpSound,enemySound,checkPointSound,gameOverSound;
var enemy,enemy2;
var score;
var gameOverImg,restartImg;
var groundImage,ground;

function preload(){
  playerImg=loadImage("player.png");
  enemyImg=loadImage("tiger1.png");
  enemy2Img=loadImage("enemyImg.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  //backImg=loadImage("backImage.png");
  helpSound=loadSound("helpSound.mp3");
  enemySound=loadSound("enemySound.wav");
  checkPointSound=loadSound("checkPoint.wav");
  gameOverSound=loadSound("gameOver2.wav");
  groundImage=loadImage("backImage.png");
}

function setup() {
  createCanvas(1050,740);

 ground = createSprite(530,320,410,20);
 ground.addImage(groundImage);
 ground.scale=4;

  player = createSprite(250,300,20,50);
  player.addImage( playerImg);
 
  

  player.scale = 0.3;
  score = 0;

  //ground.x = ground.width /2;
  
  gameOver = createSprite(450,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(430,390);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1;
  restart.scale = 0.2;
  
 // invisibleGround = createSprite(250,300,500,5);
 // invisibleGround.visible = true;
  
  //create enemy and enemy2 Groups
  enemyGroup = createGroup();
  enemy2Group = createGroup();

  
  player.setCollider("rectangle",45,50,50,50);
  player.debug = false
  

  
}

function draw() {
  
  background("white");
  //displaying score
  fill("black");
  textSize(20);
  text("Score: "+ score, 400,710);
  fill("red");
  textSize(20);
  text("PRESS UP AND DOWN KEY FOR MOVE YOUR PLAYER IN THE GAME",150,730);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    //if (ground.x < 800){
      //ground.x = ground.width/2;
      //ground.velocityX = 10;
    //}
    
    //jump when the space key is pressed
    if(keyDown("UP_ARROW")) {
        player.y = player.y-5;
    }
      if(keyDown("DOWN_ARROW")) {
        player.y =  player.y+5;
    }
    //add gravity
    //player.velocityY = player.velocityY + 1
  
    //spawn the clouds
    spawnenemy();
  
    //spawn obstacles on the ground
    spawnenemy2();
    
    if(enemyGroup.isTouching(player)||enemy2Group.isTouching(player)){
        gameState = END;
        gameOverSound.play();
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
     //player.changeAnimation("collided", player_collided);
    
     
     
     // ground.velocityX = 0;
      player.visible=false;
      enemy2Group.destroyEach();
      enemyGroup.destroyEach();
      
     //set lifetime of the game objects so that they are never destroyed
    enemyGroup.setLifetimeEach(-1);
    enemy2Group.setLifetimeEach(-1);
     if(mousePressedOver(restart)){
       reset();
     }
     enemyGroup.setVelocityXEach(0);
     enemy2Group.setVelocityXEach(0);    
   }
  
 
  

  drawSprites();
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;restart.visible=false;
  player.visible=true;
  score=0;
  enemyGroup.destroyEach();
  enemy2Group.destroyEach();
}




function spawnenemy(){
 if (frameCount % 60 === 0){
   var enemy = createSprite(500,800,10,40);
   enemy.velocityX = -(30 + score/100);
   enemy.y = Math.round(random(400,700));
   enemy.addImage(enemyImg);

   
    //assign scale and lifetime to the enemy          
    enemy.scale = 0.5;
    enemy.lifetime = 500;
   
   //add each enemy to the group
    enemyGroup.add(enemy);
 }
}

function spawnenemy2() {
  //write code here to spawn the enemy2
  if (frameCount % 30 === 0) {
    var enemy2 = createSprite(500,170,40,10);
    enemy2.y = Math.round(random(10,500));
    enemy2.velocityX = -(50 + score/100);
    enemy2.addImage(enemy2Img);
    enemy2.scale = 0.04;
    enemy2.velocityX = -4;
    
     //assign lifetime to the variable
    enemy2.lifetime = 500;
    
    //adjust the depth
   // cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    enemy2Group.add(enemy2);
  }
}

