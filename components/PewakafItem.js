import React from "react";
import { HiUserCircle } from "react-icons/hi";

export default function PewakafItem({ data }) {
    return (
        <div className='flex items-center py-2'>
            <div>
                <HiUserCircle size='3em' className='text-gray-300' />
            </div>
            <div>
                <p className='text-sm leading-none'>{data.name}</p>
                <div className='flex items-center space-x-2'>
                    <p className='text-secondary-500 text-sm'>
                        Rp {data.project_amount_given}
                    </p>

                    <div className='h-1 w-1 rounded-full bg-gray-400 '></div>
                    <time className='text-sm leading-none text-gray-400'>
                        {data.paid_at}
                    </time>
                </div>
            </div>
        </div>
    );
}
