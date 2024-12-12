"use client";
import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

const TODO = () => {
  const [todos, setTodos] = useState([
    { type: "问卷", title: "科普讲座兴趣问卷", ddl: "", completed: false },
    {
      type: "作业",
      title: "每日委托 (0/4)",
      ddl: "明天 03:59",
      completed: false,
    },
    { type: "资料", title: "课上PPT", ddl: "", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("氧化还原反应PPT");
  const [todoType, setTodoType] = useState("资料");
  const [todoDDL, setTodoDDL] = useState("本周六 23:59");

  useEffect(() => {
    const fetchTodos = () => {
      const initialTodoList = JSON.parse(localStorage.getItem("todos")) || [
        { type: "问卷", title: "科普讲座兴趣问卷", ddl: "", completed: false },
        {
          type: "作业",
          title: "每日委托 (0/4)",
          ddl: "明天 03:59",
          completed: false,
        },
        { type: "资料", title: "课上PPT", ddl: "", completed: true },
      ];
      setTodos(initialTodoList);
    };

    if (typeof window !== "undefined") {
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoObj = {
        type: todoType,
        title: newTodo,
        ddl: todoDDL,
        completed: false,
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleClearTodos = () => {
    setTodos(uncompletedTodos);
  };

  const count = todos.filter((todo) => !todo.completed).length;
  return (
    <div>
      <div className="rounded-xl shadow-xs bg-white p-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-neutral-500 text-sm">未处理代办 {count}</div>
          <div className="inline-flex flex-row items-center gap-0.5">
            <span className="text-neutral-600 text-[14px]">全部代办</span>
            <svg
              width={12}
              height={12}
              viewBox="0 0 256 512"
              color="rgba(6, 12, 25, 0.65)"
            >
              <path
                fill="currentColor"
                d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=""></div>
          <ul className="mt-4">
            <AnimatePresence>
              {todos.map((todo, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="flex flex-col p-1 mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="inline-flex flex-row items-center ">
                      <div
                        className={`${
                          todo.type === "问卷"
                            ? `bg-[#EEECFD] text-[#6450B8]`
                            : todo.type === "资料"
                            ? `bg-[#CDE6E5] text-[#317572]`
                            : `bg-amber-100 text-amber-500`
                        } w-10 px-1 py-0.5 text-[12px] font-bold rounded-full text-center`}
                      >
                        {todo.type}
                      </div>
                      <li
                        key={index}
                        className={`font-bold ml-2 mb-1 rounded w-80 ${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                        onClick={() => handleToggleComplete(index)}
                      >
                        {todo.title}
                      </li>
                    </div>
                    <p className="text-neutral-400 text-[12px] ">
                      {todo.ddl ? todo.ddl : "无截止时间"}
                    </p>
                  </motion.div>
                </React.Fragment>
              ))}
            </AnimatePresence>
          </ul>
          <Popover.Root>
            <Popover.Trigger asChild>
              <p className=" text-blue-600 text-sm" aria-label="Update todos">
                添加代办
              </p>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <div className="flex flex-col gap-2.5">
                  <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                    添加代办
                  </p>
                  <fieldset className="flex gap-5 items-center">
                    <label
                      className="text-[13px] text-violet11 w-[75px]"
                      htmlFor="type"
                    >
                      类别
                    </label>
                    <input
                      className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                      id="width"
                      defaultValue="资料"
                      value={todoType}
                      onChange={(e) => setTodoType(e.target.value)}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleAddTodo();
                      }}
                    />
                  </fieldset>
                  <fieldset className="flex gap-5 items-center">
                    <label
                      className="text-[13px] text-violet11 w-[75px]"
                      htmlFor="content"
                    >
                      内容
                    </label>
                    <input
                      className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                      id="content"
                      defaultValue="氧化还原反应PPT"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleAddTodo();
                      }}
                    />
                  </fieldset>
                  <fieldset className="flex gap-5 items-center">
                    <label
                      className="text-[13px] text-violet11 w-[75px]"
                      htmlFor="ddl"
                    >
                      截止时间
                    </label>
                    <input
                      className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                      id="ddl"
                      defaultValue="本周六 23:59"
                      value={todoDDL}
                      onChange={(e) => setTodoDDL(e.target.value)}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleAddTodo();
                      }}
                    />
                  </fieldset>
                  <button
                    className="bg-blue-500 text-white p-2 rounded-xl mt-2"
                    onClick={handleAddTodo}
                  >
                    添加新代办
                  </button>
                  <button
                    c
                    className={`text-red-700 text-sm text-center mt-1 ${
                      completedTodos.length === 0 ? "opacity-50" : ""
                    }`}
                    onClick={handleClearTodos}
                    disabled={completedTodos.length === 0}
                  >
                    清空已完成代办
                  </button>
                </div>
                <Popover.Close
                  className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </Popover.Close>
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
};

export default TODO;
