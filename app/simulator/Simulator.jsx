"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CommentBox from "@/components/CommentBox";

import leftArrow from "@/public/static/left-arrow.png";
import succeed from "@/public/static/animated-approved.gif";
// import succeed from "@/public/static/succeed.png";

import { addDays, format, subDays } from "date-fns";
import { zhCN } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  idAtom,
  infoAtom,
  nameAtom,
  parentAtom,
  settingAtom,
  multiLeaveAtom,
} from "@/lib/atoms";
import { useHasMounted } from "@/lib/clientOnly";
import AES from "crypto-js/aes";

const LeavePage = () => {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const [preventClick, setPreventClick] = useState(
    process.env.NODE_ENV === "production",
  );

  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(
    new Date(new Date().setDate(new Date().getDate() - 1)),
    "MM-dd",
  );
  const [info, setInfo] = useAtom(infoAtom);

  const handleEditable = () => {
    setPreventClick(false);
  };
  const handleExit = () => {
    setPreventClick(true);
  };

  const handlePrompt = (key, message, currentValue, defaultValue) => {
    if (preventClick) return;
    const newValue = window.prompt(message, currentValue);
    if (newValue !== "" && newValue !== null) {
      setInfo((prevInfo) => ({ ...prevInfo, [key]: newValue }));
    } else if (newValue === "") {
      setInfo((prevInfo) => ({ ...prevInfo, [key]: defaultValue }));
    }
  };

  const handleDateSubmit = (date) => {
    setInfo({ ...info, startDate: date });
  };
  const dateToFormat = new Date(today);

  const handleCollapsible = () => {
    setCollapsibleOpen(!collapsibleOpen);
  };

  const {
    leaveNo,
    leaveTime,
    leaveClass,
    duration,
    reason,
    department,
    approver,
  } = info;
  const [name] = useAtom(nameAtom);
  const [id] = useAtom(idAtom);
  const [parent] = useAtom(parentAtom);

  /**
   * Multi Leave
   */
  const [settings] = useAtom(settingAtom);
  const multiLeaveEnabled = settings.multi_leave_enabled;
  const [multileave] = useAtom(multiLeaveAtom);

  const generateDateRanges = () => {
    const result = {};
    const startDate = subDays(new Date(), 5); // Start date is 5 days prior
    const endDate = addDays(new Date(), 10); // End date is 10 days later

    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const formattedDate = format(currentDate, "M月d日 EE", { locale: zhCN });
      const timeRange = multileave[dayOfWeek];

      if (timeRange) {
        result[formattedDate] = timeRange;
      }

      currentDate = addDays(currentDate, 1);
    }

    return result;
  };
  const multiLeaveDates = Object.entries(generateDateRanges());

  const [multiCollapsibleOpen, setMultiCollapsibleOpen] = useState({});

  const handleMultiCollapsible = (date) => {
    setMultiCollapsibleOpen((prevOpen) => ({
      ...prevOpen,
      [date]: !prevOpen[date],
    }));
  };

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>希悦请假模拟器</title>
      </Head>
      <main className="mb-12">
        {/*Header*/}
        <div className="fixed top-0 w-full z-10">
          <div className="bg-white flex flex-row items-center justify-between px-2 py-2">
            <Link href="/messages">
              <Image
                className="pointer-cursor w-6"
                src={leftArrow}
                alt="left"
                height="25"
                width="25"
              />
            </Link>
            <p className="font-bold text-lg">
              {parent ? `${parent}发起的家长代请假` : `我发起的学生请假`}
            </p>
            <div className="w-6" />
          </div>
        </div>

        {/*Body*/}
        <div className="pt-[2.9rem]" />
        <hr className="h-1 border-none bg-neutral-100" />
        <div className="bg-slate-200">
          <div className=" flex flex-col bg-white py-4 px-4">
            <div className="relative flex flex-col gap-6  ">
              <section>
                <p className="font-medium text-md mb-1">发起人</p>
                <p className="text-gray-600 text-sm">{`${name} /${id}`}</p>
              </section>
              <section
                onClick={() => {
                  handlePrompt("leaveNo", "修改编号：", leaveNo, "2483436");
                }}
              >
                <p className="font-medium text-md">审批编号</p>
                <p className="text-gray-600 text-sm">{leaveNo}</p>
              </section>
              <section>
                <p className="font-medium text-md">审批状态</p>
                <div className="flex items-center">
                  <span className="h-2.5 w-2.5 mr-1.5 mt-2 mb-2 bg-green-500 rounded-full inline-block"></span>
                  <p className="text-gray-400 text-sm">已通过</p>
                </div>
              </section>
            </div>
            <Image
              className="absolute right-4 transform rotate-[30deg]"
              width="70"
              alt="succeed"
              height="70"
              src={succeed}
            />
          </div>

          <hr className="h-1.5 border-none bg-neutral-100" />

          <div className="bg-white">
            <div className="flex flex-col py-4 px-4">
              <div className="flex flex-col gap-6">
                <section>
                  <p className="font-medium text-md mb-[-2.5]">请假人</p>
                  <p className="text-gray-600 text-sm">{name}</p>
                </section>
                <section>
                  <p className="font-medium text-md">请假类型</p>
                  <p className="text-gray-600 text-sm">事假</p>
                </section>
                <section>
                  <p className="font-medium text-md">开始日期</p>
                  <p className="text-gray-600 text-sm">{today}</p>
                </section>
                <section>
                  <p className="font-medium text-md">结束日期</p>
                  <p className="text-gray-600 text-sm">{today}</p>
                </section>
                <section>
                  <p className="font-medium text-md">时间跨度</p>
                  <p className="text-gray-600 text-sm">
                    {multiLeaveEnabled
                      ? multiLeaveDates.length + " 天"
                      : "1 天"}
                  </p>
                </section>
                <section>
                  <p className="font-medium text-md mb-1">请假时间</p>
                  {multiLeaveEnabled ? (
                    <>
                      <div className="bg-[#F0F0F4] max-h-72 overflow-auto rounded-md">
                        {multiLeaveDates.length === 0 && (
                          <p className="text-gray-600 text-sm ml-4 py-1.5 mt-1">
                            请先选择长期请假时间段，或关闭长期请假功能
                          </p>
                        )}
                        {multiLeaveDates.map((date, idx) => (
                          <React.Fragment key={idx}>
                            {/*X月X日 周X*/}
                            <div
                              className="bg-[#F3F4F7] h-12 w-full flex flex-row items-center justify-between rounded-md px-1"
                              onClick={() => handleMultiCollapsible(date[0])}
                            >
                              <p className="text-gray-700 px-2 text-md font-normal">
                                {date[0]}
                              </p>
                              <motion.svg
                                viewBox="0 0 256 512"
                                color="#9398A1"
                                className="mr-2"
                                width={24}
                                height={24}
                                animate={{
                                  rotate: multiCollapsibleOpen[idx] ? -180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <path
                                  fill="currentColor"
                                  d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"
                                ></path>
                              </motion.svg>
                            </div>
                            <AnimatePresence>
                              {multiCollapsibleOpen[date[0]] && (
                                <motion.div className="h-68 w-full mb-2">
                                  <p className="text-gray-500 text-sm ml-3 py-0.5 mt-1">
                                    {date[1]}
                                  </p>
                                  <p className="text-gray-500 text-sm ml-3 py-0.5">
                                    不包含课节
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  ) : (
                    <motion.div className="bg-[#F0F0F4] min-h-fit rounded-md w-full flex flex-col justify-start my-1">
                      {/*X月X日 周X*/}
                      <div
                        className="bg-[#F3F4F7] h-12 w-full flex flex-row items-center justify-between rounded-md px-1"
                        onClick={handleCollapsible}
                      >
                        <p className="text-gray-700 px-3 text-md font-normal">
                          {!isNaN(dateToFormat) &&
                            format(dateToFormat, "M月d日 EE", {
                              locale: zhCN,
                            })}
                        </p>
                        <motion.svg
                          viewBox="0 0 256 512"
                          color="#9398A1"
                          className="mr-2"
                          width={24}
                          height={24}
                          animate={{ rotate: collapsibleOpen ? -180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            fill="currentColor"
                            d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"
                          ></path>
                        </motion.svg>
                      </div>
                      <AnimatePresence>
                        {collapsibleOpen && (
                          <motion.div className="h-68 w-full mb-2">
                            <p
                              className="text-gray-500 text-sm ml-4 py-1.5 mt-1"
                              onClick={() => {
                                handlePrompt(
                                  "leaveTime",
                                  "修改时间：",
                                  leaveTime,
                                  "16:00-17:30",
                                );
                              }}
                            >
                              {leaveTime}
                            </p>
                            <p
                              className="text-gray-700 text-sm ml-4 pb-1.5"
                              onClick={() => {
                                handlePrompt(
                                  "leaveClass",
                                  "修改课程：",
                                  leaveClass,
                                  "自习课 4-6 1 包含课节: 第9节（1人）",
                                );
                              }}
                            >
                              {leaveClass}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </section>

                {!multiLeaveEnabled && (
                  <section>
                    <p className="font-medium text-md">课节数</p>
                    <p className="text-gray-600 text-sm">1节</p>
                  </section>
                )}

                <section>
                  <p className="font-medium text-md">请假时长</p>
                  {multiLeaveEnabled ? (
                    <p className="text-gray-600 text-sm">{"55小时15分钟"}</p>
                  ) : (
                    <p
                      className=" text-gray-600 text-sm"
                      onClick={() => {
                        handlePrompt(
                          "duration",
                          "修改时长：",
                          duration,
                          "40分钟",
                        );
                      }}
                    >
                      {duration}
                    </p>
                  )}
                </section>
              </div>
            </div>
            <hr className="h-1 border-none bg-neutral-100" />
          </div>
        </div>

        <div className="bg-white">
          <div className="flex flex-col py-4 px-4">
            <div className="flex flex-col gap-6">
              <section
                onClick={() => {
                  if (preventClick) return;
                  department === "国际部"
                    ? setInfo({ ...info, department: "高中本部" })
                    : setInfo({ ...info, department: "国际部" });
                }}
              >
                <p className="font-medium text-md mb-[-2.5]">所在部门</p>
                <p className="text-gray-600 text-sm">{department}</p>
              </section>
              <section
                onClick={() => {
                  handlePrompt("reason", "修改原因：", reason, "我想去吃饭");
                }}
              >
                <p className="font-medium text-md">请假原因</p>
                <p className="text-gray-600 text-sm">{reason}</p>
              </section>
              <section>
                <p className="font-medium text-md mb-2">请假附件</p>
                <div className="bg-[#F6F7FA] h-12 rounded-md w-full flex flex-row items-center px-4">
                  <div className="flex flex-row items-center">
                    <svg
                      width="15"
                      height="15"
                      fill="#F6F7FA"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-48-244v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12z"
                      ></path>
                    </svg>
                    <p className="text-gray-800 text-sm font-light ml-2">
                      image.jpg
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <hr className="h-1 border-none bg-neutral-100" />
        </div>

        <div className="bg-white">
          <hr className="h-1 border-none bg-neutral-100" />

          <section>
            <div className="p-4 px-6 flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
                  {/*
                  头像
                  */}
                  <div className="my-2 w-10 h-10 bg-[#70CFB2] rounded-full flex justify-center items-center">
                    <p className="text-white font-bold text-md text-[12.5px]">
                      {name.slice(-2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[15px] font-bold">发起人</h3>
                    <p className="text-[13px] text-slate-500">{name}</p>
                  </div>
                </div>
                {/*
              时间
              */}
                <p className="pt-2 text-slate-500 text-[12px]">
                  {yesterday}&nbsp;14:23
                </p>
              </div>

              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
                  {/*
                  头像
                  */}
                  <div className="my-2 w-10 h-10 bg-[#739DF7] rounded-full flex justify-center items-center">
                    <p className="text-white font-bold text-md text-[12.5px]">
                      {approver ? approver.slice(-2) : "周丽"}
                    </p>
                  </div>
                  <div
                    className="flex flex-col gap-0.5"
                    onClick={() => {
                      handlePrompt(
                        "approver",
                        "修改审批人：",
                        approver,
                        "周丽",
                      );
                    }}
                  >
                    <h3 className="text-[15px] font-bold">审批人</h3>
                    <p className="text-[13px] text-slate-500">
                      {approver ? approver : "周丽"}&nbsp;已通过
                    </p>
                  </div>
                </div>
                {/*
              时间
              */}
                <p className="pt-2 text-slate-500 text-[12px]">
                  {today.slice(5, 10)}&nbsp;14:43
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="fixed bottom-0 h-16 w-full bg-white flex flex-col pt-2 ">
        <CommentBox reportEditable={handleEditable} reportExit={handleExit} />
      </footer>
    </>
  );
};

export default LeavePage;
