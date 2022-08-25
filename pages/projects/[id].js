import { RadioGroup, Tab } from "@headlessui/react";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import ProjectItem from "../../components/ProjectItem";
import { axios } from "../../lib/axiosInstance";

import {
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineUserGroup,
    HiUserCircle,
} from "react-icons/hi";
import PewakafItem from "../../components/PewakafItem";
import UpdateItem from "../../components/UpdateItem";
import { BiTimer } from "react-icons/bi";
import AppContext from "../../context/AppContext";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { number } from "yup/lib/locale";

export default function ProjectDetail({ project }) {
    const elamount = useRef(null);
    const { bio, token } = useContext(AppContext);
    const choicesAmount = [
        project.first_choice_amount,
        project.second_choice_amount,
        project.third_choice_amount,
        project.fourth_choice_amount,
    ];
    const [choiceAmount, setChoiceAmount] = useState("");

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            amount: choiceAmount,
        },
        validationSchema: yup.object({
            amount: yup
                .number("harap isi dengan angka")
                .required("silahkan isi nominal wakaf anda"),
        }),
    });
    const router = useRouter();
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const [tabs, setTabs] = useState([
        {
            text: "Cerita",
            count: 0,
        },
        {
            text: "Update",
            count: 0,
        },
        {
            text: "Pewakaf",
            count: 0,
        },
    ]);
    const handleBtnWakafSekarang = () => {
        if (formik.values.amount === "") {
            elamount.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
        if (!bio && !token) {
            router.push("/login");
        } else {
            router.push(
                `/projects/${project.id}/create-transaction?amount=${formik.values.amount}`
            );
        }
    };
    return (
        <Layout>
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-3 h-fit'>
                    <div>
                        {/* <div className='relative border shadow-md aspect-square hidden md:block'>
                            <Image src={project.picture_url} layout='fill' />
                        </div> */}
                        <ProjectItem data={project} />
                        <div className='md:p-6 p-4 border bg-white shadow-md'>
                            <p>{project.caption}</p>
                        </div>
                    </div>
                    <Tab.Group
                        defaultIndex={1}
                        className='  bg-white shadow-md border'
                        as={"div"}>
                        <Tab.List
                            className={
                                "border-b bg-primary-50 z-10 sticky top-[58px]"
                            }>
                            {tabs.map((item, index) => (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        classNames(
                                            " text-sm font-medium  py-3 md:px-6 px-4 focus:outline-none ",
                                            selected
                                                ? "border-b-2  text-primary-500 border-primary-500"
                                                : "text-gray-400"
                                        )
                                    }>
                                    {item.text}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className={"md:p-6 p-4"}>
                            <Tab.Panel>
                                <h1 className='text-xl text-gray-600 tracking-wider mb-2'>
                                    Lorem ipsum dolor sit amet consectetur.
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Dolor culpa optio
                                    accusantium? Nam debitis, aut ab at voluptas
                                    soluta eos distinctio qui eum rem totam
                                    beatae consequatur et quod sint,
                                    exercitationem dignissimos consequuntur
                                    <br />
                                    <br />
                                    commodi veritatis dolor perferendis dolores?
                                    Eius deserunt, dolore, incidunt id deleniti
                                    ab dolores necessitatibus debitis, iusto
                                    odio minima rerum? Nam sapiente asperiores
                                    quas maiores iure dolorum earum libero
                                    tempore veritatis, incidunt animi minus
                                    omnis eaque quae itaque, iusto ab beatae
                                    quasi adipisci numquam explicabo aperiam
                                    <br />
                                    <br />
                                    corporis doloribus? Cum voluptas molestiae
                                    adipisci officiis et veniam, ea fugiat totam
                                    necessitatibus, alias obcaecati praesentium
                                    commodi animi ratione voluptates quisquam
                                    maiores eum non recusandae unde nemo
                                    <br />
                                    <br />
                                    aspernatur earum harum architecto! Aut
                                    aliquam, quod, totam amet nulla pariatur
                                    unde eveniet delectus magnam tenetur atque.
                                    Nisi reiciendis, eveniet quos dolorum
                                    inventore unde sunt possimus laborum,
                                    voluptatem aliquam illum! Tenetur laborum
                                    vero accusamus perferendis et similique
                                    reiciendis repellendus, magni fugiat qui
                                    excepturi numquam necessitatibus.
                                </p>
                            </Tab.Panel>
                            <Tab.Panel>
                                <ol className='border-l relative  border-black'>
                                    <UpdateItem />
                                    <UpdateItem />
                                    <UpdateItem />
                                </ol>
                            </Tab.Panel>
                            <Tab.Panel className={"flex flex-col divide-y-2"}>
                                <PewakafItem />
                                <PewakafItem />
                                <PewakafItem />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                    <div ref={elamount} className={`mt-4 md:pt-0  `}>
                        <p className='text-gray-500 tracking-wider '>
                            Pilih Nominal Wakaf
                        </p>
                        <RadioGroup
                            className={"flex flex-wrap"}
                            value={formik.values.amount}
                            onChange={setChoiceAmount}>
                            {choicesAmount.map((item, index) => (
                                <RadioGroup.Option key={index} value={item}>
                                    {({ checked }) => (
                                        <button
                                            className={classNames(
                                                "text-xs py-1 px-3 mr-2 mt-2  ring-1 ring-gray-300",
                                                checked
                                                    ? "bg-secondary-500 text-white"
                                                    : "bg-gray-100"
                                            )}>
                                            Rp {item}
                                        </button>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </RadioGroup>
                        <label className='relative block mt-4'>
                            <span className='sr-only'>Search</span>
                            <span className='absolute inset-y-0 text-sm left-0 flex items-center pl-3 text-gray-700'>
                                Rp
                            </span>
                            <input
                                name='amount'
                                type='text'
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-secondary-300 focus:ring-secondary-200 focus:ring sm:text-sm text-sm focus:ring-opacity-50'
                                placeholder='atau masukkan nominal wakaf disini'
                            />
                        </label>
                    </div>
                    <div className='  md:static sticky bottom-0 z-10    py-4 md:py-6'>
                        <button
                            onClick={handleBtnWakafSekarang}
                            className='bg-secondary-500 text-white py-2.5 w-full shadow-xl rounded-md'>
                            {!bio && !token
                                ? "Masuk Untuk Mulai Berwakaf"
                                : "Wakaf Sekarang"}
                        </button>
                    </div>
                </div>
                <div className='col-span-2 hidden md:block'>
                    <div className='p-4 md:p-6 sticky top-[58px] bg-white border shadow-md'>
                        <div className='flex space-x-4 items-center'>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineTag className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    {project.category}
                                </p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineLocationMarker className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    {project.location}
                                </p>
                            </div>
                        </div>
                        <h1 className='text-primary-600 my-1 text-lg font-medium'>
                            {project.title}
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
                        <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineUserGroup className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    64 Pewakaf
                                </p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <BiTimer
                                    size={"1.2em"}
                                    className='text-gray-400'
                                />
                                <p className='text-xs text-gray-400'>
                                    {project.days_target} hari lagi
                                </p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='text-gray-500 tracking-wider '>
                                Pilih Nominal Wakaf
                            </p>
                            <RadioGroup
                                className={"flex flex-wrap"}
                                value={formik.values.amount}
                                onChange={setChoiceAmount}>
                                {choicesAmount.map((item, index) => (
                                    <RadioGroup.Option key={index} value={item}>
                                        {({ checked }) => (
                                            <button
                                                className={classNames(
                                                    "text-xs py-1 px-3 mr-2 mt-2  ring-1 ring-gray-300",
                                                    checked
                                                        ? "bg-secondary-500 text-white"
                                                        : "bg-gray-100"
                                                )}>
                                                Rp {item}
                                            </button>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                            <label className='relative block mt-4'>
                                <span className='sr-only'>Search</span>
                                <span className='absolute inset-y-0 text-sm left-0 flex items-center pl-3 text-gray-700'>
                                    Rp
                                </span>
                                <input
                                    name='amount'
                                    type='text'
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-secondary-300 focus:ring-secondary-200 focus:ring sm:text-sm text-sm focus:ring-opacity-50'
                                    placeholder='atau masukkan nominal wakaf disini'
                                />
                            </label>
                        </div>
                        <button
                            onClick={handleBtnWakafSekarang}
                            className='bg-secondary-500 mt-4 text-white py-2 w-full rounded-md'>
                            {!bio && !token
                                ? "Masuk Untuk Mulai Berwakaf"
                                : "Wakaf Sekarang"}
                        </button>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    let project = [];
    const { id } = ctx.query;
    await axios.get(`/projects/${id}`).then((response) => {
        console.log(response.data.project);
        project = response.data.project;
    });
    return {
        props: {
            project,
        },
    };
}
