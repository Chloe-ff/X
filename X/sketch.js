let xRandom = [];
let yRandom = [];
let dia = [];
let Dia = [];
let core = [];
let planetColor = [];
let planetAngle = [];
let craftC1;
let craftC3;

let aX = [];
let aY = [];
let bX = [];
let bY = [];

let sinInput = 0;
let cx = 50;
let cy;
let planetC;
let up = 0;
let creatureUp = 0;
let down = 0;

let radarAngle = 90;
let angleChange = 1;
let angle = 0;
let signalX = 700;
let mode = false;

let back = false;

let start = false;
let dead = false;
let horror = false;
let showHorror = 0;
let instruction = false;
let live = false;
let pass = false;


let fortune;

let change = 1;
let showWarning = true;

let jiggle = false;

let high = false;
let medium = false;
let low = false;

let wait = false;
let waitColor = 20;
let waitWarn = 255;

let wander = true;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  
  frameRate(30);
  
  initiation();
}


function draw() {
  background(0);

  //monitoring screen
  monitorScreen();
  
  //random stars
  randomStars();

  //planets(with different sizes, colors, and central decorations)
  planets();
  
  //warning
  warning();

  //planets jiggle when being pressed
  Jiggle(showHorror);

  //earth
  noStroke();
  fill("lightblue");
  circle(800, 250, 200);

  //basic motion of the creatures
  if (dead == false && live == false){
    let sinValue = sin(sinInput);
    sinInput = sinInput + 0.05;
    cy = map(sinValue, -1, 1, -30, 30);  
  }else{
    cy = 0;
  }

  //generating creatures
  creatures(cy);
  
  let cY = 250 + cy + up + down;
  noStroke();
  
  //vertical motions of the creatures
  verticalMotion(cY);
  
  //horizontal motion of the creatures
  horizontalMotion(cY);

  //radar rotation
  radar(cy, cY);
  
  //restart/continue conditions
  if (dead == true){
    deadRestart();
  }
  if (live == true){
    liveRestart();
  }
  
  if (pass == true){
    passContinue();
  }

  //signal(yellow curves)
  yellowCurves();
  
  //signal(orange ball)
  orangeBall(cY);

  //signal(Interaction)
  signal(mouseY);

}


//--------------new functions--------------

function initiation(){
  for (let i = 0; i < 6; i++) {
    xRandom[i] = random(i * 100 + 50, i * 100 + 100);
    yRandom[i] = random(i * 80 + 40, i * 80 + 100);
    dia[i] = random(10, 40);
    Dia[i] = random(80, 110);
    core[i] = random(1);
    planetColor[i] = random(1);
    planetAngle[i] = random(4);
  }
  //whether xxXxx can live with human beings on the earth
  fortune = random(1);
  for (let a = 0; a < 5; a++){
    aX[a] = random(5, 15);
    aY[a] = random(5, 15);
  }
  for (let b = 0; b < 6; b++){
    bX[b] = random(5, 15);
    bY[b] = random(5, 15);
  }
  
  craftC1 = floor(random(50, 220));
  craftC3 = floor(random(20, 200));
}


function moreCreature(cx, cy) {
  //randomly making the creatures
  let craftX = floor(random(1, 5));
  let craftY = floor(random(2, 6));
  let craftC1 = floor(random(50, 220));
  let craftC2 = random(2);

  //the upper "wing"
  noStroke();
  for (let i = 0; i <= craftX; i++) {
    if (craftC2 >= 1) {
      fill(craftC3, 200, 150);
    } else {
      fill(craftC1, craftC1 - 50, craftC1 + 30);
    }

    ellipse(50 - i * 7 + cx, 250 - i * 7 + cy, aX[i], aY[i]);
  }
  //the lower "wing"
  for (let j = 0; j <= craftY; j++) {
    if (craftC2 >= 1) {
      fill(craftC3, 200, 150);
    } else {
      fill(craftC1, craftC1 - 50, craftC1 + 30);
    }
    ellipse(50 - j * 9 + cx, 250 + j * 9 + cy, bX[j], bY[j]);
  }
}

