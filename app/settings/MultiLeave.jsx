import { Flex, Switch, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { addDays, format, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { multiLeaveAtom, settingAtom } from "@/lib/atoms";
import { atom, useAtom } from "jotai";
import {EditDialog} from "@/app/settings/EditDialog";
import Loading from "@/components/Loading";
import {AiOutlineLoading} from "react-icons/ai";

export default function MultiLeave() {
  const [settings, setSettings] = useAtom(settingAtom);
  const enabled = settings['multi_leave_enabled'];
  const setEnabled = (value) => setSettings({ ...settings, 'multi_leave_enabled': value });
  return (
    <>
      <Flex direction="column" align={"center"} gap={"4"}>
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch
              radius={"full"}
              checked={enabled}
              onCheckedChange={() => {
                setEnabled(!enabled);
              }}
            />
            启用连续请假
          </Flex>
        </Text>
        {enabled && <MultiLeaveSettings />}
      </Flex>
    </>
  );
}

const MultiLeaveSettings = () => {
  const [multiLeave, setMultiLeave] = useAtom(multiLeaveAtom);
  const days = ["周日","周一", "周二", "周三", "周四", "周五", "周六"];
  const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/

  return (
    <div className="">
    <h1 className="text-lg font-medium mb-2">选择日期</h1>
      <div className='flex flex-row gap-2 flex-wrap'>
      {days.map((day, index) => (
        <EditDialog
            key={index}
            title={day}
            label={`输入${day}的请假时间段`}
            placeholder={'08:00-16:30'}
            value={multiLeave[index] || ''}
            setValue={(value) => {
            setMultiLeave({
              ...multiLeave,
              [index]: value
            })
            }}
            onBlur={(event) => {
              const value = event.target.value;
              if (pattern.test(value) || value === '') {
              } else {
                alert('时间格式错误，请输入正确的时间格式，例如：08:00-16:30');
            }}}
        >{day}</EditDialog>
      ))}
      </div>
    </div>
  );
};
