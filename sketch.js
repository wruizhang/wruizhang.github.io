var canvas;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

let stars = [];


//intro page
let decor_positions = [20];
let show_intro_graphic = true;

let center = [];
let diameter;
let radius;
let rot_angle;

let center_outdoor = [];
let radius_outdoor;
let line_length_outdoor;
let bg_img;
let bg_opacity;
let overlayColor;


// Q2(Feather) related vars 
let rescaleFeatherPos = true;
//let xCoords = [];

let xSet1 = false;
let xSet2 = false;
let xCoords1 = [];
let xCoords2 = [];
let xIndex = [];
let xPos = [];
let yPos = [];
let yPosIncrement = [];
let prevCenterY = 1;
let currentCenterY = 1;
let dyScale = currentCenterY/prevCenterY;

// final viz image
let recenter_image = false;

// # of words per line
let WORDCOUNT = 6;

// when to resize canvas
let changeCanvasSize = false;
let changeCanvasOnWindowResize = false;

let animal_character = {
  radius: 0, 
  height: 0,
  top: []
};

let human_character = {
  radius: 0, 
  height: 0,
  top: []
};

let adult_character = {
  radius: 0, 
  height: 0,
  top: []
};
 
let teen_character = {
  radius: 0, 
  height: 0,
  top: []
};

let child_character = {
  radius: 0, 
  height: 0,
  top: []
};

let baby_character = {
  radius: 0, 
  height: 0,
  top: []
};

let male_char = {
  center:[],
  radius: 0, 
  diameter: 0,
  count: 4
};

let female_char = {
  center:[],
  radius: 0, 
  diameter: 0,
  count: 4
};

let other_char = {
  center:[],
  radius: 0, 
  diameter: 0
};

let familiar_char = {
  btm_center:[],
  width: 0, 
  height: 0
};


function setup() {
   // set initial canvas size based on browser window
  if(windowHeight < 300){
    canvasHeight = windowHeight*2.2;
  } else if(windowHeight < 400){
    canvasHeight = windowHeight*1.8;
  } else if (windowHeight < 500){
    canvasHeight = windowHeight*1.6;
  } else if (windowHeight < 600){
    canvasHeight = windowHeight*1.4;
  }  else if(windowHeight < 800){
    canvasHeight = windowHeight*1.1;
  } 

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1"); //("0")
  bg_img = loadImage('../images/dreams_bg.png');
  bg_opacity = 0;
  overlayColor = color(0, 0, 0, 0);
  

  center = [1*canvasWidth/3, canvasHeight/3];
  diameter = (canvasWidth + canvasHeight)/8.5;
  radius = diameter/2;
  rot_angle = PI/3;
  line_length_outdoor = 0;
  //generate_random_coords();


  // feather positions
  //xCoords = [center[0], center[0]-radius/4*sin(PI/2), center[0]+radius/4*sin(PI/2)];

  //Q1 indoor or ambiguous
  xCoords1 = [center[0], center[0]-radius*sin(PI/6), center[0]+radius*sin(PI/6)];
  //Q1 outdoor or no setting
  xCoords2 = [center[0], center[0]-radius/4*sin(PI/2), center[0]+radius/4*sin(PI/2)];
  prevCenterY = center[1];
  currentCenterY = center[1];

  for (let i = 0; i < 13; i++){
    yPosIncrement[i] = random(1.1*radius, 2.2*radius);
    yPos[i] = center[1] + yPosIncrement[i];
  }

  // generate some stars
  for (let i = 0; i < 300; i++) {
    stars[i] = new Star(random(width), random(height/2), random(230, 255), random(2, 8), random(1), random(0.25,2.5), random(TAU));
  }
  //  noCursor();
}

