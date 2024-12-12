import React from "react";
import MessageHeader from "../../components/MessageHeader";
import MessageCard from "../../components/MessageCard";

const Messages = () => {
  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <MessageHeader />
      </div>
      <main className="bg-neutral-100 min-h-screen py-2 px-3 pt-28">
        <div className="flex flex-col justify-center">
          <MessageCard />
        </div>
      </main>
    </>
  );
};

export default Messages;
