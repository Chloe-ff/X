let startButton, exitButton, instructionButton, closeButton;
let alienImage, signalImage;
let earthX, earthY;
let otherPlanetX, otherPlanetY;
let otherPlanetColor;
let showInstructions = false; // A flag to control when the instruction panel is visible
let alienX;
let alienY;
let questions = [];
let currentQuestion = 0;
let choicesMade = [];
let showEnding = false;
let showAlien = false; // Flag to show the alien after allowing landing
let stars = [];
let gameStarted = false;


function preload() {
  alienImage = loadImage("alien.png"); // Ensure this image is in the correct path
  signalImage = loadImage("signal.png"); // Ensure this image is in the correct path
  font = loadFont("Lobster.otf");
}

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent("p5-canvas-container");
  
  textAlign(CENTER, CENTER);

  alienX = random(300, 400);
  alienY = random(300, 400);

  // Randomize planets
  randomizePlanets();

  // Create stars
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(150, 255),
      twinkleSpeed: random(0.01, 0.03),
    });
  }

  // Buttons
  createButtons();

  // !!Initialize questions
  initializeQuestions();

  // !!Initialize stars for the first time
  //initializeStars();
}

function draw() {
  background(0); // Black space background

  // Draw twinkling stars
  for (let star of stars) {
    star.brightness += sin(frameCount * star.twinkleSpeed);
    fill(255, star.brightness);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }

  // Check if game started
  if (!gameStarted) {
    drawSun(130, 130, 100); // !!position x, y, and size
    drawPlanets(); //!!
    showStartScreen();
  } else {
    if (showInstructions) {
      showInstructionsPanel();
    } else {
      showGameScreen();
    }
  }
  if (showInstructions) {
    showInstructionsPanel();
  }
  
  if (choicesMade.length > 0){
    //console.log(showAlien);
    if (choicesMade[0] ==  "Yes. I want to invite them"){
      showAlien = true;
    }
  }
  
  // Draw the alien (if allowed)
  if (showAlien && alienImage && gameStarted == true) {
    image(alienImage, width / 2 - 50, 450, 100, 100); // Alien image near Earth
  }
}

// Create buttons
function createButtons() {
  startButton = createButton("Start");
  startButton.position(width / 2 - 50, height / 2 + 200);
  startButton.size(100, 40);
  startButton.style("background-color", "green");
  startButton.style("color", "white");
  startButton.style("font-size", "20px");
  startButton.mousePressed(startGame);

  exitButton = createButton("Exit");
  exitButton.position(width / 2 + 150, height / 2 + 200);
  exitButton.size(100, 40);
  exitButton.style("background-color", "red");
  exitButton.style("color", "white");
  exitButton.style("font-size", "20px");
  exitButton.mousePressed(exitGame);

  instructionButton = createButton("Instructions");
  instructionButton.position(width / 2 - 270, height / 2 + 200);
  instructionButton.size(130, 40);
  instructionButton.style("background-color", "blue");
  instructionButton.style("color", "white");
  instructionButton.style("font-size", "20px");
  instructionButton.mousePressed(showInstructionPanel);
}

// Show the starting screen
function showStartScreen() {
  showAlien = false;
  // Title
  textSize(80);
  textFont(font);
  fill(255, 165, 0);
  text("Alien Encounter", width / 2+90, 80);

  // Intro text
  textSize(20);
  textFont("Courier New");
  fill(255);
  stroke(5);
  text(
    "You have received a signal from extraterrestrial life.",
    width / 2,
    270
  );
  text("Will you invite them to Earth or reject the unknown?", width / 2, 300);

  stroke(0);
  // Draw signal image
  image(signalImage, width / 2 - 250, 350, 100, 100);
}

// Show the game screen (questions and choices)
function showGameScreen() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];

    fill(0, 0, 0, 150); // Transparent box for better readability
    rect(50, 100, width - 100, 200, 20);

    textSize(23);
    fill(255);
    text(q.question, width / 2, 180);

    // Draw choices
    textSize(22);
    fill(255);
    text("1. " + q.choices[0].option, width / 2, 310);
    text("2. " + q.choices[1].option, width / 2, 380);
  } else {
    // Show ending panel
    showEndingPanel();
  }
}

// !!Function to randomize planet positions and colors
function randomizePlanets() {
  earthX = random(300, 500);
  earthY = random(250, 400);
  otherPlanetX = random(600, 750);
  otherPlanetY = random(100, 300);
  otherPlanetColor = color(random(255), random(255), random(255));
}