//warning
function warning() {
  if (instruction == false) {
    restart = false;
    
    fill(150 + change, 220);
    change++;
    if (change >= 70) {
      change -= 5;
    }
    if (change <= -90) {
      change += 5;
    }
    rect(180, 120, 440, 260);
    fill("yellow");
    rect(300, 145, 200, 40);
    fill("red");
    textSize(30);
    text("WARNING!!!", 312, 176);
    fill(255);
    textSize(20);
    text("A creature named X is approaching!!!", 225, 230);
    text("Please respond AS SOON AS POSSIBLE!", 210, 285);
    fill("orange");
    rect(200, 320, 137, 30);
    fill(0);
    textSize(25);
    text("Instruction", 204, 345);
    fill("orange");
    rect(477, 320, 120, 30);
    fill(0);
    textSize(25);
    text("Wait", 507, 345);

    if (wait == true) {
      fill(waitWarn, 0, 0, 70);
      if (waitWarn <= 150 || waitWarn >= 255) {
        waitColor = -waitColor;
      }
      waitWarn += waitColor;

      rect(0, 0, 800, 500);
    }
    
  }else{
    if (start == false){
      fill(150, 220);
      rect(150, 100, 498, 300);    
      fill(0);
      rect(165, 115, 140, 30);
      fill(255);
      text("Instruction", 183, 137);
      textSize(16);
      text("1. Creature X is V-shaped with purple and green colors.", 165, 171);
      text("2. Send signals to the creature by pressing the mouse.", 165, 193);
      text("upper region: signal of going up", 183, 214);
      text("middle region: signal of going backwards", 183, 237);
      text("lower region: signal of going down", 183, 259);
      text("3. The creature will be in horror and stop moving if a planet \n (green or yellow) is pressed.", 165, 281);
      text("4. Control the creature by using the signals mentioned above. \n Whether the creature can land on the Earth depends on you. \n Different decisions will lead to different results.", 165, 325);
      fill("orange");
      textSize(20);
      text("Now, the fate of huamnity is in your hand!", 195, 391);
      fill("red");
      rect(500, 110, 120, 40);
      fill("yellow");
      textSize(25);
      text("START", 522, 140);
    }
  }
  if (start == true){
    fill(200, 100, 0, 150);
    rect(35, 435, 120, 30);
    fill(255, 200);
    text("Instruction", 43, 457);
  }
}


function mousePressed() {
  //press the start button or wait button
  if (200 <= mouseX && mouseX <= 337 && 320 <= mouseY && mouseY <= 350) {
    instruction = true;
    wait = false;
  }
  //press wait button
  if (477 <= mouseX && mouseX <= 597 && 320 <= mouseY && mouseY <= 350) {
    wait = true;
  }
  //press start button
  if (500 <= mouseX && mouseX <= 620 && 120 <= mouseY && mouseY <= 160) {
    start = true;
    initiation();
  }
  //press the instruction button (after start)
  if (35 <= mouseX && mouseX <= 155 && 435 <= mouseY && mouseY <= 465) {
    start = false;
  }
  //press restart button
  if (restart == true && 355 <= mouseX && 455 >= mouseX && 310 <= mouseY && 370 >= mouseY){
    //restartPlus = true; //可以直接把后文的boolean放这里（？
    instruction = false;
    dead = false;
    live = false;
    cx = 50;
    start = false;
  }
  //press continue button
  if (pass == true && 350 <= mouseX && mouseX <= 470 && 300 <= mouseY && mouseY <= 335) {
    cx = 50;
    pass = false;
  }
  
}

//mouse signal
function signal(mouseY) {
  noStroke()
  if (mouseIsPressed && mouseY <= 150 && start == true) {
    high = true;
    low = false;
    medium = false;
    if (horror == false){
      fill(255);
      textSize();
      text("UP!", mouseX, mouseY);
    }
  }else{
    if (mouseIsPressed && mouseY > 350 && start == true) {
      low = true;
      high = false;
      medium = false;
      if (horror == false){
        fill(255);
        textSize();
        text("DOWN!", mouseX, mouseY);
      }
    }else{
      if (mouseIsPressed && (150 < mouseY || mouseY <= 350) && start == true) {
      medium = true;
      high = false;
      low = false;
      if (horror == false){
        fill(255);
        textSize();
        text("BACK!", mouseX, mouseY);  
        if (cx > 0 && cx < 700) {
          back = true;
        }else{
          back = false;
       }
      }
      }
    }
  }
    
}

