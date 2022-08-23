import React from "react";

export default function UpdateItem() {
    return (
        <li className='mb-8 relative'>
            <div className='h-3 w-3 absolute -left-[6.1px] top-1.5  rounded-full bg-primary-400'></div>
            <div className='ml-4'>
                <time className='font-medium text-primary-600'>
                    28 Juni 2022
                </time>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime enim est itaque suscipit perferendis explicabo
                        recusandae esse ea libero placeat.
                    </p>
                </div>
            </div>
        </li>
    );
}
