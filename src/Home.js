import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
    <>
  
  <nav className="navigation">
    <h1>Music Guesser</h1>
    </nav>  
    <main>
    
    <div className="textContainer">
    
    <h2>Guess the singer!</h2>
  
    <p>Have fun testing your memory and your musical culture.</p>
    
    <Link to="/game">
    <button type="button">Play Now</button>
    </Link>
    </div>
  
    
  
    </main>
    <div className="imgAlbum">
    </div>
    <div className="gradient">
    </div>
    </>  
    );
  }
  
  export default Home;
  