function planets() {
  noStroke();
  for (let i = 0; i <= 5; i++) {
    for (let j = dia[i]; j < Dia[i]; j += 10) {
      if (j >= 45) {
        if (planetColor[i] < 0.5) {
          fill(255, 215, 0, 20);
        } else {
          fill(77, 150, 29, 20);
        }
        circle(xRandom[i], yRandom[i], j);
      } else {
        fill(255, 30);
        circle(xRandom[i], yRandom[i], j);

        //randomly rotate the planets (inspired by Tiancheng Xie's Mini Project 4)
        push();
        translate(xRandom[i], yRandom[i]);
        if (planetAngle[i] < 1) {
          rotate(0);
        } else if (1 <= angle < 2) {
          rotate(PI / 2);
        } else if (2 <= angle < 3) {
          rotate(PI);
        } else if (3 <= angle < 4) {
          rotate((3 * PI) / 2);
        }

        //generate random "cores" of the planets
        if (core[i] < 0.3) {
          fill("red");
          rect(-7, -7, 14, 14);
        }
        if (core[i] >= 0.7) {
          fill("yellow");
          triangle(-5, 5, 0, -6, 5, 5);
        }
        if (0.3 <= core[i] < 0.5) {
          fill(255);
          circle(0, 0, 10);
        }
        pop();
      }
    }
  }
}

function randomStars() {
  fill(random(50, 255));
  for (k = 0; k <= 50; k++) {
    circle(random(width), random(height), random(1, 5));
  }
}

function Jiggle(showHorror) {
  if (mouseIsPressed) {
    for (let i = 0; i <= 5; i++) {
      let x = xRandom[i];
      let y = yRandom[i];
      let distToPlanet = dist(x, y, mouseX, mouseY);
      if (distToPlanet <= Dia[i] / 2) {
        xRandom[i] += random(-1, 1);
        yRandom[i] += random(-1, 1);
        horror = true;
        showHorror = 1;
        fill(255);
        text("HORROR!", mouseX, mouseY);
      }
    }
  }
  if (showHorror == 0){
    horror = false;
  }
}

function monitorScreen() {
  stroke(255);
  strokeWeight(3);
  line(25, 25, 120, 25);
  line(25, 25, 25, 120);
  line(775, 25, 680, 25);
  line(775, 25, 775, 120);
  line(25, 380, 25, 475);
  line(25, 475, 120, 475);
  line(775, 475, 775, 380);
  line(775, 475, 680, 475);
  noStroke();
  fill("red");
  circle(680, 65, 20);
  fill(255);
  textSize(30);
  text("REC", 695, 76);
  textSize(20);
  text("9/12/3046", 470, 73);
  if (start == true){
    text(frameCount/40, 583, 73);
  }
  
}

function yellowCurves() {
  if (mouseIsPressed && start == true) {
    mode = true;
    stroke("yellow");
    strokeWeight(2);
    noFill();
    for (let i = 0; i <= 40; i += 10) {
      curve(
        620 - i * 2,
        230 - i,
        685 - i * 2,
        240 - i,
        685 - i * 2,
        260 + i,
        620 - i * 2,
        270 + i
      );
    }
  }
}

function creatures(cy) {
  //randomly making the creatures
  let craftX = int(random(1, 5));
  let craftY = int(random(2, 6));
  let craftC2 = random(2);

  //the upper "wing"
  if (start == true){
    noStroke();
    for (let i = 0; i <= craftX; i++) {
      if (mode == true && high == true && horror == false) {
        fill("orange");
      } else {
        if ((mode == true && medium == true) || horror == true) {
          strokeWeight(1);
          stroke(255, 80);
          noFill();
        } else {
          if (craftC2 >= 1) {
            fill(craftC3, 200, 150);
          } else {
            fill(craftC1, craftC1 - 50, craftC1 + 30);
          }
        }
      }
      ellipse(50 - i * 9 + cx, 250 - i * 9 + cy + up + down, aX[i] + creatureUp/30 - down/30, aY[i] + creatureUp/30 - down/30);
    }
    //the lower "wing"
    for (let j = 0; j <= craftY; j++) {
      if (mode == true && low == true && horror == false) {
        fill("orange");
      } else {
        if ((mode == true && medium == true) || horror == true) {
          stroke(255, 80);
          noFill();
        } else {
          if (craftC2 >= 1) {
            fill(craftC3, 200, 150);
          } else {
            fill(craftC1, craftC1 - 50, craftC1 + 30);
          }
        }
      }
      ellipse(50 - j * 9 + cx, 250 + j * 9 + cy + up + down, bX[j] + creatureUp/30 - down/30, bY[j] + creatureUp/30 - down/30);
    }
  }
  }

