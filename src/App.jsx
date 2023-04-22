import { useEffect, useState } from 'react'
import './App.css'
import { FaFighterJet } from "react-icons/fa";


const bird_size = 20;
const game_width = 500;
const game_height = 500;
const game_difficulty_Gap = 120;
const obstacle_width = 50;



function App() {

  const [StartGame, setStartGame] = useState(false)
  const [birdPositon, setbirdPositon] = useState(game_height / 2 - bird_size / 2)
  const [score, setScore] = useState(0);
  const [ObstacleHeight, setObstacleHeight] = useState(100);
  const [ObstacleLeftPosition, setObstacleLeftPosition] = useState(game_width - obstacle_width);
  const [GameOver, setGameOver] = useState(false);


  function resetGame() {
    setScore(0);
    setbirdPositon(game_height / 2 - bird_size / 2);
    setObstacleLeftPosition(game_width - obstacle_width);
  }


  useEffect(() => {
    let interval = null;
    if (StartGame) {
      interval = setInterval(() => {
        if (ObstacleLeftPosition > - obstacle_width) {
          setObstacleLeftPosition(obstPos => obstPos - 6);
        }
        else {
          setObstacleLeftPosition(game_width - obstacle_width);
          setObstacleHeight(Math.floor(Math.random() * (game_height - game_difficulty_Gap)));
          setScore(score => score + 1);
        }
      }, 24);
    }
    return () => clearInterval(interval);
  }, [StartGame, ObstacleLeftPosition])

  useEffect(() => {
    if (StartGame) {
      const collidedWithUpperObstacle = birdPositon < ObstacleHeight;
      const collidedWithLowerObstacle = birdPositon > ObstacleHeight + game_difficulty_Gap;
      if (ObstacleLeftPosition < bird_size && (collidedWithUpperObstacle || collidedWithLowerObstacle)) {
        setStartGame(false);
        alert("game over");
      }
    }

  }, [StartGame, ObstacleLeftPosition, birdPositon, ObstacleHeight])

  useEffect(() => {
    if (GameOver) {
      if (StartGame) {
        setGameOver(true)
      }
    }

  }, [GameOver])

  





  useEffect(() => {
    let interval = null;
    if (StartGame) {
      interval = setInterval(() => {
        if (birdPositon < game_height - bird_size) {
          setbirdPositon(birdPositon => birdPositon + 4);
        }
      }, 24);
    }
    return () => clearInterval(interval);
  }, [StartGame, birdPositon])

  const bottomObstacleHeight = game_height - (ObstacleHeight + game_difficulty_Gap);





  return (

    <div className="App">

      <h1 style={{border:"2px solid black", color:"skyblue", backgroundColor:"black", borderRadius:"5px", fontSize:"2.5em"}}>Aeroplane Game</h1>
      <div className='backsky'
        onClick={
          () => {
            const newBirdPosition = birdPositon - 50
            if (newBirdPosition > 0) {
              setbirdPositon(birdPositon => birdPositon - 50);
            }
            else {
              setbirdPositon(0);
            }
          }
        }
        style={{
          overflow: "hidden",
          position: "relative",
          "backgroundColor": "black",
          width: `${game_width}px`,
          height: `${game_width}px`
        }}>

        {/* top guy */}
        <div style={{
          position: "absolute",
          top: `${0}px`,
          left: `${ObstacleLeftPosition}px`,
          width: `${obstacle_width}px`,
          height: `${ObstacleHeight}px`,
          backgroundColor: "green"



        }}
        />


        <div style={{
          position: "absolute",
          top: `${ObstacleHeight + game_difficulty_Gap}px`,
          left: `${ObstacleLeftPosition}px`,
          width: `${obstacle_width}px`,
          height: `${bottomObstacleHeight}px`,
          backgroundColor: "green"



        }}
        />



        <div className='fa-sharp fa-regular fa-jet-fighter' style={{
          position: "absolute",
          color:"lightblue",
          fontSize:"2rem",
          marginLeft: "30px",
          width: `${bird_size}px`,
          height: `${bird_size}px`,

          top: `${birdPositon}px`

        }}>
          <p><FaFighterJet/> </p>
        </div>
      </div>
      
      <h1 style={{border:"2px solid black", color:"skyblue", backgroundColor:"black", borderRadius:"5px", fontSize:"2.5em"}}> Score {score}</h1>
      <button onClick={() => { setStartGame(true) }}>Start Game</button>
      <button onClick={resetGame}>Restart Game</button>


    </div>

  )
}

export default App
