import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import classes from "./Block.module.css";

const Block = (props) => {
  const [backColor, setBackColor] = useState("white");
  const [isFlipped, setIsflipped] = useState(false);
  
  if (props.color === 1 && backColor !== "white") {
    setBackColor("white");
  }
  if (props.color === 2 && backColor !== "#87CEEB") {
    setBackColor("#87CEEB");
  }

  if (props.color === 1 && isFlipped !== false) {
    setIsflipped(false);
  }
  if (props.color === 2 && isFlipped !== true) {
    setIsflipped(true);
  }
  let divClassName= classes.backDiv;
  if (props.selectedIds.length === 2 && props.color === 2) {
    if (
      props.array[props.selectedIds[0]] !== props.array[props.selectedIds[1]]
    ) {
      divClassName = classes.shakeDisplayDiv;
    }
  }
  
  const selectDivHandler = () => {
    props.selectDiv(props.id);
  };


  return (
    <div onClick={selectDivHandler} className={classes.container}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className={classes.frontDiv}
        ></div>
        <div className={divClassName} 
          >
          {props.children}
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Block;
