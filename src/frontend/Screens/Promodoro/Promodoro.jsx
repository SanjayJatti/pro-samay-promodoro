import React, { useRef, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from "react-router-dom";
import { usePromodoro } from "../../Context/PromodoroContext";
import { useTask } from "../../Context/TaskContext";
import { useLocation } from "react-router-dom";
import "./Promodoro.css";

export const Promodoro = () => {
  const { taskId } = useParams();
  const { task } = useTask();
  const { promodoro } = usePromodoro();
  const { workMinutes, breakMinutes } = promodoro;
  const { pathname } = useLocation();

  const getCurrentTask = task.filter((item) => item._id === taskId);

  const [isPaused, setIsPaused] = useState(true);
  const [timeLeftInSec, setTimeLeftInSec] = useState(Number(workMinutes) * 60);
  const [mode, setMode] = useState("work");

  const timeLeftInSecRef = useRef(timeLeftInSec);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  useEffect(() => {
    timeLeftInSecRef.current =
      mode === "work" ? Number(workMinutes) * 60 : Number(breakMinutes) * 60;
    setTimeLeftInSec(timeLeftInSecRef.current);

    const changeMode = () => {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextTimeLeftInSec =
        (nextMode === "work" ? Number(workMinutes) : Number(breakMinutes)) * 60;
      setMode(nextMode);

      modeRef.current = nextMode;
      setTimeLeftInSec(nextTimeLeftInSec);
      timeLeftInSecRef.current = nextTimeLeftInSec;
    };

    const intervalId = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (timeLeftInSecRef.current === 0) {
        return changeMode();
      }

      timeLeftInSecRef.current--;
      setTimeLeftInSec(timeLeftInSecRef.current);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [workMinutes, breakMinutes, mode]);

  const totalSeconds =
    mode === "work" ? Number(workMinutes) * 60 : Number(breakMinutes) * 60;
  const percentageTimeLeft = Math.round((timeLeftInSec / totalSeconds) * 100);
  const minutesLeft = Math.floor(timeLeftInSec / 60);
  let secondsLeft = timeLeftInSec % 60;
  if (secondsLeft < 10) {
    secondsLeft = ` 0${secondsLeft}`;
  }

  useEffect(() => {
    document.title = minutesLeft + " : " + secondsLeft;
  }, [minutesLeft, secondsLeft]);

  return (
    <div className={pathname === "/promodoro" ? "flex-center" : "flex-row"}>
      <div className="promodoro-main flex-column-center gap-xl">
        <div className="promodoro-timer ">
          <div>
            <CircularProgressbar
              value={percentageTimeLeft}
              text={`${minutesLeft} : ${secondsLeft}`}
              styles={buildStyles({
                pathColor: mode === "work" ? "red" : "green",
                textColor: "#343a40"
              })}
            />
          </div>
        </div>
        <div className="promodoro-actions flex-row gap-xl">
          <i
            className="fas fa-sync"
            onClick={() => {
              timeLeftInSecRef.current =
                mode === "work"
                  ? Number(workMinutes) * 60
                  : Number(breakMinutes) * 60;
              setTimeLeftInSec(timeLeftInSecRef.current);
            }}
          ></i>
          {isPaused ? (
            <i
              className="fas fa-play-circle"
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            ></i>
          ) : (
            <i
              className="fas fa-pause-circle"
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            ></i>
          )}
          <i
            className="fas fa-chevron-circle-right"
            onClick={() =>
              setMode((mode) => (mode === "work" ? "break" : "work"))
            }
          ></i>
        </div>
        <h2>{mode}</h2>
      </div>
      <div className="flex-center">
        {taskId && (
          <div className="promodoro-task">
            <h3 className="margin-b-md">{getCurrentTask[0].title}</h3>
            <p>{getCurrentTask[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
