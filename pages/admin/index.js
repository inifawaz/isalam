import React from "react";
import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import Layout from "../../components/Layout";

export default function Index() {
    return (
        <Layout>
            <AdminNav />
            <Container className={" grid md:grid-cols-2 gap-2"}>
                <div className='bg-secondary-500 p-4  h-fit'>
                    <p className='text-white text-right font-light'>
                        Total Program Wakaf
                    </p>
                    <p className='text-white text-right text-4xl'>78</p>
                </div>
                <div className='bg-cyan-500 p-4  h-fit'>
                    <p className='text-white text-right font-light'>
                        Total Dana
                    </p>
                    <p className='text-white text-right text-4xl'>
                        Rp 234,000,000
                    </p>
                </div>
            </Container>
            <Container>
                <h2 className='text-2xl  text-gray-600 mb-2'>
                    Transaksi Terbaru
                </h2>
                <div className='overflow-auto bg-white shadow'>
                    <table className='w-full table-auto'>
                        <thead className='bg-sky-700'>
                            <tr>
                                <th className='p-2 text-white font-medium whitespace-nowrap text-left'>
                                    Tanggal
                                </th>
                                <th className='p-2 text-white font-medium whitespace-nowrap text-left'>
                                    User
                                </th>
                                <th className='p-2 text-white font-medium whitespace-nowrap text-left'>
                                    Program Wakaf
                                </th>
                                <th className='p-2 text-white font-medium whitespace-nowrap text-left'>
                                    Nominal
                                </th>
                                <th className='p-2 text-white font-medium whitespace-nowrap text-left'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                            <tr className='text-sm'>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    28/09/2022 13:45
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Rusman Mustofa
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Pengadaan Mushaf Al Qur'an Untuk PPTQ Al
                                    Qolam Karanganyar
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Rp 150000
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    <div className='text-xs bg-secondary-100 rounded-md cursor-pointer text-center text-secondary-600 p-1'>
                                        Success
                                    </div>
                                </td>
                            </tr>
                            <tr className='text-sm'>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    14/10/2022 15:10
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Iqbal Kurniawan
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Pengadaan Karpet Masjid Al Hidayah Pontianak
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Rp 150000
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    <div className='text-xs bg-primary-100 rounded-md cursor-pointer text-center text-primary-600 p-1'>
                                        Pending
                                    </div>
                                </td>
                            </tr>
                            <tr className='text-sm'>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    14/10/2022 15:10
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Ibrohim Mulyadi
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Pengadaan Karpet Masjid Al Hidayah Pontianak
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    Rp 200000
                                </td>
                                <td className='p-2 text-gray-600 whitespace-nowrap'>
                                    <div className='text-xs bg-warning-100 rounded-md cursor-pointer text-center text-warning-600 p-1'>
                                        Expired
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </Layout>
    );
}
