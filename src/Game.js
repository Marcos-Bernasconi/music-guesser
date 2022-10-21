import React,{useState,useEffect} from "react";
import { gsap } from "gsap";

const singers =
[
  "art.69088", 
  "art.63692",
  // "art.61025",
  "art.44",
  "art.7375005",
  "art.20067373",
  "art.26871501",
  "art.28463069",
  "art.29065042",
  "art.2643",
  "art.154",
  "art.2923",
  "art.25534426",
  "art.44043",
  // "art.175",
  "art.177922095",
  "art.106770230",
  "art.214281475",
  "art.5230932",
  "art.283169213"
];

const total = singers.length;

let artistId = "";
let songId = "";

let url1 = "https://api.napster.com/v2.2/artists/";
let url2 = "/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&limit=5"

// let urlImg1 = "https://api.napster.com/imageserver/v2/albums/";
// let urlImg2 = "/images/350x350.jpg";

let urlImg1 = "https://api.napster.com/imageserver/v2/artists/";
 let urlImg2 = "/images/350x350.jpg";



let counter = 0;
let filter = 20;

let animation1 = null;
let animation2 = null;
let animation3 = null;
let animation4 = null;



function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


function playAudio(){
let audio = document.querySelector("audio");
let album = document.querySelector(".album");

 
counter= counter + 1;
console.log(counter);


audio.play();
  console.log("Audio Playing");
  console.log(audio.currentTime);




 

}




function Game() {

  
let [songName, setsongName] = useState(null);
let [singerName, setsingerName] = useState(null);
let [albumName, setalbumName] = useState(null);
let [albumId, setalbumId] = useState(null);
let [song, setsong] = useState(null);

let [seconds, setseconds] = useState (1);

let [correct, setcorrect] = useState(null);
let [points, setpoints] = useState(0);  

  useEffect(() => {
   
  artistId = singers[random(0,total)];
  console.log(artistId);
  // console.log(url1+artistId+url2);  
  songId = random(0,5);
  console.log(songId);

  fetch(url1+artistId+url2)
  .then((response) => response.json())
  .then((data) => {

    // console.log(data);
    setsongName(data.tracks[songId].name);
    setsingerName(data.tracks[songId].artistName);
    setalbumName(data.tracks[songId].albumName);
    setalbumId(data.tracks[songId].albumId);
    setsong(data.tracks[songId].previewURL);});

    // console.log(song);
  },[correct]);

  useEffect(()=>{

    let album = document.querySelector(".album");
    
album.style.filter = "blur("+filter+"px)";
    filter = 20; 
    let time= 0;
    counter = 0;
    let audio = document.querySelector("audio");
  
    console.log("setting up");
    audio.ontimeupdate = function(){


     if(counter <= 2){
      filter = 20;
      setseconds(1);
      album.style.filter = "blur("+filter+"px)";  
      if(audio.currentTime > 1){
        audio.currentTime = 0;
        audio.pause();
        console.log("1s song");
        
        
       
        
      }
    } 
     
     
    if(counter <=4 && counter > 2){
      filter = 10;
      setseconds(2);
      album.style.filter = "blur("+filter+"px)";  
      if(audio.currentTime > 2){
        audio.currentTime = 0;
        audio.pause();
        console.log("2s song");
        
      }
    } 




    // if(counter <= 6 && counter >4){
     
    //   if(audio.currentTime > 4){
    //     audio.currentTime = 0;
    //     audio.pause();
    //     console.log("8s song");
    //   }
    // } 




    if(counter == 5 ){

      filter = 5;
      setseconds(4);
      album.style.filter = "blur("+filter+"px)";  
      if(audio.currentTime > 4){
       
        audio.currentTime = 0;
        audio.pause();
        console.log("4s song");
      }
    } 

    if(counter >= 6 ){
 
      //console.log("Full song");
      filter = 0;
      setseconds(30);
      album.style.filter = "blur("+filter+"px)";  
  } 


     } 
  },[correct]);


  useEffect(()=>{
    let audio = document.querySelector("audio");
   
  
    let progression = gsap.fromTo(".indicator",{
      y: 160
    },{y: 0 ,duration: 1, ease: "linear"});
    
    progression.progress(0).pause();
    
    animation1= progression;

    let progression2 = gsap.fromTo(".indicator",{
      y: 160
    },{y: 0 ,duration: 2, ease: "linear"});
    
    progression2.progress(0).pause();
    
    animation2= progression2;
    
    let progression3 = gsap.fromTo(".indicator",{
      y: 160
    },{y: 0 ,duration: 29,  ease: "linear"});
    
    progression3.progress(0).pause();
    
    animation3= progression3;

    let progression4 = gsap.fromTo(".indicator",{
      y: 160
    },{y: 0 ,duration: 4,  ease: "linear"});
    
    progression4.progress(0).pause();
    
    animation4= progression4;

    audio.onplay = function(){
console.log("Start NOOOOWWWW");

   
        if(counter <= 2){
      
          progression.progress(0).play();
          }
         
         
         
        if(counter <= 4 && counter >2){
          
          progression2.progress(0).play();  
        
          }
      
      
      
          if(counter == 5){
            progression4.progress(0).play();
          }

          if(counter >= 6){
            progression3.progress(0).play();
          }


    }
  },[correct]);




  function confirm(){
    let input = document.querySelector(".guess input").value;
    
    let answer = singerName.toLowerCase()
    input = input.toLowerCase();
    
   let showanswer =  document.querySelector(".answer");
  //  console.log(showanswer);
    if(input == answer){
      console.log("Correct");
      setcorrect(correct+=1);
     
      filter= 20;

      animation1.kill();
      animation2.kill();
      animation3.kill();
      animation4.kill();
    
      setpoints(points += (counter*10-100)*-1);
      counter=0;
      document.querySelector(".guess input").placeholder= "Good Job ✨";
      document.querySelector(".guess input").value = "";
      showanswer.style.display = "none";
      // console.log(showanswer);
    }
    if(input != answer){
      console.log("Wrong");
      console.log(answer);
      console.log(input);
      document.querySelector(".guess input").placeholder= "Try Again 🎵";
      document.querySelector(".guess input").value = "";
     
      if(counter >= 6){
    
        
        showanswer.style.display = "block";
        // console.log(showanswer);
      }
    }
  }


  function showAnswer(){

    document.querySelector(".guess input").value = singerName;
  }


    return (
  <>
 
  <nav className="navigation">
    <h1>Music Guesser</h1>
    </nav>  
    <main>
    
    <div className="gameContainer">
    
    <h2>Points: {points}</h2>
  
    <div className="album" style={albumId ? {backgroundImage: "url("+urlImg1+artistId+urlImg2+")", backgroundSize: "cover"} : {} }></div>

    <div className="guess">
       <input type="text" placeholder="Who is the Singer?"/> 

    </div>

        <div className="buttonContainer">
            <button type="button" onClick={confirm}>
                Confirm
        <span className="material-symbols-rounded">
        send
</span>
</button>

        </div>
    <div className="play" onClick={playAudio}>
        <span className="material-symbols-rounded">
play_arrow
</span>
</div> 




<div className="time">
    <div className="display">
      <div className="indicator"></div>  
    </div> 
    <p>{seconds}s</p>
</div>    
  
    </div>
  
 <audio src={song}></audio>   
  
 <div className="answer" onClick={showAnswer} >Show Answer</div>
 


    </main>
    <div className="blob"></div>
    <div className="blob2"></div>
</> 
    );
  }
  
  export default Game;
  