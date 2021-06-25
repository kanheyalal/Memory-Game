import { useEffect, useState } from "react";
import Block from "../block/Block";
import Green from "../Completed/Completed";
import classes from "./Display.module.css";
import Success from "../Success/Success";

const Display = (props) => {
  const [colorArr, setColorArray] = useState(() => {
    const arr = [];
    for (let i = 0; i < props.array.length; i++) {
      arr.push(1);
    }
    return arr;
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [noOfMoves, setNoOfMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (selectedIds.length === 2) {
      if (
        props.array[selectedIds[0]].value === props.array[selectedIds[1]].value
      ) {
        setTimeout(() => {
          setColorArray((prevState) => {
            prevState[selectedIds[0]] = 3;
            prevState[selectedIds[1]] = 3;
            return prevState;
          });
          setSelectedIds([]);
          setNoOfMoves((prevState) => prevState + 1);
        }, 500);
      } else {
        setTimeout(() => {
          setColorArray((prevState) => {
            prevState[selectedIds[0]] = 1;
            prevState[selectedIds[1]] = 1;
            return prevState;
          });
          setSelectedIds([]);
          setNoOfMoves((prevState) => prevState + 1);
        }, 1500);
      }
    }
  }, [selectedIds, colorArr, props.array]);

  const selectDiv = (id) => {
    if (selectedIds.length === 2) {
      return;
    }
    if (selectedIds.length === 0) {
      setSelectedIds((prevState) => {
        return [id];
      });
      setColorArray((prevState) => {
        prevState[id] = 2;
        return prevState;
      });
      return;
    }
    if (selectedIds[0] === id) {
      setSelectedIds([]);
      setColorArray((prevState) => {
        prevState[id] = 1;
        return prevState;
      });
    } else {
      setSelectedIds((prevState) => {
        return [...prevState, id];
      });
      setColorArray((prevState) => {
        prevState[id] = 2;
        return prevState;
      });
    }
  };

  const displayArr = [];
  for (let i = 0; i < props.array.length; i++) {
    if (colorArr[i] === 3) {
      displayArr.push(<Green key={i}>{props.array[i].icon}</Green>);
    } else {
      displayArr.push(
        <Block
          key={i}
          id={i}
          color={colorArr[i]}
          selectDiv={selectDiv}
          selectedIds={selectedIds}
          array={props.array}
        >
          {props.array[i].icon}
        </Block>
      );
    }
  }

  const restartGameHandler = (val) => {
    console.log(val)
    setGameOver(false);
    setColorArray(() => {
      const arr = [];
      for (let i = 0; i < props.array.length; i++) {
        arr.push(1);
      }
      return arr;
    });
    setSelectedIds([]);
    setNoOfMoves(0);
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };
    shuffle(props.array);
  };

  let GameOver = true;
  for (let i = 0; i < props.array.length; i++) {
    if (colorArr[i] === 1 || colorArr[i] === 2) {
      GameOver = false;
      break;
    }
  }
  if (GameOver && gameOver === false) {
    setTimeout(() => {
      setGameOver(true);
    }, 1000);
  }

  return (
    <div className={classes.display}>
      {gameOver && (
        <Success restart={restartGameHandler}>
          you have completed the game in {noOfMoves} moves{" "}
        </Success>
      )}
      <div className={classes.btnDiv}>
        <div>Moves : {noOfMoves}</div>
        <button className={classes.btn} onClick={restartGameHandler}>restart</button></div>
      <div className={classes.content}>{displayArr}</div>
    </div>
  );
};

export default Display;
