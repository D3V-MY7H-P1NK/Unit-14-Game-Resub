var gameStarted = false;
var instructions = false;
var setup_game = false;
var change_character = false;
var options = false;
var mainscreen = true;
var game_end = false;
var total_score = 0;
var bgImg;
var player;
var playerImg;
var wallsImg;
var size;
var correct;
var tries;
var playerSpeed = 5;
var jump;
var questions;
var round;
var logo;

let MENU = 0
var img2;
var shownScreen;
var playbutton;

let correctWav;
let bgWav;
var question;
var check;
var correct_incorrect;
var wrong = 0;
var score = 0;
var answerMOD = 1.5;

// Read cookies and return value they hold
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return 0
}

// Read specific Cookie for Value
var cookie_high_score = parseInt(readCookie('high_score'));

if (cookie_high_score == 0) {
  // Create High Score Cookie if they haven't already
  console.log('High Score Cookie Not Present. Ooooof :/ \nCreating Cookie Now :)')
  document.cookie = "high_score=" + total_score + "; expires=Tue, 1 Feb 2022 12:00:00 UTC";
  cookie_high_score = parseInt(readCookie('high_score'));
}

function preload() {
  // Load Images
  img2 = loadImage("assets/images/menu_screen.jpg");
  playerImg = loadImage("assets/images/player.png");
  groundImg = loadImage("assets/images/floor.jpg");
  bouldersImg = loadImage("assets/images/b_rock.png");
  winImg = loadImage("assets/images/trophy.png");
  game_name = loadImage("assets/images/menu/game_name.png");
  game_ss = loadImage("assets/images/blur_game_ss.jpg");
  arrowImg = loadImage("assets/images/arrow.png")

  // Load Sounds
  bell_1 = loadSound("assets/sounds/Correct_bell.mp3") // Correct Bell
  bell_2 = loadSound("assets/sounds/Incorrect_bell.mp3") // Incorrect Bell

  // Load Unlockable Animals
  camel = loadImage("assets/images/animals/camel.png");
  cat = loadImage("assets/images/animals/cat.png");
  chipmunk = loadImage("assets/images/animals/chipmunk.png");
  cow = loadImage("assets/images/animals/cow.png");
  deer = loadImage("assets/images/animals/deer.png");
  dog = loadImage("assets/images/animals/dog.png");
  dragon = loadImage("assets/images/animals/dragon.png");
  elephant = loadImage("assets/images/animals/elephant.png");
  goat = loadImage("assets/images/animals/goat.png");
  horse = loadImage("assets/images/animals/horse.png");
  lizard = loadImage("assets/images/animals/lizard.png");
  llama = loadImage("assets/images/animals/llama.png");
  monkey = loadImage("assets/images/animals/monkey.png");
  pig = loadImage("assets/images/animals/pig.png");
  poodle = loadImage("assets/images/animals/poodle.png");
  skunk = loadImage("assets/images/animals/skunk.png");
  swan = loadImage("assets/images/animals/swan.png");
  tiger = loadImage("assets/images/animals/tiger.png");
  turtle = loadImage("assets/images/animals/turtle.png");
  water_buffalo = loadImage("assets/images/animals/water-buffalo.png");
}

function Question() {

  var options = [" + ", " - ", " / ", " x "]

  while (answerMOD !=0)  {

    x = Math.floor((Math.random() * 10) + 1);
    y = Math.floor((Math.random() * 100) + 1);

    var tempanswer = y / x
    answerMOD = tempanswer%2

  }

  answerMOD = 1.5;

  if (total_score <= 2 && total_score >= 0) {
    question = "Question : " + y + options[0] + x;
    answer = y + x;
  } else if (total_score >= 3 && total_score <= 6) {
    question = "Question : " + y + options[1] + x;
    answer = y - x;
  } else if (total_score >= 7 && total_score <= 10) {
    question = `Question : ${y}${options[2]}${x}`;
    answer = y / x;
  } else if (total_score >= 11 && total_score <= 14) {
    question = "Question : " + y + options[3] + x;
    answer = y * x;
  } else if (total_score >= 15) {
    random_opt = Math.floor((Math.random() * 3))
    question = "Question : " + y + options[random_opt] + x;

    if (random_opt == 0) {
      answer = y + x;
    } else if (random_opt == 1) {
      answer = y - x;
    } else if (random_opt == 2) {
      answer = y % x;
    } else if (random_opt == 3) {
      answer = y * x;
    }
  
  }

  return question;
}

