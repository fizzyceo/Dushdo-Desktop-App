import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import MainNav from "../components/MainNav";
import Task from "../components/Task";
import Timer from "../components/Timer";
import { ScrollArea } from "../components/ui/scrollarea";
import SoundsNav from "../components/SoundsNav";
import Header from "../components/Header";


function Home() {
  const tasks: Task[] = [
    {
      id: "1",
      name: "Complete Math Homework",
      description: "Complete questions 1-10 in Chapter 5 of the textbook",
      dueDate: new Date("2023-03-22T18:00:00Z"),
      repeatDaily: false,
      duration: 90,
      completedSubTasks: 10,
      totalSubTasks: 10,
      completed: false,
    },
    {
      id: "3",
      name: "Paint Living Room",
      description: "Paint the living room walls and ceiling",
      dueDate: new Date("2023-03-25T12:00:00Z"),
      repeatDaily: false,
      duration: 240,
      completedSubTasks: 1,
      totalSubTasks: 3,
      completed: false,
    },

    {
      id: "4",
      name: "Go for a Hike",
      description: "Hike to the top of a nearby mountain",
      dueDate: new Date("2023-03-27T10:00:00Z"),
      repeatDaily: false,
      duration: 180,
      completedSubTasks: 2,
      totalSubTasks: 4,
      completed: false,
    },
    {
      id: "5",
      name: "Prepare for Job Interview",
      description:
        "Research the company and practice answering interview questions",
      dueDate: new Date("2023-03-24T16:00:00Z"),
      repeatDaily: false,
      duration: 120,
      completedSubTasks: 2,
      totalSubTasks: 5,
      completed: false,
    },
    {
      id: "6",
      name: "Write Blog Post",
      description: "Write a blog post on a topic of interest",
      dueDate: new Date("2023-03-28T23:59:59Z"),
      repeatDaily: false,
      duration: 90,
      completedSubTasks: 1,
      totalSubTasks: 3,
      completed: false,
    },
    {
      id: "7",
      name: "Prepare for Job Interview",
      description:
        "Research the company and practice answering interview questions",
      dueDate: new Date("2023-03-24T16:00:00Z"),
      repeatDaily: false,
      duration: 120,
      completedSubTasks: 2,
      totalSubTasks: 5,
      completed: false,
    },
    {
      id: "8",
      name: "Write Blog Post",
      description: "Write a blog post on a topic of interest",
      dueDate: new Date("2023-03-28T23:59:59Z"),
      repeatDaily: false,
      duration: 90,
      completedSubTasks: 1,
      totalSubTasks: 3,
      completed: false,
    },
  ];


  return (
    <>

      <section className="w-full h-full flex flex-col items-center p-2 gap-2">
        <ScrollArea className="h-full   w-full flex justify-center items-center rounded-md   p-4 ">
          <main className="flex gap-5 w-full justify-center ">
            <main className="flex flex-col max-w-md  items-center w-full h-full gap-2">
              <header className="flex justify-between items-center p-2  max-w-md w-full ">
                <h1 className="font-sans text-xl">Today Tasks</h1>
                <MainNav />
              </header>
              <AddTask />
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </main>
            <section className="w-80 h-full mt-16">
              <div className="w-full flex justify-center items-center">
                <main className="grid grid-cols-1 gap-2 w-44 pb-10  ">
                  <div className="w-full px-5 bg-dark200 rounded-xl border border-font/20">
                    <Timer />
                  </div>

                  <div className=" w-full h-full grid grid-cols-1  gap-2">
                    <div className="border overflow-hidden border-font/10 hover:border-font/50  bg-dark200   rounded-xl  duration-100 transition-all group   w-full h-14 backdrop-blur-md grid grid-cols-3">
                      <h1 className="bg-darkform col-span-1 rounded-lg h-full text-2xl flex justify-center items-center">
                        5
                      </h1>
                      <h1 className="col-span-2 flex justify-center items-center">
                        Hours Done
                      </h1>
                    </div>
                    <div className="border overflow-hidden border-font/10 hover:border-font/50  bg-dark200   rounded-xl  duration-100 transition-all group   w-full h-14 backdrop-blur-md grid grid-cols-3">
                      <h1 className="bg-darkform col-span-1 rounded-lg h-full text-2xl flex justify-center items-center">
                        7
                      </h1>
                      <h1 className="col-span-2 flex justify-center items-center">
                        Hours left
                      </h1>
                    </div>{" "}
                    <div className="border overflow-hidden border-font/10 hover:border-font/50  bg-dark200   rounded-xl  duration-100 transition-all group   w-full h-14 backdrop-blur-md grid grid-cols-3">
                      <h1 className="bg-darkform col-span-1 rounded-lg h-full text-2xl flex justify-center items-center">
                        10
                      </h1>
                      <h1 className=" col-span-2 flex justify-center items-center">
                        Pomodoro Done
                      </h1>
                    </div>{" "}
                    <div className="border overflow-hidden border-font/10 hover:border-font/50  bg-dark200   rounded-xl  duration-100 transition-all group   w-full h-14 backdrop-blur-md grid grid-cols-3">
                      <h1 className="bg-darkform col-span-1 rounded-lg h-full text-2xl flex justify-center items-center">
                        10
                      </h1>
                      <h1 className="col-span-2 flex justify-center items-center">
                        Pomodoro Left
                      </h1>
                    </div>
                  </div>
                </main>
              </div>
            </section>
          </main>
        </ScrollArea>
      </section>
    </>
  );
}

export default Home;