function draw() {
    // change canvas size for q1-last
    if(changeCanvasSize){
      resizeMyCanvas();
      // canvasWidth = window.innerWidth;
      // canvaHeight = window.innerHeight;
      changeCanvasSize = false;
    }
  
  // set the position of the visualization
  center = [1*canvasWidth/3, canvasHeight/3];  //1.8
  diameter = (canvasWidth + canvasHeight)/8.5;   //8
  radius = diameter/2;
  line_length_outdoor = 1.5*radius;

  background(bg_img);
  animateBackground();


  if(recenter_image){
    // final Viz if there is no dream text
    center = [canvasWidth/2, canvasHeight/3];
  } else if(!recenter_image && !show_final_viz){
    center = [1.1*canvasWidth/3, canvasHeight/3];  
  } else{
    // if user included text description of their dream
    center = [1.2*canvasWidth/3, canvasHeight/3]; // prev 1.3
  }

  if(!hideStars){
      for (let i = 0; i < stars.length; i++) {
        stars[i].twinkle();
        stars[i].showStar();
    } 
  }

  if (rescaleFeatherPos){
    if(xSet1){
      xCoords1 = [center[0], center[0]-radius*sin(PI/6), center[0]+radius*sin(PI/6)];
    } else {
      xCoords2 = [center[0], center[0]-radius/4*sin(PI/2), center[0]+radius/4*sin(PI/2)];
    }
    prevCenterY = currentCenterY;
    currentCenterY = center[1] + 20;
    dyScale = currentCenterY/prevCenterY;
    for (let i = 0; i < 13; i++){
      yPosIncrement[i] *= dyScale;
      yPos[i] = center[1] + yPosIncrement[i];
    }

    rescaleFeatherLoc = false;
  }




   // styling thee cursor
  //  fill(255);
  //  strokeWeight(2);
  //  ellipse(mouseX ,mouseY, 30, 30);
  //  strokeWeight(1.5);



  //Show q1 viz (Settings)
  if (show_q1){
     if(user_choices1[0] == 1){
        indoorViz();
        xSet1 = true;
     } else if (user_choices1[0] == 2){
        outdoorViz();
        xSet2 = true;
     } else if (user_choices1[0] == 3){
        ambiguousViz();
        xSet1 = true;
     } else if (user_choices1[0] == 4){
        noSettingViz();
        xSet2 = true;
     }
     //rescaleFeatherPos = true;
  }

  if (show_q2){
    if(xSet1){
      for (i = 0; i < imgs2.length; i++) {
        let j = xIndex[i];
        xPos[i] = xCoords1[j];
        image(imgs2[i], xPos[i]-imgs2[i].width/30, yPos[i], imgs2[i].width/15, imgs2[i].height/15);
      }
    } else {
      for (i = 0; i < imgs2.length; i++) {
        let k = xIndex[i];
        xPos[i] = xCoords2[k];
        image(imgs2[i], xPos[i]-imgs2[i].width/30, yPos[i], imgs2[i].width/15, imgs2[i].height/15);
      }

    }
    //rescaleFeatherLoc = true;
  }

  //Show q3 viz (Characters)
  if (show_q3) {
    strokeWeight(1.5);
    stroke('#faebd7');
    for (let e of user_choices3){
      if (e === 1){   //animal
        animalCharViz();
      } else if (e === 2){  
        humanCharViz();
      } else if (e === 3){  
        maleCharViz();
      } else if (e === 4){  
        femaleCharViz();
      } else if (e === 5){  
        otherCharViz();
      } else if (e === 6){
        adultCharViz();
      }  else if (e === 7){
        teenagerCharViz();
      } else if (e === 8){
        childCharViz();
      }else if (e === 9){
        babyCharViz();
      }else if (e === 10){
        familiarCharViz();
      }else if (e === 11){
        unfamiliarCharViz();
    }
  }
}

  //Show q4 viz (Emotions)
  if (show_q4){
    strokeWeight(1.5);
    //stroke('#faebd7');
    for (let e of user_choices4){
      if (e === 1){
        noFill();
        strokeWeight(1.2);
        stroke('#f998dd');// stroke(100, 200, 25);
        drawRotatingCircles(center, radius, 0, PI/20, 40);
      } else if (e === 2){
        noFill();
        strokeWeight(1.2);
        stroke('#8f84af');//stroke(200, 25, 150);
        drawRotatingCircles(center, radius, 0, PI/16, 32);
      } else if (e === 3){
        noFill();
        strokeWeight(1.2);
        stroke('#f0534c');//stroke(20, 225, 150);
        drawRotatingCircles(center, radius, 0, PI/10, 20);
      } else if (e === 4){
        noFill();
        strokeWeight(1.2);
        stroke('#1f3a92'); //stroke(150, 20, 60);
        drawRotatingCircles(center, radius, 0, PI/12, 24);
      } else if (e === 5){
        noFill();
        strokeWeight(1.2);
        stroke('#487ea0');  //stroke(255, 150, 150);
        drawRotatingCircles(center, radius, 0, PI/8, 16);
      }
    }
  }


  if(add_dream_text){
    noStroke();
    fill('#faebd7');
    textSize(16);
    textFont("Gill Sans");
   // text(dream_entry, 1.9*canvasWidth/3, canvasHeight/3);
    let remainingText = dreamTextArray.length % WORDCOUNT;
    console.log(remainingText);
    let line_count = (dreamTextArray.length - remainingText)/WORDCOUNT;
    console.log(line_count);
    let currentIndex = 0;
    for(let i = 0; i < line_count; i++){
      let dream_text = generateTextLine(dreamTextArray, i*WORDCOUNT, WORDCOUNT);
      currentIndex += WORDCOUNT;
      text(dream_text, 1.8*canvasWidth/3, canvasHeight/3 + 20*i);
    }
    
    if (remainingText > 0){
      let d_text = generateTextLine(dreamTextArray, currentIndex, remainingText);
      text(d_text, 1.8*canvasWidth/3, canvasHeight/3 + 20*line_count);
    }
  } else{

    if(show_final_viz){
      recenter_image = true;
      rescaleFeatherLoc = true;
    }
  }

}