// Functions for buttons
function submit(button) {
  name = input.value();
  if (name == answer) {
    check = 1
    bell_1.play();
  } else if (name != answer) {
    check = 2
    bell_2.play();
  }

  input.value('');
  round = true
}
function exitbutton(exit_button) {
  change_character = false;
  mainscreen = true;
  options = false;
  removeElements();
}
function ani1(animal_button) {
  if (cookie_high_score < 5) {
    alert('You have not unlocked the Camel yet :( \n\nYou need a total high score of 5 to unlock this.');
  } else if (cookie_high_score >= 5) {
    alert("Camel Selected and applied to your character.");
    player.addImage(camel)
  } else {
    alert('Error. Contact an Adminstrator.');
  }
}
function ani2(animal_button2) {
  if (cookie_high_score < 10) {
    alert('You have not unlocked the Cat yet :( \n\nYou need a total high score of 10 to unlock this.');
  } else if (cookie_high_score >= 10) {
    alert("Cat Selected and applied to your character.");
    player.addImage(cat);
  } else {
    alert('Error. Contact an Adminstrator.');
  }
}
function ani3(animal_button3) {
  if (cookie_high_score < 20) {
    alert('You have not unlocked the Chipmunk yet :( \n\nYou need a total high score of 20 to unlock this.');
  } else if (cookie_high_score >= 20) {
    alert("Chipmunk Selected and applied to your character.");
    player.addImage(chipmunk);
  } else {
    alert('Error. Contact an Adminstrator.');
  }
}
function ani4(animal_button4) {
  if (cookie_high_score < 30) {
    alert('You have not unlocked the Cow yet :( \n\nYou need a total high score of 30 to unlock this.');
  } else if (cookie_high_score >= 30) {
    alert("Cow Selected and applied to your character.");
    player.addImage(cow);
  } else {
    alert('Error. Contact an Adminstrator.');
  }
}
function ani5(animal_button5) {
  if (cookie_high_score < 40) {
    alert('You have not unlocked the Deer yet :( \n\nYou need a total high score of 40 to unlock this.');
  } else if (cookie_high_score >= 40) {
    alert("Deer Selected and applied to your character.");
    player.addImage(deer);
  } else {
    alert('Error. Contact an Adminstrator.');
  }
}

function setup() {
  createCanvas(1500, 600);
  background(0);

  // Game Logo
  logo = createSprite(830, 200);
  logo.addImage(game_name);

  // Ground Info
  groundImg.resize(4000, 100);
  ground = createSprite(115, 580, 2000, 50);
  ground.addImage(groundImg);

  // ARROW Showing way to go for next level
  arrow = createSprite(1285, 450);
  arrow.addImage(arrowImg);

  // Player Info
  playerImg.resize(100, 100);
  player = createSprite(50, 505);
  player.addImage(playerImg);

  // Rock Info
  bouldersImg.resize(200, 200);

  bou1 = createSprite(300, 450);
  bou1.addImage(bouldersImg);

  bou2 = createSprite(460, 450);
  bou2.addImage(bouldersImg);

  bou3 = createSprite(620, 450);
  bou3.addImage(bouldersImg);

  bou4 = createSprite(780, 450);
  bou4.addImage(bouldersImg);

  //winImg.resize(300,300)
  //winner = createSprite(1285,450);
  //winner.addImage(winImg);

  round = true;
  mainscreen = true;

}

