import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import isalamLight from "../public/isalam-light.png";

export default function Footer() {
    return (
        <div className='bg-slate-800'>
            <Container
                className={
                    "flex flex-col space-y-8 pb-20 pt-10 md:flex-row md:space-y-0 md:space-x-8"
                }>
                <div className='w-80'>
                    <Link href={"/"}>
                        <div className=' relative cursor-pointer  w-40  mb-4'>
                            <Image src={isalamLight} layout='responsive' />
                        </div>
                    </Link>
                    <p className='text-gray-400'>
                        Yayasan iSalam Kariim, maksimalkan pahala, optimalkan
                        manfaat.
                    </p>
                </div>
                <div>
                    <h1 className='text-lg text-gray-50 font-medium'>
                        Yayasan i-Salam
                    </h1>
                    <ul>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Tentang Kami
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Legal
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Syarat dan Ketentuan
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Privasi
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-lg text-gray-50 font-medium whitespace-nowrap'>
                        Kategori Program Wakaf
                    </h1>
                    <ul>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Sosial
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Modal Usaha
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Pangan
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Pendidikan
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Kesehatan
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-lg text-gray-50 font-medium'>
                        Kontak Kami
                    </h1>
                    <ul>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    0821 3390 4857
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    admin@isalam.com
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <a className='text-gray-40 hover:text-gray-100 transition-all'>
                                    Jl. Gunung Lompobattang No. 56, Makassar
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