///////////////// 00: Introduction /////////////////
function generate_random_coords(){
  for (let i = 0; i < 20; i++) {
    let x = random(0, canvasWidth);
    let y = random(0, canvasHeight/6);
    decor_positions[i] = [x, y];
  }
}

///////////////// Q1: Setting /////////////////
function indoorViz(){

  noFill();
  stroke('#faebd7');
  //Setting: Indoor
  circle (center[0], center[1], diameter);
  strokeWeight(4);
  //stroke(255, 204, 0);
  circle (center[0], center[1], diameter-20);

  // two circles along vertical axis
  strokeWeight(1.5);
  stroke('#faebd7');
  noFill();
  
  circle (center[0], center[1]-radius/2, radius);
  circle (center[0], center[1]+radius/2, radius);
  
  // other 4 (RHS top clockwise -> LHS top)
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);

  //middle, left, right
  line (center[0], center[1]+radius, center[0], center[1]+3.5*radius);
  line (center[0]-radius*sin(PI/6), center[1]+radius*cos(PI/6), center[0]-radius*sin(PI/6), center[1]+radius*cos(PI/6)+2*radius);
  line (center[0]+radius*sin(PI/6), center[1]+radius*cos(PI/6), center[0]+radius*sin(PI/6), center[1]+radius*cos(PI/6)+2*radius); 
  

}

function outdoorViz(){
  noFill();
  strokeWeight(1.5);
  stroke('#faebd7');
  //outter circle
  circle (center[0], center[1], diameter);
  
  // two circles along vertical axis
  strokeWeight(1.2);
  stroke('#faebd7');
  noFill();
  circle (center[0], center[1]-radius/2, radius);
  circle (center[0], center[1]+radius/2, radius);
  
  // other 4 (RHS top clockwise -> LHS top)
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
  
   // bottom circle
  center_outdoor = [center[0], center[1]+diameter/1.2];
  radius_outdoor = radius/2;
  circle(center_outdoor[0], center_outdoor[1]-radius/3, radius_outdoor); //shifted y coords for bottom circle
  
  //middle, left, right
  line (center[0], center[1]+radius, center[0], center[1]+3*radius);
  line (center_outdoor[0]-radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2), center_outdoor[0]-radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2)+line_length_outdoor);
  line (center_outdoor[0]+radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2), center_outdoor[0]+radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2)+line_length_outdoor);
}