function draw() {

  if (mainscreen === true) {
    clear();
    background("black");
    fill(255);
    drawSprite(logo);
    textSize(20);
    text("Press RETURN TO START", width / 2 - 60, height / 2);
    text("Press SHIFT FOR INSTRUCTIONS", 650, 350);
    text("Press P TO CHANGE CHARACTER", 650, 400);
  }

  if (game_end === true) {
    clear();
    background('black');
    textSize(20);
    fill("Red");
    text("GAME OVER", 730, height / 2);

    fill(255);
    feed = "YOU GOT " + str(total_score) + " QUESTIONS CORRECT :)";
    text(feed, 650, height / 2 + 60);

    text("PRESS ENTER TO RETURN TO THE MAIN MENU", 615, 500)

  gameStarted = false;
}

  if (instructions === true) {
    background(game_ss);
    textSize(30);
    fill("white");
    text("Instructions", width / 2, 50)
    textSize(15);

    fill("White");
    text("⚪ This box at the top of your screen is used to enter your answers in for the question asked. Click submit when you are sure of your answer.", 50, 200)
    text("⚪ In order to gain points to unlock different animals you need to answer the questions you are given correctly and beat your high score.", 50, 250)


    text("Press ENTER TO RETURN TO MAIN MENU", 620, 550)
  }

  if (change_character === true) {
    background(game_ss);
    textSize(30);
    fill(255);
    text("Characters", width / 2, 50)
    textSize(20);

    cookie_high_score = readCookie("high_score");

    exit_button = createButton('Return To Main Menu');
    exit_button.position(width / 2, 500);
    exit_button.mousePressed(exitbutton);


    animal1 = createSprite(100, 90);
    animal1.addImage(camel);
    drawSprite(animal1);
    text("Camel", 90, 150)
    animal_button = createButton('Select');
    animal_button.position(90, 170);
    animal_button.mousePressed(ani1)

    animal2 = createSprite(240, 90);
    animal2.addImage(cat);
    drawSprite(animal2);
    text("Cat", 220, 150)
    animal_button2 = createButton('Select');
    animal_button2.position(210, 170);
    animal_button2.mousePressed(ani2)

    animal3 = createSprite(400, 80);
    animal3.addImage(chipmunk);
    drawSprite(animal3);
    text("Chipmunk", 350, 150)
    animal_button3 = createButton('Select');
    animal_button3.position(365, 170);
    animal_button3.mousePressed(ani3)

    animal4 = createSprite(560, 80);
    animal4.addImage(cow);
    drawSprite(animal4);
    text("Cow", 550, 150)
    animal_button4 = createButton('Select');
    animal_button4.position(545, 170);
    animal_button4.mousePressed(ani4)

    animal5 = createSprite(1050, 80);
    animal5.addImage(deer);
    drawSprite(animal5);
    text("Deer", 1030, 150)
    animal_button5 = createButton('Select');
    animal_button5.position(1024, 170);
    animal_button5.mousePressed(ani5)

    fill('#FFC000');
    text("More Animals Coming Soon", 700, 450);
  }

  if (gameStarted === true) {
    if (setup_game === true) {
      input = createInput();
      button = createButton('submit');
      setup_game = false;
    }

    // Load Sprites In The Game
    background(img2);
    drawSprite(ground);
    drawSprite(player);

    fill(255);
    text("Next Level", 1220, 430);
    drawSprite(arrow);


    drawSprite(bou1);
    drawSprite(bou2);
    drawSprite(bou3);
    drawSprite(bou4);

    input.position(730, 65);
    button.position(input.x + input.width, 65);

    if (round == true) {
      question = Question();
      round = false;
    }

    if (player.position.y > 580) {
      console.log("OUT OF BOUNDS");
      player.position.y = 505;
      player.position.x = 100;
    }

    button.mousePressed(submit);

    if (check == 1) {
      fill('green');
      check = 'Correct';
      score = score + 1;
      total_score = total_score + 1;

      if (score == 1) {
        bou1.position.y = 1000;
      } else if (score == 2) {
        bou2.position.y = 1000;
      } else if (score == 3) {
        bou3.position.y = 1000;
      } else if (score == 4) {
        bou4.position.y = 1000;
        score = 0
      }
    } else if (check == 2) {
      fill('red');
      tries = tries - 1;
      if (tries <= 0) {
            // Manage Cookie
        if (cookie_high_score < total_score) {
          alert("New Score is bigger. Congrats :)");
          document.cookie = "high_score=" + total_score + "; expires=Tue, 1 Feb 2022 12:00:00 UTC";
          cookie_high_score = readCookie("high_score");
        } else if (cookie_high_score >= total_score) {
          console.log('Score is same or lower than top high score :( \nHigh Score Cookie has not been updated');
        } else {
          alert('Error. Contact an Adminstrator.');
        }
        game_end = true;
      }
      check = 'Incorrect'
    }

    if (bou4.position.y === 1000) {
      fill("Orange");
      textSize(50);
      text("Please move to the next level -->", 400, height/2);
    }

    fill("white");
    // Display Correct or False
    textSize(20)
    text(check, 730, 120);

    // Displays Question on screen
    textSize(20);
    text(question, 730, 32);

    // Displays Users High Score that is stored in the cookie
    let hs = 'Your High Score: ' + cookie_high_score;
    fill('#F9E03E');
    textSize(15);
    text(hs, 10, 20);


    // Displays Users Score
    let s = 'Score: ' + int(total_score);
    fill('white');
    textSize(15);
    text(s, 10, 40);

    // Displays Users Trys Left
    let t = 'Tries: ' + int(tries);
    fill('red');
    textSize(15);
    text(t, 10, 60);

    player.collide(bou1);
    player.collide(bou2);
    player.collide(bou3);
    player.collide(bou4);

    // gravity
    player.position.y += playerSpeed;

    if (player.position.x >= 1220 && bou4.position.y == 1000) {
      bou1.position.y = 450;
      bou2.position.y = 450;
      bou3.position.y = 450;
      bou4.position.y = 450;
      player.position.x = 100;
    }

    // Gravity Jump
    if (player.collide(ground)) {
      jump = false;
    }
    else {
      playerSpeed++;
    }

    keyboardCode()
  }
}

