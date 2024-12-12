"use client";
import Footer from "@/components/Footer";
import { useAtom } from "jotai";
import { idAtom, nameAtom, showGuideAtom } from "@/lib/atoms";
import { useHasMounted } from "@/lib/clientOnly";
import { ChevronRightIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [showGuide] = useAtom(showGuideAtom);
  const [name] = useAtom(nameAtom);
  const [id] = useAtom(idAtom);
  const hasMounted = useHasMounted();
  const router = useRouter();
  if (!hasMounted) return null;

  return (
    <>
      <main className="text-slate-700 mb-4">
        <div className="mt-4 bg-white h-52 p-8 flex flex-row items-center gap-4">
          <div className="my-8 w-14 h-14 bg-[#70CFB2] rounded-full flex justify-center items-center">
            <p className="text-white font-bold text-md text-[18px]">
              {name.slice(-2)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-left text-2xl font-bold">{name}</h1>
            <p className="text-xs text-slate-400 ">{id}</p>
            <h2 className="mt-2 text-md font-bold">北大附中(高中本部)｜学生</h2>
          </div>
        </div>
        <hr className="border-slate-200" />
        <Link
          href="/settings"
          className="bg-white px-6 py-6 flex flex-row justify-between items-center"
        >
          <div className="flex flex-row items-center gap-4">
            <MixerHorizontalIcon className="w-4 h-4 text-slate-500" />
            <h1 className="text-md font-bold">设置</h1>
          </div>
          <ChevronRightIcon />
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
