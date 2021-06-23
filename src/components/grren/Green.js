import classes from "./Green.module.css";
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from "react";

const Green = (props) => {
    const [isFlipped, setIsflipped] =  useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setIsflipped(true);
        },200)
    },[])
  return (
    <div className={classes.container} >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className={classes.displayDiv} style={{ background: "#87CEEB" }}>{props.children}</div>
        <div className={classes.displayDiv} style={{ background: "#e73060" }}>{props.children}</div>
      </ReactCardFlip>
    </div>
  );
};

export default Green;
