// ---------Variables/Data---------

let dream_entry = "XXXXXX";
let default_text = "Write about your dream here";
let add_dream_text = false;
let hideStars = false;
let dreamTextArray = [];
// ---------Site Navigation, Interactive Components---------

function nextQuestion(index){
    document.getElementById("cat" + (index-1)).style.display = "none";
    document.getElementById("cat" + (index)).style.display = "inline-block"; // block??

}

function saveImage(){
    save('myDreamCatcher.jpg');
}

function backToHomePage(){
    window.location = "http://users.design.ucla.edu/~wrzhang/dreams/";
}


function aboutPage(){
    document.getElementById("rhsPage").style.display = "inline-block";
    document.getElementById("rhsPage").style.width = "100vw";
    document.getElementById("aboutContainer").style.display = "inline-block";
    document.getElementById("topNav").style.display = "none";
    document.getElementById("bottomNav").style.display = "none";
}

function visualGuide(){
    document.getElementById("rhsPage").style.display = "inline-block";
    document.getElementById("rhsPage").style.width = "100vw";
    document.getElementById("visualGuideContainer").style.display = "inline-block";
    document.getElementById("topNav").style.display = "none";
    document.getElementById("bottomNav").style.display = "none";
}

function closePage(){
    document.getElementById("rhsPage").style.display = "none";
    document.getElementById("topNav").style.display = "inline-block";
    document.getElementById("topNav").style.width = "100vw";
    document.getElementById("aboutContainer").style.display = "none";
    document.getElementById("visualGuideContainer").style.display = "none";
    document.getElementById("bottomNav").style.display = "inline-block";
    document.getElementById("bottomNav").style.width = "100vw";
}

// ---------User Dream Entry---------

function dreamEntryPage(){
    document.getElementById("introPage").style.display = "none";
    document.getElementById("introTitle").style.display = "none";
    document.getElementById("projectIntro").style.display = "none";
    document.getElementById("userDream").style.display  = "block"; // block
}


// function addDreamEntry(){
//      var content = document.getElementById("dream").value;
//      dream_entry = content.toString();
//      console.log(dream_entry);
//      document.getElementById("dream_entry").innerHTML = dream_entry;
//      document.getElementById("userDream").style.display = "none";
//      document.getElementById("lhsNav").className = "side_nav";
    
//  }

function startSurvey(){
    hideStars = true;
    changeCanvasSize = true;
    changeCanvasOnWindowResize = true;
    document.getElementById("userDream").style.display = "none";
    document.getElementById("lhsNav").className = "side_nav";

    // highlight Q1 index
    document.getElementById("circle1").style.backgroundColor = "antiquewhite";
    document.getElementById("index1").style.color = "#424d72";
}



// ---------Forms, User Input Management---------

//***** Question 1: Dream Setting *****

// let all_inputs =[];
// let all_pos =[];
// let all_imgs = [];

let user_choices1 = [];
let show_q1 = false;


// let user_choices2 = [];
let imgs2 = [];
let q2Index = [];
let show_q2 = false;


let user_choices3 = [];
let show_q3 = false;


let user_choices4 = [];
let show_q4 = false;


let show_final_viz = false;

function q1SettingViz(){
   
    if (document.getElementById("indoor").checked){
		user_choices1.push(1);
    } 
    
        
    if (document.getElementById("outdoor").checked){
		user_choices1.push(2);
    } 
    
    if (document.getElementById("ambiguous").checked){
		user_choices1.push(3);
    } 
    
    if (document.getElementById("noSetting").checked){
		user_choices1.push(4);
	} 

    show_q1 = true;
    draw();
    nextQuestion(2);
    

    // highlight Q2 index
    document.getElementById("circle2").style.backgroundColor = "antiquewhite";
    document.getElementById("index2").style.color = "#424d72";
    
}

