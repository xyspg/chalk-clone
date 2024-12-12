import {atomWithStorage} from "jotai/utils";

export const infoAtom = atomWithStorage("info",{
    leaveNo: "2483436",
    leaveTime: "08:00-17:30",
    leaveClass: "自习课 4-6 1 包含课节: 第9节（1人）",
    department: "高中本部",
    duration: "9小时30分钟",
    reason: "课外班",
    approver: "周丽"
});

export const nameAtom = atomWithStorage('name','王小明')
export const idAtom = atomWithStorage('id','1145141')

export const showGuideAtom = atomWithStorage("showGuide", true);

export const parentAtom = atomWithStorage('parent','')

export const multiLeaveAtom = atomWithStorage('multiLeave',{})

export const settingAtom = atomWithStorage('settings', {
    "multi_leave_enabled": false
})