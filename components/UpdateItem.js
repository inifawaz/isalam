import React from "react";

export default function UpdateItem({ data }) {
    return (
        <li className='mb-8 relative'>
            <div className='h-3 w-3 absolute -left-[6.1px] top-1.5  rounded-full bg-primary-400'></div>
            <div className='ml-4'>
                <time className='font-medium text-primary-600'>
                    {data.date}
                </time>
                <div>
                    <p> {data.text}</p>
                </div>
            </div>
        </li>
    );
}
