import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {TbPlayerPauseFilled} from 'react-icons/tb'
import { BsFillPlayFill } from "react-icons/bs";
import { FaRedoAlt } from "react-icons/fa";
import { useCurrentStore } from "../store/store";
import { updateTask } from "../lib/updateTask";
import check from "/check.mp3";
import timetostart from "/timetostart.mp3";

const Timer = ({
  settings,
  currentTask,
  setUpdate,
  update
}: {
  settings: Settings;
  currentTask: Task | null;
  setUpdate:Dispatch<SetStateAction<boolean>>
  update:boolean
}) => {
  const session = 60*settings.pomodoroLength
  const ShortBreak = 60 * settings.shortBreakLength;
  const LongBreak = 60 * settings.longBreakLength;
  const sessionsNumBeforeLongBreak = settings.numPomodorosBeforeLongBreak
const checkSound = new Audio(check);
const timetostartSound = new Audio(timetostart);




  //? this just for testing timer
// const session = 7;
// const ShortBreak = 2;
// const LongBreak = 5;
// const sessionsNumBeforeLongBreak = settings.numPomodorosBeforeLongBreak;

  // todo see if this is good for ux or not
  // const autoStartNextPomodoro = settings.autoStartNextPomodoro;

  const [seconds, setSeconds] = useState(session);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<
    "pomodoro" | "shortBreak" | "longBreak"
  >("pomodoro"); // can be "pomodoro", "shortBreak", or "longBreak"
  const [theNumberOfSessions, setTheNumberOfSessions] = useState(0);
  const setCurrentTask = useCurrentStore((state) => state.setCurrentTask);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((currentSeconds) => {
          if (
            sessionType === "pomodoro" &&
            theNumberOfSessions === sessionsNumBeforeLongBreak &&
            currentSeconds === 0
          ) {
            clearInterval(intervalId!);
            setIsRunning(false);
            setTheNumberOfSessions(0);

            setSessionType("longBreak");
            if (currentTask !== null) {
              const updatedTask = {
                ...currentTask,
                completedSubTasks: currentTask!.completedSubTasks + 1,
              };
              setCurrentTask(updatedTask);
              updateTask(updatedTask);
              if (updatedTask.completedSubTasks === updatedTask.totalSubTasks) {
                updatedTask.completed = true;
                updateTask(updatedTask);
                setCurrentTask(null);
                setSessionType("pomodoro");
                setUpdate(!update)
                checkSound.play()
                return session;
              }
            }
            checkSound.play();
            setUpdate(!update);
            return LongBreak;
          }
          if (sessionType === "pomodoro") {
            if (currentSeconds === 0) {
              clearInterval(intervalId!);
              setIsRunning(false);
              setTheNumberOfSessions(theNumberOfSessions + 1);
              setSessionType("shortBreak");
              if (currentTask !== null) {
                const updatedTask = {
                  ...currentTask,
                  completedSubTasks: currentTask!.completedSubTasks + 1,
                };
                setCurrentTask(updatedTask);
                updateTask(updatedTask);
                if (
                  updatedTask.completedSubTasks === updatedTask.totalSubTasks
                ) {
                  updatedTask.completed = true;
                  updateTask(updatedTask);
                  setCurrentTask(null);
                  setSessionType("pomodoro");
checkSound.play();
setUpdate(!update)                 
 return session;
                }
              }
              checkSound.play();
             setUpdate(!update);
              return ShortBreak;
            }
          }
          if (sessionType === "shortBreak") {
            if (currentSeconds === 0) {
              clearInterval(intervalId!);
              setIsRunning(false);

              setSessionType("pomodoro");
              timetostartSound.play();
              return session;
            }
          }
          if (sessionType === "longBreak") {
            if (currentSeconds === 0) {
              clearInterval(intervalId!);
              setIsRunning(false);
              setTheNumberOfSessions(0);

              setSessionType("pomodoro");
              timetostartSound.play();
              return session;
            }
          }
          return currentSeconds - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId!);
  }, [isRunning]);


  
  const handleStart = () => {
    setIsRunning(true);
  }
  const handlePause = () =>{
     setIsRunning(false);
    }
  const handleReset = () => {

    if (sessionType === "pomodoro") {
      setSeconds(session);
    }
    if (sessionType === "shortBreak") {
      setSeconds(ShortBreak);
    }
    if (sessionType === "longBreak") {
      setSeconds(LongBreak);
    }
    setIsRunning(false);
  };

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = `${seconds % 60}`.padStart(2, "0");
  const progressWidth = 100 - (seconds * 100) / session;

  return (
    <>
      <section className="      duration-200 transition-all group      backdrop-blur-md flex flex-col justify-between ">
        <div className="p-1">
          <CircularProgressbar
            className={`fill-white font-bold text-sm ${
              progressWidth === 100 ? "stroke-main100" : "stroke-main100/50"
            }  `}
            value={progressWidth}
            strokeWidth={15}
            text={`${minutes}:${formattedSeconds}`}
          />
        </div>

        <div className=" p-2 h-16 rounded-xl ">
          {currentTask === null ? (
            <>
              <button
                className="text-xs bg-darkform/20  shadow duration-100 transition-all flex z-30  w-full  h-full  justify-center items-center font-bold rounded-full"
                disabled={isRunning}
              >
                shose a task
              </button>
            </>
          ) : (
            <>
              {!isRunning ? (
                <button
                  className=" bg-darkform  active:brightness-110 shadow-sm shadow-black hover:shadow-main100 duration-100 transition-all flex z-30  w-full  h-full  justify-center items-center text-2xl font-bold rounded-full"
                  onClick={handleStart}
                  disabled={isRunning}
                >
                  <div className="text-xs w-full h-full rounded-full  flex justify-center items-center p-2 hover:bg-gradient-to-br from-main100 to-main200">
                    {sessionType === "pomodoro"
                      ? "start pomodoro"
                      : sessionType === "shortBreak"
                      ? "start short break"
                      : "start long break"}
                    <BsFillPlayFill className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                  </div>
                </button>
              ) : (
                <section className="bg-darkform shadow-sm hover:shadow-main100 shadow-black rounded-full  duration-100 transition-all  flex z-30  w-full  h-full  justify-center items-center text-2xl font-bold">
                  <div className=" w-full h-full rounded-full  flex justify-center items-center ">
                    <button
                      onClick={handlePause}
                      disabled={!isRunning}
                      className="active:brightness-110 rounded-l-full hover:bg-gradient-to-br from-main100 to-main200 w-full  h-full flex justify-center items-center  duration-100 transition-all"
                    >
                      <TbPlayerPauseFilled className="w-4 h-4 sm:w-6 sm:h-6  " />
                    </button>
                  </div>
                  <div className=" w-full h-full rounded-full  flex justify-center items-center  hover:bg-gradient-to-br from-main100 to-main200">
                    <button
                      className="active:brightness-110 rounded-r-full hover:bg-gradient-to-br from-main100 to-main200 w-full  h-full flex justify-center items-center  duration-100 transition-all"
                      onClick={handleReset}
                    >
                      <FaRedoAlt className="w-4 h-4 sm:w-6 sm:h-6 " />
                    </button>{" "}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

      </section>
    </>
  );
};

export default Timer