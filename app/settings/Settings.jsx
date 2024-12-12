"use client";
import Footer from "@/components/Footer";
import { useCallback } from "react";
import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { idAtom, nameAtom, parentAtom } from "@/lib/atoms";
import { EditDialog } from "@/app/settings/EditDialog";
import MultiLeave from "@/app/settings/MultiLeave";
import Link from "next/link";

const Settings = ({ activated }) => {
    const clearCache = useCallback(() => {
        localStorage.clear();
        window.location.reload();
    }, []);

    const handleClearCache = useCallback(() => {
        window.confirm("确定要清除本地数据及缓存吗？") && clearCache();
    }, [clearCache]);
    const [name, setName] = useAtom(nameAtom);
    const [id, setId] = useAtom(idAtom);
    const [parent, setParent] = useAtom(parentAtom);

    return (
        <>
            <div className="bg-white p-8">
                <h1 className="text-2xl font-bold">设置</h1>
            </div>
            <hr className="border-slate-200" />
            <div className="flex flex-col gap-2 p-4">
                <EditDialog
                    title={"修改姓名"}
                    label={"姓名"}
                    placeholder={"输入姓名"}
                    value={name}
                    setValue={setName}
                />
                <EditDialog
                    title={"修改学号"}
                    label={"学号"}
                    placeholder={"输入学号"}
                    value={id}
                    setValue={setId}
                />
                <EditDialog
                    title={"修改家长姓名"}
                    label={"家长姓名"}
                    placeholder={"输入家长姓名"}
                    value={parent}
                    setValue={setParent}
                />
            </div>
            <div className="mx-4 my-2">
                {activated && <MultiLeave /> }
            </div>
            <div className="p-4 flex justify-center items-center">
                <Button color="crimson" variant="soft" onClick={handleClearCache}>
                    清除本地数据
                </Button>
            </div>
            {/* <div className="p-4 flex justify-center items-center mb-16 font-medium text-slate-800">
                <Button color='violet'><Link href='/donation'>捐助我们</Link></Button>
            </div> */}
            <Footer/>
        </>
    );
};
export default Settings;