function verticalMotion(cY) {
  if (mode == true && start == true && horror == false) {
    if (high == true && cY > 80) {
      up -= 1;
      creatureUp ++;
    }
    if (low == true && cY < 420) {
      down += 1;
    }
  }
}

function radar(cy, cY) {
  push();
  translate(800, 250);
  rotate(radians(radarAngle));

  let rectLength = 65 + sin(angle) * 40;
  let circleY = rectLength + 20;
  angle += 0.03;

  fill("gray");
  rect(-10, 30, 20, rectLength);
  fill("darkgray");
  arc(0, circleY+5, 50, 50, -7/6*PI-0.2, 1/3*PI-0.2);
  
  if (mode == true && signalX >= cx) {
    fill("black");
  } else {
    fill("orange");
  }
  circle(0, circleY + 13, 10);
  textSize(25);
  text("🦹‍", -17, circleY);
  if (dead == true) {
    stroke("red");
    strokeWeight(3);
    line(17, circleY - 15, -16, circleY);
    line(17, circleY, -16, circleY - 15);
  }

  pop();

  if (radarAngle >= 180 || radarAngle < 0) {
    angleChange = -angleChange;
  }
  radarAngle += angleChange;
}

function orangeBall(cY) {
  if (mode == true && signalX >= cx && start == true) {
    signalX -= 5;
    noStroke();
    fill("orange");
    circle(signalX, cY, 10);
  }
  if (signalX < cx) {
    mode = false;
    back = false;
    high = false;
    medium = false;
    low = false;
    signalX = 700;
  }
}

function horizontalMotion(cY) {
  if (cx <= 700 && back == false && start == true && horror == false) {
    cx += 1.2;
  }
  if (cx > 700 && (cY > 350 || cY < 150) && back == false && dead == false && live == false) {
    cx += 1.2;
    if (cx == 900) {
      cx = 50;
    }
    fill("gold");
    circle(800, 250, 200);
    pass = true;
  }

  if (cx >= 700 && 150 <= cY && cY <= 350 && pass == false) {
    if (fortune < 0.4) {
      // xxXxx will kill human beings after landing on the earth
      fill("darkred");
      circle(800, 250, 200);
      dead = true;
    } else {
      //xxXxx can live together with human beings
      wander = false;
      live = true;
      moreCreature(750, 0);
      moreCreature(720, -20);
      moreCreature(740, 50);
      moreCreature(745, -40);
      }
  }

  if (back == true && horror == false) {
    if (0 < cx < 700) {
      cx -= 2;
    }
  }
  if (cx <= 0 || cx >= 700) {
    back = false;
  }
}

//if human beings are killed, restart
function deadRestart(){
  if (dead == true){
    restart = true;
    fill(150, 300);
    rect(180, 130, 440, 240);
    fill(0);
    textSize(25);
    text("R E S U L T", 340, 185);
    fill("red");
    textSize(22);
    text("X has landed on the Earth.", 260, 230);
    text("Human beings are all killed by it.", 230, 280);
    noStroke();
    fill("orange");
    rect(355, 310, 100, 35);
    fill(0);
    textSize(25);
    text("Restart", 362, 337);
  }
}

//if live with human beings, restart
function liveRestart(){
  if (live == true){
    restart = true;
    fill(150, 300);
    rect(175, 135, 450, 255);
    fill(0);
    textSize(25)
    text("R E S U L T", 340, 178);
    fill("green");
    textSize(22);
    text("X has landed on the Earth.", 275, 220);
    text("Many other Xs come.", 300, 265);
    text("They all live with human beings together.", 185, 310);
    noStroke();
    fill("orange")
    rect(355, 335, 100, 35);
    fill(0);
    textSize(25);
    text("Restart", 362, 362);
  }
}

function passContinue(){
  if (pass == true){
    fill(150, 120);
    rect(180, 140, 440, 220);
    fill(255);
    textSize(20);
    text("X just passed the Earth.", 285, 180);
    text("The position of the Earth is marked.", 230, 225);
    text("It will come again later.", 285, 270);
    fill("orange");
    rect(350, 300, 120, 35);
    fill(0);
    textSize(25);
    text("Continue", 355, 327);    
  }
}