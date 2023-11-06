import React, { useState, useEffect } from "react";
/*
This custom hook is used to return a timer based on the amount of time the user wants to type for
*/
export const useTimer = (timeInSeconds: number) => {
  const [timerTime, setTimerTime] = useState<number>(timeInSeconds);
  const regEx: RegExp = /^\w\b|\s|[.+*?^$()[]|['{}|\']/gim;
  //On the initial load
  //We have put a listener on the keydown attribute
  const keyDownListener = (e: KeyboardEvent) => {
    if (regEx.test(e.key)) {
      const startTimer: NodeJS.Timeout = setInterval(() => {
        setTimerTime((prev) => {
          if (prev == 1) clearInterval(startTimer);

          return --prev;
        });
      }, 1000);
      //   startTimer();
      //We remove that listener when we start typing
      //This is done so that we can start the timer when we type on each render
      document.body.removeEventListener("keydown", keyDownListener);
    }
  };
  useEffect(
    () => document.body.addEventListener("keydown", keyDownListener),
    []
  );
  return timerTime;
};