function ambiguousViz(){
    stroke('#faebd7');
    //RHS & LHS half circles (dotted)
    for(let i = 0; i < 60; i++){
      strokeWeight(2);
      let x1 = center[0] + (radius)*sin(i*PI/60);
      let y1 = center[1] - (radius)*cos(i*PI/60);
      point(x1, y1);
    }
    
    for(let j = 0; j < 60; j++){
      strokeWeight(2);
      let x1 = center[0] - (radius)*sin(j*PI/60);
      let y1 = center[1] - (radius)*cos(j*PI/60);
      point(x1, y1);
    }

    // two circles along vertical axis
    strokeWeight(1.2);
    noFill();
    circle (center[0], center[1]-radius/2, radius);
    circle (center[0], center[1]+radius/2, radius);
  
    // other 4 (RHS top clockwise -> LHS top)
    circle (center[0]+(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
    circle (center[0]+(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
    circle (center[0]-(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
    circle (center[0]-(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);

    
  //middle, left, right
  line (center[0], center[1]+radius, center[0], center[1]+3.5*radius);
  line (center[0]-radius*sin(PI/6), center[1]+radius*cos(PI/6), center[0]-radius*sin(PI/6), center[1]+radius*cos(PI/6)+2*radius);
  line (center[0]+radius*sin(PI/6), center[1]+radius*cos(PI/6), center[0]+radius*sin(PI/6), center[1]+radius*cos(PI/6)+2*radius); 

}

function noSettingViz(){
  stroke('#faebd7');
  noFill();
  // two circles along vertical axis
  strokeWeight(1.2);
  noFill();
  circle (center[0], center[1]-radius/2, radius);
  circle (center[0], center[1]+radius/2, radius);
  
  // other 4 (RHS top clockwise -> LHS top)
  strokeWeight(1.2);
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
  circle (center[0]+(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]+(radius/2)*cos(rot_angle), radius);
  circle (center[0]-(radius/2)*sin(rot_angle), center[1]-(radius/2)*cos(rot_angle), radius);
  
   // bottom circle
  center_outdoor = [center[0], center[1]+diameter/1.2];
  radius_outdoor = radius/2;
  circle(center_outdoor[0], center_outdoor[1]-radius/3, radius_outdoor); //shifted y coords for bottom circle
  
  //middle, left, right
  line (center[0], center[1]+radius, center[0], center[1]+3*radius);
  line (center_outdoor[0]-radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2), center_outdoor[0]-radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2)+line_length_outdoor);
  line (center_outdoor[0]+radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2), center_outdoor[0]+radius_outdoor/2*sin(PI/2), center_outdoor[1]-radius/3+radius_outdoor/2*cos(PI/2)+line_length_outdoor);
}


///////////////// Q3: Characters /////////////////
// human characters
function humanCharViz(){
  noFill();
  stroke('#faebd7');
  human_character.radius = radius/5; //7
  circle(center[0], center[1]- radius - human_character.radius/2, human_character.radius);
  circle(center[0], center[1]- radius - human_character.radius/2, human_character.radius/2);
  circle(center[0], center[1]- radius - human_character.radius - human_character.radius/4, human_character.radius/2);
  human_character.height = 3*human_character.radius;
  let top_y = center[1] - radius - human_character.radius - human_character.radius/4 - human_character.radius/4;
  human_character.top = [center[0], top_y];
}

//animal characters
function animalCharViz(){
  noFill();
  stroke('#faebd7');
  animal_character.radius = radius/5;
  circle(center[0], center[1]- radius - animal_character.radius/4, animal_character.radius/2);
  circle(center[0], center[1]- radius - animal_character.radius, animal_character.radius);
  circle(center[0], center[1]- radius - animal_character.radius - animal_character.radius/2 - animal_character.radius/4, animal_character.radius/2);
  
}

//female
function femaleCharViz(){
    noFill();
    stroke('#faebd7');
    strokeWeight(1.5);
    let x0 = center[0];
    let y0 = center[1] - radius - radius/5 - radius/10 - radius/8;
    female_char.center = [x0,y0];
    female_char.diameter = radius/4;
    female_char.radius = radius/8;
    for (let i = 0; i < female_char.count; i++)
    {
      let d = female_char.diameter * (female_char.count-i)/female_char.count;
      circle(female_char.center[0], female_char.center[1], d);
    }
}

//male
function maleCharViz(){
  noFill();
  stroke('#faebd7');
  strokeWeight(1.5);
  let x0 = center[0];
  let y0 = center[1] - radius - radius/5 - radius/10 - radius/8;
  male_char.center = [x0,y0];
  male_char.diameter = radius/4;
  male_char.radius = radius/8;
  circle(male_char.center[0], male_char.center[1], male_char.diameter);
  for (let i = 0; i < male_char.count ; i++)
  {
    let x1 = male_char.center[0] + (male_char.radius)*sin(i*PI/4);
    let y1 = male_char.center[1] - (male_char.radius)*cos(i*PI/4);
    let x2 = male_char.center[0] - (male_char.radius)*sin(i*PI/4);
    let y2 = male_char.center[1] + (male_char.radius)*cos(i*PI/4);
    line(x1, y1, x2, y2);
    
  }
}

//other char
function otherCharViz(){
  noFill();
  let x0 = center[0];
  let y0 = center[1] - radius - radius/5 - radius/10 - radius/8;
  other_char.center = [x0,y0];
  other_char.diameter = radius/4;
  other_char.radius = radius/8;
  noFill();
  circle(other_char.center[0], other_char.center[1], other_char.diameter);
  noFill();
  beginShape();
  vertex(other_char.center[0], other_char.center[1]-other_char.radius);
  vertex(other_char.center[0]+other_char.radius, other_char.center[1]);
  vertex(other_char.center[0], other_char.center[1]+other_char.radius);
  vertex(other_char.center[0]-other_char.radius, other_char.center[1]);
  endShape(CLOSE);
}

function adultCharViz(){
  fill('#faebd7');
  stroke('#faebd7');
  adult_character.radius = radius/5; //7
  circle(center[0], center[1]- radius - adult_character.radius/2, adult_character.radius);
  fill('#424d72');
  circle(center[0], center[1]- radius - adult_character.radius/2, adult_character.radius/2);
  noFill();
  circle(center[0], center[1]- radius - adult_character.radius - adult_character.radius/4, adult_character.radius/2);
  adult_character.height = 3*adult_character.radius;
  let top_y = center[1] - radius - adult_character.radius - adult_character.radius/4 - adult_character.radius/4;
  adult_character.top = [center[0], top_y];
  noFill();

}

function teenagerCharViz(){
  
  teen_character.radius = radius/5; //7
  noFill();
  stroke('#faebd7');
  circle(center[0], center[1]- radius - teen_character.radius/2, teen_character.radius);
  circle(center[0], center[1]- radius - teen_character.radius/2, teen_character.radius/2);
  circle(center[0], center[1]- radius - teen_character.radius - teen_character.radius/4, teen_character.radius/2);
  teen_character.height = 3*teen_character.radius;
  let top_y = center[1] - radius - teen_character.radius - teen_character.radius/4 - teen_character.radius/4;
  teen_character.top = [center[0], top_y];
  line (teen_character.top[0] - teen_character.radius/2,teen_character.top[1], teen_character.top[0] + teen_character.radius/2, teen_character.top[1] );
}


function childCharViz(){
  child_character.radius = radius/5; //7
  noFill();
  stroke('#faebd7');
  circle(center[0], center[1]- radius - child_character.radius/2, child_character.radius);
  circle(center[0], center[1]- radius - child_character.radius/2, child_character.radius/2);
  fill('#faebd7');
  circle(center[0], center[1]- radius - child_character.radius - child_character.radius/4, child_character.radius/2);
  child_character.height = 3*child_character.radius;
  let top_y = center[1] - radius - child_character.radius - child_character.radius/4 - child_character.radius/4;
  child_character.top = [center[0], top_y];
  noFill();
}

function babyCharViz(){
  baby_character.radius = radius/5; //7
  noFill();
  stroke('#faebd7');
  circle(center[0], center[1]- radius - baby_character.radius/2, baby_character.radius);
  circle(center[0], center[1]- radius - baby_character.radius - baby_character.radius/4, baby_character.radius/2);
  fill('#faebd7');
  circle(center[0], center[1]- radius - baby_character.radius/2, baby_character.radius/2);
  
  baby_character.height = 3*baby_character.radius;
  let top_y = center[1] - radius - baby_character.radius - baby_character.radius/4 - baby_character.radius/4;
  baby_character.top = [center[0], top_y];
  noFill();
}

//familiar char
function familiarCharViz(){
  let x0 = center[0];
  let y0 = center[1] - radius - radius/5 - radius/10 - radius/8;
  familiar_char.btm_center = [x0,y0];
  familiar_char.width = radius/4;
  let dt_x = familiar_char.width/2;
  let dt_y = familiar_char.width * 1.2;  //*1.5;
  
  noFill();
  beginShape();
  vertex(familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1]);
  vertex(familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1] - dt_y);
  vertex(familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1] - dt_y);
  vertex(familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1]);
  endShape(CLOSE);
  
  
  line(familiar_char.btm_center[0], familiar_char.btm_center[1], familiar_char.btm_center[0], familiar_char.btm_center[1] - dt_y);
  line(familiar_char.btm_center[0], familiar_char.btm_center[1], familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1] - dt_y);
  line(familiar_char.btm_center[0], familiar_char.btm_center[1], familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1] - dt_y);
}

