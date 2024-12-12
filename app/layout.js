"use client";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { Theme } from "@radix-ui/themes";
import { Provider } from "jotai";

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <title>教学管理系统</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/icon.png" />
        <link rel="favicon" href="/favicon.ico" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e05e013b-82c4-476f-8eb3-a9d20d5a9623"
          data-domains="chalk-c3.seiue.top"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="希悦 - 好用的教学管理系统" />
      </head>
      <body>
        <Theme>
          <Provider>
            <div className="bg-neutral-100 min-h-screen">
              {children}
              {/*<Analytics />*/}
            </div>
          </Provider>
        </Theme>
      </body>
    </html>
  );
}