// !!Initialize questions
function initializeQuestions() {
  questions = [
    {
      question: "Do you want to invite the aliens to land on Earth?",
      choices: [
        { option: "Yes. I want to invite them", next: 1 },
        { option: "No. they might bring danger", next: 2 },
      ],
    },
    {
      question:
        "The aliens offer to help resolve conflicts on Earth. \n Will you accept their intervention?",
      choices: [
        { option: "Yes. Many conflicts can't be well resolved by human", next: 3 },
        { option: "No. They will aggravate the conflict", next: 4 },
      ],
    },
    {
      question:
        "The aliens have advanced knowledge about interstellar \n exploration. Do you want to learn?",
      choices: [
        { option: "Yes. We need to learn interstellar exploration from them", next: 5 },
        { option: "No. Their knowledge might be wrong", next: 6 },
      ],
    },
    {
      question:
        "The aliens propose a partnership for sustainable \n resources. Do you accept?",
      choices: [
        { option: "Yes. Human beings can't solve sustainable resources", next: 7 },
        { option: "No. They will make the resources more unsustainable", next: 8 },
      ],
    },
    {
      question:
        "The aliens warn you of an impending disaster. \n Do you believe them?",
      choices: [
        { option: "Yes. I'm very afraid of it", next: 9 },
        { option: "No. They are scaring us", next: 10 },
      ],
    },
    {
      question:
        "You decided to trust the aliens, and they helped \n humanity flourish. Do you regret your choice?",
      choices: [
        { option: "Yes. Actually, human society could be more fluorish", next: 11 },
        { option: "No. I'm very grateful for their help", next: 12 },
      ],
    },
    {
      question:
        "Your decision not to accept their help led to \n turmoil. Do you think you could have changed your choice?",
      choices: [
        { option: "Yes. I need to solve the turmoil", next: 13 },
        { option: "No. I still should not accept their help", next: 14 },
      ],
    },
    {
      question:
        "The aliens offer to share their knowledge about \n AI. Do you want to accept their offer?",
      choices: [
        { option: "Yes. By having their knowledge of AI, \n the development could be more efficient", next: 15 },
        { option: "No. They might provide wrong knowledge of AI", next: 16 },
      ],
    },
    {
      question:
        "You've accepted the alien's offer to help with \n disease control. Humanity thrives as a result.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
    {
      question:
        "You chose to be cautious. Unfortunately, conflict \n erupted, leading to Earth's division.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
    {
      question:
        "You chose to learn from the aliens. Humanity \n is now an interstellar civilization.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
    {
      question:
        "Your rejection led to conflict. The aliens \n invade Earth instead.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
    {
      question:
        "You chose to believe the aliens' warning, \n and humanity prepared for the disaster.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
    {
      question:
        "You rejected the aliens' help and Earth faced \n dire consequences.",
      choices: [
        { option: "End", next: 100 },
        { option: "End", next: 100 },
      ],
      ending: true,
    },
  ];
}

// Start the game
function startGame() {
  gameStarted = true;
  showInstructions = false; //!!
  showEnding = false; //!!
  currentQuestion = 0;
  choicesMade = [];
  startButton.hide();
}

// !!Handle key press for making choices
function keyPressed() {
  if (keyCode === ESCAPE) {
    exitGame();
  } else if (key >= "1" && key <= "9") {
    let index = parseInt(key) - 1;
    if (
      currentQuestion < questions.length &&
      index < questions[currentQuestion].choices.length
    ) {
      choicesMade.push(questions[currentQuestion].choices[index].option); // Record choice
      currentQuestion = questions[currentQuestion].choices[index].next; // Go to the next question
      if (currentQuestion < questions.length) {
        if (currentQuestion === 1) showAlien = true; // Show alien if the first question is answered positively
        showQuestion(); // Show the next question
      } else {
        showEnding = true; // Show ending panel
      }
    }
  }
}

// !!Show the ending panel with summary
function showEndingPanel() {
  fill(0, 0, 0, 200); // Semi-transparent background
  rect(100, 100, width - 200, height - 200, 20); // Rounded rect for the ending panel

  textSize(45);
  fill(200, 100, 0);
  textFont(font);
  text("Game Summary", width / 2, 100);

  textFont("Courier New");
  textSize(20);
  fill(255);
  text("You made the following choices:", width / 2, 180);

  for (let i = 0; i < choicesMade.length; i++) {
    text(`${i + 1}: ${choicesMade[i]}`, width / 2, 220 + i * 30);
  }

  // Show conclusion based on choices made
  let conclusion =
    currentQuestion > questions.length
      ? "Earth's future has been shaped by your decisions. \n The story of humanity will never be the same."
      : "Your reluctance has changed Earth's trajectory. \n The future remains uncertain.";

  text(conclusion, width / 2, height - 200);
}

// Exit game function to reset
function exitGame() {
  gameStarted = false;
  showInstructions = false;
  showEnding = false;
  startButton.show();
  alienLanded = false;
  choicesMade = [];
  currentQuestion = 0;
}

// Show the instruction panel
function showInstructionPanel() {
  showInstructions = true;

  // Create a close button within the instruction panel
  closeButton = createButton("Close");
  closeButton.position(width / 2 - 50, height / 2 + 200);
  closeButton.size(100, 40);
  closeButton.style("background-color", "gray");
  closeButton.style("color", "white");
  closeButton.style("font-size", "20px");
  closeButton.mousePressed(closeInstructionPanel);
}

// Function to close the instruction panel
function closeInstructionPanel() {
  showInstructions = false;
  closeButton.remove(); // Remove the close button
}

// Function to display the instructions panel
function showInstructionsPanel() {
  fill(0, 0, 0, 200); // Semi-transparent black background
  rect(15, 170, width - 30, 300, 20); // Rounded rect for the panel

  textSize(30);
  fill(200, 100, 0);
  text("Game Instructions", width / 2, 220);

  textSize(20);
  fill(255);
  text("1. You are receiving a mysterious signal from space.", width / 2, 270);
  text(
    "2. You will decide whether to invite the aliens or reject them.",
    width / 2,
    300
  );
  text("3. Press 1 or 2 on the keyboard to do the decision.", width / 2, 330)
  text("4. The fate of humanity depends on your choice!", width / 2, 360);
  text("5. Each decision will lead to a different outcome.", width / 2, 390);
  text("6. Be mindful of the consequences of your actions.", width / 2, 420);
}

// Function to randomize planet positions and colors
function randomizePlanets() {
  // Randomize Earth's position (within reasonable bounds)
  earthX = random(300, 500);
  earthY = random(250, 400);

  // Randomize other planet's position (within reasonable bounds)
  otherPlanetX = random(600, 750);
  otherPlanetY = random(100, 300);

  // Randomize the color of the other planet
  otherPlanetColor = color(random(255), random(255), random(255));
}

function showQuestion() {
  fill(0, 0, 0, 200); // Semi-transparent background
  rect(100, 100, width - 200, height - 200, 20); // Rounded rect for the question panel

  textSize(30);
  fill(200, 100, 0);
  text("Question", width / 2, 140);

  textSize(20);
  fill(255);
  text(questions[currentQuestion].question, width / 2, 180);

  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let choice = questions[currentQuestion].choices[i];
    textSize(18);
    fill(255);
    text(`${i + 1}: ${choice.option}`, width / 2, 220 + i * 30);
  }
}

//!!
function drawPlanets() {
  // Draw Earth
  fill(0, 102, 204);
  ellipse(earthX, earthY, 150, 150); // Earth

  // Draw another planet at random position with random color
  fill(otherPlanetColor);
  ellipse(otherPlanetX, otherPlanetY, 100, 100); // Another planet

  // // Draw the alien (if allowed)
  // if (showAlien && alienImage) {
  //   image(alienImage, alienX, alienY, 100, 100); // Alien image near Earth
  // }

  // Draw signal image if it's visible
  if (currentQuestion === 0 && gameStarted == true) {
    image(signalImage, width / 2 - 50, 350, 100, 100);
  }
}

function drawSun(x, y, radius) {
  noStroke();
  for (let r = radius * 2; r > radius-50; r -= 8) {
    fill(255, 204, 0, map(r, radius, radius * 2, 0, 100));
    ellipse(x, y, r, r);
  }
  fill(255, 204, 0);
  ellipse(x, y, radius, radius);

  for (let i = 0; i < 8; i++) {
    let flareX = x + random(-radius * 1.5, radius * 1.5);
    let flareY = y + random(-radius * 1.5, radius * 1.5);
    let flareSize = random(5, 15);
    fill(255, random(100, 200), 0, 150);
    ellipse(flareX, flareY, flareSize, flareSize);
  }
}