//unfamiliar char
function unfamiliarCharViz(){
  let x0 = center[0];
  let y0 = center[1] - radius - radius/5 - radius/10 - radius/8;
  familiar_char.btm_center = [x0,y0];
  familiar_char.width = radius/4;
  let dt_x = familiar_char.width/2;
  let dt_y = familiar_char.width * 1.2;  //*1.5;
  
  noFill();
  beginShape();
  vertex(familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1]);
  vertex(familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1] - dt_y);
  vertex(familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1] - dt_y);
  vertex(familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1]);
  endShape(CLOSE);
  
  
  line(familiar_char.btm_center[0], familiar_char.btm_center[1], familiar_char.btm_center[0], familiar_char.btm_center[1] - dt_y);
  line(familiar_char.btm_center[0] - dt_x, familiar_char.btm_center[1], familiar_char.btm_center[0], familiar_char.btm_center[1] - dt_y);
  line(familiar_char.btm_center[0] + dt_x, familiar_char.btm_center[1], familiar_char.btm_center[0], familiar_char.btm_center[1] - dt_y);
}


//Helper functions

// draw circles along a circular path
function drawRotatingCircles(center, radius, start_angle, rot_angle, count){
  // RHS half
  for (let i = 0; i < count/2; i++)
  {
    let x0 = center[0] + (radius/2)*sin(i*rot_angle + start_angle);
    let y0 = center[1] - (radius/2)*cos(i*rot_angle + start_angle);
    circle(x0, y0, radius);
  }
    
  // LHS half
  for (let j = 0; j < count/2; j++)
  {
    let x0 = center[0] - (radius/2)*sin(j*rot_angle + start_angle);
    let y0 = center[1] - (radius/2)*cos(j*rot_angle + start_angle);
    circle(x0, y0, radius);
  }
  
}



