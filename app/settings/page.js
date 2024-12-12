import React from 'react';
import Settings from "@/app/settings/Settings";
import { cookies } from "next/headers";

const Page = () => {
    const licenseKey = cookies().get('license_key');
    if (licenseKey) {
        console.log(licenseKey);
        return <Settings activated={true} />
    }
    return (
        <Settings />
    );
};

export default Page;