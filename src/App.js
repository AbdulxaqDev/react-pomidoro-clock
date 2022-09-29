import React, { useState, useEffect } from "react";
import Beep from "./assets/audio/beep.mp3";
import "./App.css";

export default function App() {
 const [bLength, setBLength] = useState(5);
 const [sLength, setSLength] = useState(25);
 const [time, setTime] = useState(25*60);
 const [isPlaying, setIsPlaying] = useState(false);
 const [bR, setBr] = useState(false);

 const alertBreak = () => {
  let beep = new Audio(Beep);
  beep.play();
 };

 const generateTime = (t) => {
  let m = Math.floor(t / 60);
  let s = t % 60;
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
 };

 const runTime = () => {
  let s = 1000;
  let d = new Date().getTime();
  let nD = new Date().getTime() + s;
  let b = bR;
  if (!isPlaying) {
   let i = setInterval(() => {
    d = new Date().getTime();
    if (d > nD) {
     setTime((p) => {
      if (p <= 0 && !b) {
       console.log("break");
       alertBreak();
       b = true;
       setBr(true);
       return bLength*60;
      } else if (p <= 0 && b) {
       console.log("sessian");
       alertBreak();
       b = false;
       setBr(false);
       return sLength*60;
      }
      return p - 1;
     });
     nD += s;
    }
   }, 30);
   localStorage.clear();
   localStorage.setItem("i-id", i);
  }

  if (isPlaying) {
   clearInterval(localStorage.getItem("i-id"));
  }

  setIsPlaying(!isPlaying);
 };

 const rTime = () => {
  setBLength(5 * 60);
  setSLength(25 * 60);
  setIsPlaying(true);
  setTime(25 * 60);
  runTime();
 };

 useEffect(() => {
   setTime(sLength*60)
 }, [sLength])
 

 return (
  <div className="App">
   <div id="clock" style={{ backgroundColor: bR ? "#FA6B8450" : "#ACF3AE50"}} >
    <div id="labels">
     <div id="break-label">
      <p className="label">Break Length</p>
      <div className="btns">
       <button
        disabled={bLength === 1 || isPlaying}
        id="break-decrement"
        onClick={() => {
         setBLength(bLength - 1);
        }}
       >
        <i className="fa fa-arrow-down" aria-hidden="true"></i>
       </button>
       <p id="break-length">{bLength}</p>
       <button
        disabled={isPlaying}
        id="break-increment"
        onClick={() => {
         setBLength(bLength + 1);
        }}
       >
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
       </button>
      </div>
     </div>
     <div id="session-label">
      <p className="label">Session Length</p>
      <div className="btns">
       <button
        disabled={sLength === 1 || isPlaying}
        id="session-decrement"
        onClick={() => {
         setSLength(sLength - 1);
        }}
       >
        <i className="fa fa-arrow-down" aria-hidden="true"></i>
       </button>
       <p id="session-length">{sLength}</p>
       <button
        disabled={isPlaying}
        id="session-increment"
        onClick={() => {
         setSLength(sLength + 1);
        }}
       >
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
       </button>
      </div>
     </div>
    </div>
    <div id="timer">
     <p id="timer-label">{bR ? "Break" : "Session"}</p>
     <div id="time-left">{generateTime(time)}</div>
    </div>
    <div id="controls">
     <button id="start_stop">
      <i
       style={{ display: isPlaying ? "none" : "unset" }}
       onClick={() => {
        setIsPlaying(!isPlaying);
        runTime();
       }}
       className="fa fa-play"
       aria-hidden="true"
      ></i>
      <i
       style={{ display: !isPlaying ? "none" : "unset" }}
       onClick={() => {
        setIsPlaying(!isPlaying);
        runTime();
       }}
       className="fa fa-pause"
       aria-hidden="true"
      ></i>
     </button>
     <button onClick={rTime} id="reset">
      <i className="fa fa-refresh" aria-hidden="true"></i>
     </button>
    </div>
   </div>
  </div>
 );
}
