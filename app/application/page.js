import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const bg =
    "data:image/png;base64,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";
  return (
    <>
      <div className="py-3 px-6">
        <h1 className="text-2xl text-gray-700 font-bold">应用中心</h1>
      </div>
      <div className="bg-[#EFF3FE] mx-auto w-11/12 h-12 rounded-md mt-1 p-4 flex flex-row justify-between relative hover:opacity-70 pointer-cursor">
        <Link
          href="https://cdn.mtdv.me/video/rick.mp4"
          rel="noopener noreferrer"
          target="_blank"
          className="absolute inset-0"
          data-umami-event="被 rickroll"
        />
        <div className="flex items-center w-full">
          <div className="flex items-center w-full">
            <div
              className="w-[70px] max-w-1/5 h-7 bg-cover bg-no-repeat "
              style={{
                backgroundImage: `url(${bg})`,
              }}
            />
            <p className="pl-1 text-gray-600 font-medium text-sm">
              手机版不够用？进入桌面版
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={15}
            height={15}
            color="rgba(6, 12, 25, 0.45)"
          >
            <path
              fill="currentColor"
              d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-107.5 8.5L225.7 387.3c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l91.7-91.7-91.7-91.7c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l122.8 122.8c4.7 4.7 4.7 12.3 0 17z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

const Apps = () => {
  const appList = [
    {
      icon: "data:image/png;base64,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",
      title: "请假",
      href: "/simulator",
    },
    {
      icon: "/static/chair.jpg",
      title: "审批中心",
      href: "http://banshi.beijing.gov.cn/pubtask/task/1/110108000000/5ec2ac9e-5144-4b96-80c4-e8e1fadd331c.html",
    },
    // {
    //   icon: "/static/donate.png",
    //   title: "捐赠",
    //   href: "/donation",
    // }
    // {
    //   icon: "/static/genshin.png",
    //   title: "原神",
    //   href: "https://ys.mihoyo.com/",
    // },
    // {
    //   icon: "/static/shadowrocket.webp",
    //   title: "Shadowrocket",
    //   href: "https://apps.apple.com/us/app/shadowrocket/id932747118",
    // },
    // {
    //   icon: "/static/bika.png",
    //   title: "PicACG",
    //   href: "https://apps.apple.com/cn/app/%E5%9B%BD%E5%AE%B6%E5%8F%8D%E8%AF%88%E4%B8%AD%E5%BF%83/id1552823102",
    // },
  ];

  return (
    <>
      <div className="mx-4 my-4 p-1">
        <h2 className="mb-4 font-bold text-md text-gray-800">全部应用</h2>
        <div className=" p-2 flex flex-row flex-wrap gap-x-6 gap-y-8">
          {appList.map((app) => (
            <>
              <div className="w-16 h-16 rounded-md flex flex-col items-center gap-2 relative cursor-pointer hover:opacity-70">
                <div className="h-14">
                  <Image
                    src={app.icon}
                    alt={app.title}
                    height={45}
                    width={45}
                    className="rounded-md"
                  />
                </div>
                <p className="text-xs text-gray-600">{app.title}</p>
                <Link
                  href={app.href}
                  target={app.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopenner noreferer"
                  className="absolute inset-0"
                  data-umami-event={"访问" + app.title}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

const Application = () => {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <Apps />
      <Footer />
    </main>
  );
};

export default Application;
