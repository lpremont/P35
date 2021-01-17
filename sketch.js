//Create variables here
var dog, dogSprite, happyDog, database, foodS, foodStock; 

function preload()
{
  //load images here
  dog=loadImage('images/dogImg.png');
  happyDog=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dogSprite=createSprite(250,250);
  dogSprite.addImage(dog);
  dogSprite.scale=0.3
  
  database=firebase.database();

  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dogSprite.addImage(happyDog)
}

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("Food remaining:"+foodS,180,400);
  text("Press up arrow key to feed the dog!",100,100);
}

function writeStock(x){
    if(x<=0){
      x=0
    } else {
      x=x-1
    };

    database.ref('/').update({
      Food:x
    })
}

function readStock(data){
  foodS=data.val();
}

