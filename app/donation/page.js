"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import NewFeatures from "@/app/donation/NewFeatures";
import Link from "next/link";

const Page = () => {
  const handleClick = (e) => {
    if (window.navigator.userAgent.includes("MicroMessenger")) {
      alert("检测到您处于微信内浏览器，请先按右上角使用浏览器打开");
      e.preventDefault()
    }
  };
  return (
    <>
      <div className="bg-white p-8 ">
        <h1 className="text-3xl font-bold">捐助</h1>
      </div>
      <div className="px-8 my-2 text-lg text-neutral-700">
        <p>
          本项目的服务器、域名开销都是用爱发电的。如果我们有帮助到您，请考虑捐助我们
          🥰
        </p>
      </div>
      <div className="px-8 mb-2 text-lg text-neutral-700">
        为了感谢您的捐助，在您捐助后，您将可以使用一些新功能，例如：
      </div>
      <div className="mx-6 p-4 shadow-md bg-slate-200/90 rounded-md ">
        <NewFeatures />
      </div>
      <div className="mt-8 flex justify-center">
        <Button color="crimson" size="4" onClick={handleClick}>
          <a
            href="https://atri.lemonsqueezy.com/checkout/buy/04285fa3-04ec-4335-8dad-b481b4c347a6?embed=1"
            className="lemonsqueezy-button"
          >
            点击发电
          </a>
        </Button>
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
      </div>
      <div className="mt-2 flex justify-center">
        <Link href="/donation/activate">
          <Button color="violet" size="2">
            完成发电
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Page;
