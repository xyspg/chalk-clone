"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, subDays } from "date-fns";

const MessageCard = () => {
  const Calender = (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPjSURBVHgB7ZpNTBNBFMf/s9RoNJHGrxgTpSFROJgIhEQOEKpRPMJVLzRwVzBRb3Txph5AEo9qOelNOBIPQMCDiSEl8SAeBDExYkDLAYIRdpw32y1t6RfbnYXd+Gs22+1Ot/vre/M6O12GEomM60Gx6kAAdYBWBfAQOIJyJ0MIquFYSH6WWLMEDGMWBiZiV/SJYm9lxRoIuTACLCqehrE/SYCxEfw1+oXwQq4GeSVl5Cq0KBjvgTdYYAz6y+bocPaOnJJCMIQD7I1IkTp4DqbHWvr6M17JbiIFA2xcPA3BqzA2GGvu67U2tR0NKIJeFiQ474lMRlPdLEMyMvUw6s0UzYGmDUSmdemSkpRpCq7DT3A2QKvtSGrwShXdDeHIlB5Ok2Tt8CMGTEkzVT1ebPKhsVYrkiH4lzpTUuP+qKi5CSYjyYLwMVa6Oi554lAlnjTelsvhwKGCbRuO1+BZ033crG6DCpRJnj1yWogG5VJ/rKZg2/pjtfKLaDvTBBXIsWtkUo+JKtQJG1w/cxkd51qLRqscljcSeDU/hpmVOdhBQxk0n7qEW9U3lAoSlA3d59ttf04AZVBTGUo9n/45m7HvxMFK1Cb3f1r9iuU/ibzHqT1aJUUKHYcEKe3fZe0vhbIk03n+eTRjm6JsSU4vxQueHEWpOSlZ6Dh2KStdS2V9awN7iTLJmV9zsmDQ8m1tqWDbudUFuX77/T1U4Fi6ZrO+uYF7H4ZKakv9cNpGXysVxyS7L6i5iKHCUy6OSVKB2K+4Unj2mv+SbjO6OIkRsTiNsuq6W2gQYFVYuio5Jwb4TrEvIpkuSJdohyucHQvvuWS24IOLnalxrFMolSzWx9wQJJT1Sbr2swRXxNAue7DgliChLJK1lVXy5AmSSb+6cFOQUBZJuv6jk3/0cVgM0lczxqZuChJK+ySdvCmxHVG3BQnl1TVb1HzNPUHClZ8QS/SkkDvpsiDh2oiHpB433sFe4KkBut1plLIkrWkLN6CZhmLTKPmw0jUBG1ClpDS8JiaYVc69Lq79wOsvY3K+yA5lSRIjii6PnMRMV5a8pcunWH3SdiQ9QMKU3EIcvoXHpaS88Y77NGUNzG7/hHA+DD9iYFBL34Dv+iYfpyxNSYqNBAz+FH5iE120yhjxxFp1XazG4Qt46ibfncO6Td4litA8PA0fjLXIgEl2SEr7LX7Vo6JcRrBF701/MecAPSnaQN+I+UYPwPEbzLibHkGLUm60pzuZX2D7Rvui73ERLh4JMD4kisygLJ45KPmEpWwFD4Mx8R8dM/+n4zxkHoWFoBISATcFGElpcWwZiyIPJ4RcPJ+cxT/eAWJl4l5Q8wAAAABJRU5ErkJggg=="
      width={50}
      height={50}
      alt="calender"
    />
  );
  const Grade = (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOdSURBVHgB7ZrPTxNBFMe/b1tBQRENxJ9J23gRL/6K0R5U9ORN40mNB+PBs3j1IPwFVo8ejCZKOCFHbqAX1Ivl5Mm0GEmIYKyICKX0OW+gBZaFQqazbVc+l213t2Q/vJk3b3aGsEE+3Uk1z2RxjYATAEWIEGWgefFyFPZJF4+MDIOHkcdgvCc2WOqHVOqGoRupdgrRI/WxHVUIEzLE6ONt3BV/EUt73bOmpERuds5RcnwftUGaQJ1nX0deui94Sg7dSUWdOXrDumnWFsRKtDvSteKc+yYRpDkagD/9zBKUOPc60lH45rgvSwRR04IC339/M1XsZiskP9weeVSLTdQThx5/vJXSLkVJaabM3IkAkSd6LMeiJGdRK1l0M7TLEFiUdIiuIog4WJCUpoqaTzbeENHFhUjmgikoSCLVkswByageqEKgOaw/sCq0S1ax67OrrR6t53einMxP5zHW/xuzEzmYoCVlNmHiWN8SxrGH+2GDPacbkOwYhQm6uepIGrD/yi7Yor41jKa27TDBQRkINZblz6xJXUsIJth9uiphS9IPxvon8eXZBGbHzTLoeoRRQb71ZjDa+6v4/ci9FtigYpF0CzYdNcug62FdcuTVT5mnrhByCx6+3ozWC+UtJJZjvblOvJvSRxET1KvEVYKHru+GTaxH8uAyAa8I2hYUrEseuNLkKeKXoOBL4nEL+Sko+DaEiJgU2zKzMK1FN4uv42RjpA6V4L8o66xHcvzt1Ibua1BRbozaibRVSfeQUYq2h/us9Neqaq6hBjuPYzWSklEl2eT+5EveK28AbCUm630yN7VaUCK290wD/KJifTJwFY8XUqj7RcX6pM2plRvrfVJKuUqz9SKrWshOzMOEhQUfQgYGyHqFrTwy+z2Hyc8zMGFhwQdmktMjWb1eIcsFoR3laxzZH/P6laUphcSThiGy8iQvraoR/W93HLNIVjOqF2W0ZD6HJAKK6opJLRnv0Rvv0ggizMNLW1yIXyKAcB6JouRMGAlG4PrmgLTSouSlF7GMWnJ+ggDB83xXjisGtfirWKc6DCAAMHPXYq5ZXdZpe0YKtQxzIt6tA6ZZJSn2nOfLNSrKEsFz3bGO5Sc9azAR/VvHp/LECcDH2a0B6iFVucUPlkewwEY22kcpRM+xtNHecFtTWWE9IhA/3T6FxMm+mOfosOEHFlnZcah+cBxExxdPR11HK4hIYRKx+DmpmuVX9TyDSi65llyBf9APPN2CMTWfAAAAAElFTkSuQmCC"
      width={50}
      height={50}
      alt="grade"
    />
  );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = subDays(new Date(), 1);
    const yesterdayFormatted = format(yesterday, "yyyy-MM-dd");
    const twoDaysBefore = subDays(new Date(), 2);
    const twoDaysBeforeFormatted = format(twoDaysBefore, "yyyy-MM-dd");

    const newMessages = [
      {
        icon: Calender,
        title: "考勤结果通知",
        content: `${today} 的第1节，第2节自习5-1-1班考勤结果为「事假」。`,
        date: `${today}`,
      },
      {
        icon: Grade,
        title: "成绩已修改",
        content: `PHY2202/物理荣誉4 中章测的成绩从61/100.00分修改为81.5/100.00分，原因：无`,
        date: `${today}`,
      },
      {
        icon: Calender,
        title: "考勤结果通知",
        content: `${yesterdayFormatted} 的第1节，第2节自习5-1-1班考勤结果为「事假」。`,
        date: `${yesterdayFormatted}`,
      },
      {
        icon: Calender,
        title: "考勤结果通知",
        content: `${yesterdayFormatted} 的第1节，第2节自习5-1-1班考勤结果为「事假」。`,
        date: `${yesterdayFormatted}`,
      },
      {
        icon: Calender,
        title: "考勤结果通知",
        content: `${twoDaysBeforeFormatted} 的第1节，第2节自习5-1-1班考勤结果为「事假」。`,
        date: `${twoDaysBeforeFormatted}`,
      },
      {
        icon: Calender,
        title: "考勤结果通知",
        content: `${twoDaysBeforeFormatted} 的第1节，第2节自习5-1-1班考勤结果为「事假」。`,
        date: `${twoDaysBeforeFormatted}`,
      },
    ];
    setMessages(newMessages);
  }, []);

  return (
    <>
      {messages.map((message, index) => (
        <section
          key={index}
          className="bg-white rounded-xl min-h-fit mb-4 py-2 px-3 shadow-sm flex flex-col gap-4 relative"
        >
          <div className="flex gap-4 px-1 py-2">
            <div className="w-12 rounded-2xl">{message.icon}</div>
            <div className="w-screen flex flex-col content-between gap-0.5">
              <h2 className="text-[16px] font-bold">{message.title}</h2>
              <p className="text-[14px] text-slate-600">{message.content}</p>
              <p className="text-xs text-slate-500">{message.date}</p>
            </div>
          </div>
          <Link className="inset-0 absolute" href="/simulator" />
        </section>
      ))}
    </>
  );
};

export default MessageCard;
