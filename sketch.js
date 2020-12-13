var dog1, dog, happydogimg, database, foodS, foodStock,background;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  dog1 = createSprite(250,350);
  dog1.addImage(dog);
  dog1.scale = 0.2
}


function draw() {  
background("#2e8a57");

if(foodS !== undefined){
  textSize(20);
  fill(255);
  text("NOTE: Press UP ARROW to feed DRAGO milk",50,50);
  text("Food Remaining: "+foodS,150,150);
}
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog1.addImage(happydogimg);
}

if(keyWentUp(UP_ARROW)){
  dog1.addImage(dog);
}

if(foodS === 0){
  foodS = 20;
}
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref("/").update({
  Food:x
  })
}