//VISUAL EFFECT FUNCTIONS
function animateBackground(){
  overlayColor.setAlpha(100 + 100 * sin(millis() / 3000));
  fill(overlayColor);
  noStroke();
  rect(0, 0, canvasWidth, canvasHeight);
}

window.onresize = function() {
  // assigns new values for width and height variables
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight; 
  
  // resize canvas if window too small
  if(!changeCanvasOnWindowResize ){
    if(canvasHeight < 200){
      canvasHeight = window.innerHeight*2.8;
    } else if(canvasHeight < 300){
      canvasHeight = window.innerHeight*2.4;
    } else if(canvasHeight < 400){
      canvasHeight = window.innerHeight*1.7; //1.8;
    } else if (canvasHeight < 500){
      canvasHeight = window.innerHeight*1.6;
    }else if (canvasHeight < 600){
      canvasHeight = window.innerHeight*1.4;
    } else if(canvasHeight < 800){
      canvasHeight = window.innerHeight*1.1;
    } 
} else {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight + 35; 
}
  
  resizeCanvas(this.canvasWidth, this.canvasHeight);
  // resizeCanvas(window.innerWidth, window.innerHeight);
  
  // scale the star positions with canvas size change
  for (let i = 0; i < stars.length; i++) {
    stars[i].updatePos(random(this.canvasWidth), random(this.canvasHeight/2));
  }

  // reset feather positions
  rescaleFeatherPos = true;
}

function resizeMyCanvas(){
  canvasHeight = window.innerHeight + 35; 
  resizeCanvas(this.canvasWidth, this.canvasHeight);
}

// star class //

class Star {
  constructor(tx, ty, color, tf, td, size, tau) {
    this.x = tx;
    this.y = ty;
    this.c = color;
    this.f = tf;
    this.down = td;
    this.size = size;
    this.tau = tau;
  }

  showStar() {
    this.tau += 0.05;
    let scale = this.size + sin(this.tau)*1.5;
    fill(this.c)
    stroke(this.c)
    // point(this.x, this.y);
    ellipse(this.x, this.y, scale, scale);
  }

  updatePos(newX, newY){
    this.x = newX;
    this.y = newY;
  }

  twinkle() {
    
    if (this.c >= 255) {
      this.down = true;
    }
    if (this.c <= 0) {
      this.down = false;
    }

    if (this.down) {
      this.c -= this.f * 0.05;
    } else {
      this.c += this.f * 0.05;
    }
  }
}


// separating the text into lines
function generateTextLine(arr, startIndex, length){
  let newString = arr[startIndex]; 
  for (let i = startIndex+1; i < startIndex+length; i++){
    let word = arr[i]; 
    let stringTemp = newString.concat(" ");
    newString = stringTemp.concat(word);
  }
  return newString;
}
