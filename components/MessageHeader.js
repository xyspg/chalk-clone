import React from "react";
import Link from "next/link";
import Image from "next/image";
import leftArrow from "@/public/static/left-arrow.png";

const MessageHeader = () => {
  return (
    <>
      <div className="bg-white ">
        <div className="flex flex-row justify-between items-center px-3 relative">
          <div className="w-20">
            <Link href="/home">
              <Image
                className="pointer-cursor"
                src={leftArrow}
                alt="left"
                height="23"
                width="23"
              />
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <p className="font-medium text-lg py-3">消息</p>
          </div>
          <div className="w-20 inline-flex flex-row gap-x-7">
            <svg
              width="22"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M636.52 31.02l-19.92-25c-5.5-6.9-15.57-8.05-22.49-2.56L363.38 181.38l-34.72-43.56c-4.82-6.05-14.03-6.02-18.81.06l-57.61 73.18c-31.09.74-103.98 6.65-151.87 44.66C38.28 304.99 0 511.31 0 511.31c15.1.66 212.37 7.35 272.15-40.1 47.71-37.87 70-107.39 77.79-137.63l84.34-39.52c7.02-3.29 9.13-12.28 4.29-18.35l-35.34-44.34 230.73-177.9c6.92-5.5 8.06-15.54 2.56-22.45zM242.27 433.73c-16.64 13.21-74.29 28.51-182.8 30.21 4.76-19.1 10.1-38.18 15.8-56.35l45.29-35.95c4.96-3.94 1.23-11.88-4.97-10.57l-26.06 5.5c13.43-35.28 27.73-63.05 40.72-73.36 27.04-21.46 71.32-31.04 109.74-33.53l59.81 75.03c-9.44 30.94-28.14 75.69-57.53 99.02zm88.06-143.88l-39.78-49.91 24.22-30.77c2.39-3.04 7-3.05 9.41-.03l43.77 54.91c2.42 3.03 1.37 7.53-2.15 9.17l-35.47 16.63z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 flex justify-between">
        <section className="inline-flex flex-row gap-4 text-md ">
          <div className="text-slate-500">未读</div>
          <div className="text-black underline underline-offset-[1.1rem] decoration-blue-600 decoration-2">
            {" "}
            全部{" "}
          </div>
        </section>
        <svg
          width="16"
          height="16"
          viewBox="0 0 512 512"
          color="rgba(6, 12, 25, 0.65)"
        >
          <path
            fill="currentColor"
            d="M463.952 0H48.057C5.419 0-16.094 51.731 14.116 81.941L176 243.882V416c0 15.108 7.113 29.335 19.2 40l64 47.066c31.273 21.855 76.8 1.538 76.8-38.4V243.882L497.893 81.941C528.042 51.792 506.675 0 463.952 0zM288 224v240l-64-48V224L48 48h416L288 224z"
          ></path>
        </svg>
      </div>
      <hr className="h-1 border-none bg-slate-200" />
    </>
  );
};

export default MessageHeader;
