"use client";
import React from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { zhCN } from "date-fns/locale";

export default function DatePicker({ date, dateSubmit }) {
  const [selected, setSelected] = React.useState();
  const today = format(new Date(), "yyyy-MM-dd", { locale: zhCN });
  const [selectedDate, setSelectedDate] = React.useState(today);
  React.useEffect(() => {
    if (selected) {
      setSelectedDate(format(selected, "yyyy-MM-dd"));
      dateSubmit(format(selected, "yyyy-MM-dd"));
    }
  }, [selected]);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "yyyy-MM-dd")}.</p>;
  }
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <span className="text-gray-600 text-sm">{selectedDate}</span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded p-5 w-full max-w-2xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <div className="flex flex-col">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
              />
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
    </>
  );
}
