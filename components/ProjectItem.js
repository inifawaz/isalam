import Image from "next/image";
import Link from "next/link";
import React from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiTimer } from "react-icons/bi";

export default function ProjectItem({ data }) {
    return (
        <Link href={`/projects/${data.id}`}>
            <div className=' cursor-pointer'>
                <div className='relative shadow-md aspect-square'>
                    <Image src={data.picture_url} layout='fill' />
                </div>
                <div className='p-4 bg-white shadow-md'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineLocationMarker className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.location}
                            </p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <BiTimer size={"1.2em"} className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.days_target} hari lagi
                            </p>
                        </div>
                    </div>
                    <h1 className='text-primary-600 my-2 text-lg font-medium'>
                        {data.title}
                    </h1>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-xs text-gray-400 leading-none'>
                                Terkumpul (45%)
                            </p>
                            <p className='text-sm text-emerald-500'>
                                Rp 4.500.000
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-400 leading-none text-right'>
                                Target
                            </p>
                            <p className='text-sm text-primary-600'>
                                Rp 10.000.000
                            </p>
                        </div>
                    </div>
                    <div className='h-1 rounded-full bg-gray-200 mt-1'>
                        <div className='h-1 rounded-full bg-emerald-500 w-[45%]'></div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
