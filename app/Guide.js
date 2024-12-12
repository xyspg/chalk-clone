import Link from "next/link";
import React, { useCallback } from "react";
import { useAtom } from "jotai";
import { showGuideAtom } from "@/lib/atoms";

export default function Guide() {
  const clearCache = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const handleClearCache = useCallback(() => {
    window.confirm("确定要清除本地数据及缓存吗？") && clearCache();
  }, [clearCache]);
  const [showGuide, setShowGuide] = useAtom(showGuideAtom);

  return (
    <main className="text-slate-700 mb-4">
      <div className="bg-white h-28 p-8 flex flex-col gap-1">
        <h1 className="text-left text-2xl font-bold">希悦模拟器</h1>
        <p className="text-left text-sm text-slate-500">基于 Web 的希悦模拟</p>
      </div>

      <div className="px-6 py-3">
        <br />
        <h2 className="text-center text-xl font-medium mb-2">使用说明</h2>
        <p>
          在{" "}
          <Link className="text-blue-500 hover:opacity-70" href="/settings">
            设置
          </Link>{" "}
          中设置姓名及学号后即可尝试。 如需更改请假时间等信息，请在
          <Link
            href="/simulator"
            className="text-blue-500 cursor-pointer hover:opacity-70 px-1"
          >
            请假模拟器
          </Link>
          中，点击底部评论按钮输入「edit」即可编辑，点击日期、课程等可以修改相应信息。在评论中输入任意其他内容退出编辑。
        </p>
        <br />
        <p>
          这个项目均已添加对 PWA
          的支持，这意味着你可以做到无需打开浏览器，直接点击主屏幕上的图标，就可以访问内容。操作方式因操作系统和浏览器而异。
          <br />
          <br />
        </p>
        <p>在 Safari (iOS) 上，点击下方“分享”按钮，再点击“添加至主屏幕”</p>
        <p>在 Chrome (Android) 上，点击右上角菜单按钮，再点击“添加至主屏幕”</p>
        <p>在 Firefox (Android) 上，点击右上角菜单按钮，再点击“安装”</p>
        <br />
        <p>
          所有信息的更改保存在本地
          <Link
            href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API"
            target="_blank"
            className="text-blue-500 cursor-pointer hover:opacity-70 mx-1"
            rel="noopenner noreferer"
          >
            localStorage
          </Link>
          中，仅当前域可访问。
        </p>
        {/*<p>*/}
        {/*  请尽量避免使用校园网访问该网站，避免被深信服上网管理系统记录并审查。*/}
        {/*</p>*/}
        <p>本项目仅作为学习交流使用。</p>
        <br />
        <div className="w-full flex justify-center">
          <Link href="/">
            <button
              className="px-2 py-1 w-24 rounded-md text-md font-medium text-center bg-red-500 text-white cursor-pointer hover:opacity-70"
              onClick={() => {
                setShowGuide(false);
              }}
              data-umami-event="不再显示"
            >
              不再显示
            </button>
          </Link>
        </div>
        <div className="mt-12 mb-24 flex flex-row justify-around gap-2">
          <Link
            className="text-xs  text-slate-500 cursor-pointer hover:opacity-70"
            href="https://t.me/chalk_sb"
            target="_blank"
            rel="noopenner noreferer"
            data-umami-event="访问 Telegram 链接"
          >
            Telegram
          </Link>
        </div>
      </div>
    </main>
  );
}
