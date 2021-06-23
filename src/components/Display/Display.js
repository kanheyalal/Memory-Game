import { useEffect, useState } from "react";
import Block from "../block/Block";
import Green from "../grren/Green";
import classes from "./Display.module.css";

const Display = (props) => {
  const [colorArr, setColorArray] = useState(() => {
    const arr = [];
    for (let i = 0; i < props.array.length; i++) {
      arr.push(1);
    }
    return arr;
  });
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (selectedIds.length === 2) {
      if (props.array[selectedIds[0]] === props.array[selectedIds[1]]) {
        setTimeout(() => {
          setColorArray((prevState) => {
            prevState[selectedIds[0]] = 3;
            prevState[selectedIds[1]] = 3;
            return prevState;
          });
          setSelectedIds([]);
        }, 500);
      } else {
        setTimeout(() => {
          setColorArray((prevState) => {
            prevState[selectedIds[0]] = 1;
            prevState[selectedIds[1]] = 1;
            return prevState;
          });
          setSelectedIds([]);
        }, 1000);
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
      displayArr.push(<Green key={i}>{props.array[i]}</Green>);
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
          {props.array[i]}
        </Block>
      );
    }
  }

  return (
    <div className={classes.display}>
      <div className={classes.content}>{displayArr}</div>
    </div>
  );
};

export default Display;
