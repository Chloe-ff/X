let alienImage, universeImage, earthImage;
let gameState = "start"; // States: start, play, end
let alienResponse = "";
let earthStatus = "normal"; // Could be normal, thriving, ruined
let timer = 0;

function preload() {
  alienImage = loadImage("alien.png"); // Replace with your URL
  universeImage = loadImage("universe.png"); // Replace with your URL
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (gameState === "start") {
    background(0);
    displayStartPage();
  } else if (gameState === "play") {
    displayUniverse();
    if (earthStatus === "thriving") {
      fill(0, 255, 0);
    } else if (earthStatus === "ruined") {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    ellipse(width / 2, height / 2, 100, 100); // Earth representation
    fill(255);
    textSize(20);
    text("Earth Status: " + earthStatus, 10, 30);
    displayButtons();
  } else if (gameState === "end") {
    displayEnding();
  }
}

function displayStartPage() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Welcome to the Alien Encounter Game", width / 2, height / 2 - 50);
  textSize(16);
  textAlign(LEFT);
  text("Background: You have received a signal from extraterrestrial life. Will you invite them to Earth?", 50, height / 2);
  text("Rules: Make choices that will affect the fate of humanity and the aliens.", 50, height / 2 + 30);
  
  textAlign(CENTER);
  textSize(20);
  fill(0, 255, 0);
  rect(width / 2 - 60, height / 2 + 80, 120, 40);
  fill(255);
  text("Start", width / 2, height / 2 + 100);
}

function mousePressed() {
  if (gameState === "start") {
    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 + 80 && mouseY < height / 2 + 120) {
      gameState = "play";
    }
  } else if (gameState === "play") {
    if (mouseX > 50 && mouseX < 150 && mouseY > 550 && mouseY < 590) {
      gameState = "end"; // End the game
    }
  } else if (gameState === "end") {
    if (mouseX > 50 && mouseX < 150 && mouseY > 550 && mouseY < 590) {
      gameState = "start"; // Restart the game
    }
  }
}

function displayUniverse() {
  background(universeImage);
  image(alienImage, width / 2 - 100, height / 2 - 100, 200, 200); // Display alien when invited
  fill(255);
  textSize(20);
  text("Invite aliens to Earth! Choose a response:", 10, 30);
  
  textAlign(CENTER);
  textSize(20);
  fill(0, 0, 255);
  rect(50, 500, 200, 40);
  fill(255);
  text("Welcome Them", 150, 520);
  
  fill(255, 0, 0);
  rect(250, 500, 200, 40);
  fill(255);
  text("Reject Them", 350, 520);
}

function displayButtons() {
  fill(255);
  textSize(16);
  textAlign(LEFT);
  fill(0, 255, 0);
  rect(50, 550, 100, 40);
  fill(255);
  text("Exit", 100, 570);
}

function displayEnding() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  
  if (earthStatus === "thriving") {
    text("The aliens helped humanity thrive!", width / 2, height / 2);
  } else if (earthStatus === "ruined") {
    text("The aliens caused chaos on Earth.", width / 2, height / 2);
  } else {
    text("You chose not to interact. The universe remains a mystery.", width / 2, height / 2);
  }
  
  textSize(16);
  fill(0, 255, 0);
  rect(50, 550, 100, 40);
  fill(255);
  text("Restart", 100, 570);
}

function mousePressed() {
  if (gameState === "play") {
    if (mouseX > 50 && mouseX < 250 && mouseY > 500 && mouseY < 540) {
      earthStatus = "thriving"; // Change the status when welcomed
    } else if (mouseX > 250 && mouseX < 450 && mouseY > 500 && mouseY < 540) {
      earthStatus = "ruined"; // Change the status when rejected
    }
  }
}