"use server"
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export const handleVerify = async (prevState, formdata) => {
    const licenseKey = formdata.get("licenseKey");
    if (!licenseKey) return;
    let params = new URLSearchParams();
    params.append("license_key", licenseKey);
    params.append('instance_name', 'chalk')
    const response = await fetch(
        `https://api.lemonsqueezy.com/v1/licenses/activate`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: params,
        },
    ).then((res) => res.json());
    console.log(response);
    if (response.activated !== true) {
        return {
            message: response.error
        }
    }
    console.log('activated')
    cookies().set('license_key', licenseKey, {
        maxAge: 60 * 60 * 24 * 365 * 10,
    })
    redirect('/settings')
};
