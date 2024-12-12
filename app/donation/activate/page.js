'use client'
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import { handleVerify } from "@/app/actions";
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'

const initialState = {
    message: '',
}



const Page = () => {
    const { pending } = useFormStatus()
    const [state, formAction] = useFormState(handleVerify, initialState)


    return (
    <>
      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold">请输入 License Key</h1>
      </div>
        <div className="mt-32 flex justify-center">
            <form
                action={formAction}
                className="flex flex-col gap-2 items-center"
            >
                <input
                    name="licenseKey"
                    className="p-2 w-96 border-2 border-gray-300 rounded-xl"
                    type="text"
                    placeholder="XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                />

                <Button size="2" aria-disabled={pending}>确认</Button>
                <p aria-live="polite" className='text-red-500'>
                    {state?.message}
                </p>
            </form>

        </div>
    </>
    );
};

export default Page;
