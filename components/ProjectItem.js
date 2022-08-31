import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

import {
    HiOutlineLocationMarker,
    HiOutlineUserGroup,
    HiOutlineTag,
} from "react-icons/hi";
import { BiTimer } from "react-icons/bi";
import AppContext from "../context/AppContext";

export default function ProjectItem({ data }) {
    const { setPageLoading } = useContext(AppContext);
    return (
        <Link href={`/projects/${data.id}`}>
            <div
                onClick={() => setPageLoading(true)}
                className=' h-fit cursor-pointer'>
                <div className='relative shadow-md aspect-square'>
                    <Image
                        src={data.picture_url}
                        layout='fill'
                        alt='project image'
                    />
                </div>
                <div className='p-4 bg-white border shadow-md'>
                    <div className='flex space-x-4 items-center'>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineTag className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.category}
                            </p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineLocationMarker className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.location}
                            </p>
                        </div>
                    </div>
                    <h1 className='text-primary-600 my-1 text-lg font-medium '>
                        {data.name}
                    </h1>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-xs text-gray-400 leading-none'>
                                Terkumpul ({data.amount_collected_percent})
                            </p>
                            <p className='text-sm text-emerald-500'>
                                Rp {data.amount_collected}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-400 leading-none text-right'>
                                Target
                            </p>
                            <p className='text-sm text-primary-600'>
                                Rp {data.target_amount}
                            </p>
                        </div>
                    </div>
                    <div className='h-1 rounded-full bg-gray-200 mt-1'>
                        <div className='h-1 rounded-full bg-emerald-500 w-[45%]'></div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineUserGroup className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.backers_count} Pewakaf
                            </p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <BiTimer size={"1.2em"} className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.days_left} hari lagi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