function keyboardCode() {

  if (keyIsDown(LEFT_ARROW) && gameStarted == true) {
    player.position.x -= 5;
    player.mirrorX(1);
  }

  if (keyIsDown(RIGHT_ARROW) && gameStarted == true) {
    player.position.x += 5;
    player.mirrorX(-1);
  }

  if (keyIsDown(UP_ARROW) && keyIsPressed === true && jump === false && gameStarted == true) {
    jump = true;
    player.position.y -= 10;
    playerSpeed = -20;
    //player.position.y -= 5;
  }

  if (keyIsDown(DOWN_ARROW) && gameStarted == true) {
    player.position.y += 5;
  }

}

function keyPressed() {

  if (keyCode === RETURN && gameStarted == false && options == false && game_end == false && instructions == false) {
    mainscreen = false;
    setup_game = true;
    gameStarted = true;
    clear();
    logo.position.y = 1000;
    tries = 5;
    total_score = 0;
    bou4.position.y = 1000;
    player.position.x = 1220;
    score = 0;
  }

  if (keyCode === RETURN && game_end == true) {
    clear();
    game_end = false;
    mainscreen = true;
    logo.position.y = 200;
  }

  if (keyCode ===  RETURN && instructions == true) {
    clear();
    instructions = false;
    mainscreen = true;
    logo.position.y = 200;
  }

  if (keyCode === 16 && gameStarted == false) {
    clear();
    mainscreen = false;
    setup_game = true;
    instructions = true;
  }

  if (keyCode === 80 && gameStarted == false) {
    mainscreen = false;
    options = true;
    clear();
    setup_game = true;
    change_character = true;
  }
}