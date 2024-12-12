"use client";
import TODO from "@/components/TODO";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useAtom } from "jotai";
import { nameAtom } from "@/lib/atoms";

export default function Home() {
  const [name] = useAtom(nameAtom)
  return (
    <>
      <header className="h-14 bg-blue-600 px-4 py-2 ">
        <h1 className="text-white text-[17px] font-bold">{name ? name : '希悦校园'}</h1>
        <p className="text-white text-[10px]">北大附中(高中本部)｜ 学生</p>
      </header>
      <main className="bg-neutral-100 min-h-screen">
        <div className="flex flex-col justify-center p-4 gap-2">
          <section className="rounded-xl shadow-xs bg-white p-4 flex justify-between relative hover:opacity-70">
            <span className="text-neutral-500 text-sm">通知全部已读</span>
            <div className="inline-flex flex-row items-center gap-0.5">
              <span className="text-neutral-600 text-[14px]">全部通知</span>
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
            <Link href="/messages" className="absolute inset-0" />
          </section>

          <TODO />

          <section className="rounded-xl shadow-xs bg-white p-4 flex justify-between relative hover:opacity-70">
            <span className="text-neutral-500 text-sm">消息全部已读</span>
            <div className="inline-flex flex-row items-center gap-0.5">
              <span className="text-neutral-600 text-[14px] ">全部消息</span>
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
            <Link href="/messages" className="absolute inset-0" />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