function q2ObjectViz(){
    if (document.getElementById("architecture").checked){
        imgs2.push(loadImage('images/architecture.png'));
        //let randX = getRandomInt(3);
        xIndex.push(getRandomInt(3));
        q2Index.push(0); 
    } 

    if (document.getElementById("household").checked){
        imgs2.push(loadImage('images/household_articles.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(1); 
    } 


    if (document.getElementById("foodDrink").checked){
        imgs2.push(loadImage('images/food_n_drinks.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(2); 
    } 


    if (document.getElementById("implements").checked){
        imgs2.push(loadImage('images/implements.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(3); 
    } 

    if (document.getElementById("travel").checked){
        imgs2.push(loadImage('images/travel.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(4); 
    } 

    if (document.getElementById("streets").checked){
        imgs2.push(loadImage('images/streets.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(5); 
    } 

    if (document.getElementById("regions").checked){
        imgs2.push(loadImage('images/regions.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(6); 
    } 

    if (document.getElementById("nature").checked){
        imgs2.push(loadImage('images/nature.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(7);
    } 

    if (document.getElementById("bodyParts").checked){
        imgs2.push(loadImage('images/body_parts.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(8);
    } 

    if (document.getElementById("clothes").checked){
        imgs2.push(loadImage('images/clothes.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(9); 
    } 

    if (document.getElementById("communication").checked){
        imgs2.push(loadImage('images/communication.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(10);
    } 

    if (document.getElementById("money").checked){
        imgs2.push(loadImage('images/money.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(11); 
    } 

    if (document.getElementById("micellaneous").checked){
        imgs2.push(loadImage('images/micellaneous.png'));
        xIndex.push(getRandomInt(3));
        q2Index.push(12); 
    } 

    
    show_q2 = true;
    draw();
    nextQuestion(3); 

    // highlight Q3 index
    document.getElementById("circle3").style.backgroundColor = "antiquewhite";
    document.getElementById("index3").style.color = "#424d72";
}


function q3CharacterViz(){   
    

    
    if (document.getElementById("animal").checked){
		user_choices3.push(1);
	} 
    
    if (document.getElementById("human").checked){
        user_choices3.push(2);
    } 
    
    if (document.getElementById("male").checked){
        user_choices3.push(3);
    }

    if (document.getElementById("female").checked){
        user_choices3.push(4);
    }

    if (document.getElementById("other").checked){
        user_choices3.push(5);
    }

    if (document.getElementById("adult").checked){
        user_choices3.push(6);
    }

    if (document.getElementById("teenager").checked){
        user_choices3.push(7);
    }

    if (document.getElementById("child").checked){
        user_choices3.push(8);
    }

    if (document.getElementById("baby").checked){
        user_choices3.push(9);
    }

    if (document.getElementById("familiar").checked){
        user_choices3.push(10);
    }
    
    if (document.getElementById("unfamiliar").checked){
        user_choices3.push(11);
    }

    show_q3 = true;
    draw();
    nextQuestion(4); 
    
      // highlight Q4 index
      document.getElementById("circle4").style.backgroundColor = "antiquewhite";
      document.getElementById("index4").style.color = "#424d72";
}


function q4EmotionsViz(){
    draw();
    // closeMenu();

    if (document.getElementById("happiness").checked){
        user_choices4.push(1);
    }

    if (document.getElementById("apprehension").checked){
        user_choices4.push(2);
    }

    if (document.getElementById("anger").checked){
        user_choices4.push(3);
    }

    if (document.getElementById("confusion").checked){
        user_choices4.push(4);
    }

    if (document.getElementById("sadness").checked){
        user_choices4.push(5);
    }

    show_q4 = true;
//the end  
    lastPage();
}


function lastPage(){
    document.getElementById("cat4").style.display = "none";
    
    // document.getElementById("saveBtnContainer").style.display = "inline-block"; 
    // var content = document.getElementById("dream").value;
    // dream_entry = content.toString();
    //console.log(dream_entry);
    // document.getElementById("dreamText").innerHTML = dream_entry;

    // hide the question index bar
    document.getElementById("questionIndeces").style.display = "none";
    document.getElementById("lhsNav").style.display = "none";
    document.getElementById("lastPage").style.display = "inline-block"; 

    let content = document.getElementById("dream").value;
    dream_entry = content.toString();

    if(document.getElementById("dream").value === default_text){
        add_dream_text = false;

    }else{
        dreamTextArray = dream_entry.split(' ');
        add_dream_text = true; 
    }


    show_final_viz = true;
}



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// function countWords(str){
//     str1= str;
//     //exclude  start and end white-space
//     str1 = str1.replace(/(^\s*)|(\s*$)/gi,"");
//     //convert 2 or more spaces to 1  
//     str1 = str1.replace(/[ ]{2,}/gi," ");
//     // exclude newline with a start spacing  
//     str1 = str1.replace(/\n /,"\n");
//     return str1.split(' ').length;
// }