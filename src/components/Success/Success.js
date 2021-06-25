import React, { useEffect, Fragment, useRef } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";
import lottie from "lottie-web";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./success.json"),
    });
  }, []);
  const restartGame = () => {
    props.restart("hi");
  }

  return (
    <div className={classes.modal}>
      <div className={classes.successLogo}><div className="container" ref={container}></div></div>
      <div className={classes.content}>{props.children}</div>
      <div className={classes.btnDiv}>
        <button className={classes.btn} onClick={restartGame}>restart</button>

      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay restart={props.restart}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
