import React from 'react';
import DemoImg from '@/app/img/multi.png'
import DemoImg1 from '@/app/img/multi1.png'
import Image from "next/image";
const NewFeatures = () => {
    return (
        <div className='h-64 overflow-auto'>
            <h1 className='text-lg'>
                连续请假
            </h1>
            <p>在设置中配置后，可以在请假界面展示连续请假</p>
            <div className='flex flex-col gap-1 mt-1'>
            <Image src={DemoImg} alt='demo' />
            <Image src={DemoImg1} alt='demo' />
            </div>

        </div>
    );
};

export default NewFeatures;