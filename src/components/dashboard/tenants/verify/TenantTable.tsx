import Image from 'next/image';
import { useRouter } from 'next/router';

const TenantTable = ({ tenants }: { tenants: { [key: string]: string }[] }) => {
    return (
        <div className="p-5 bg-white hidden-x-scrollbar rounded-md">
            <table className="w-full table-auto whitespace-nowrap text-gray-700 border-separate border-spacing-x-5 border-spacing-y-8 font-medium  text-center">
                <thead className="text-[#727070] text-xl ">
                    <tr>
                        <th className="px-6 text-left ">Name</th>
                        <th className="px-6 ">Email</th>
                        <th className="px-6 ">Phone Number</th>
                        <th className="px-6 ">Tenant Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tenants.map((t: any, i: any) => (
                        <tr key={i} className="cursor-pointer tr-hover ">
                            <td className="py-6 pl-6 pr-14 text-left flex gap-x-4 w-max ">
                                {/* <Image
                                    src={t.imageURL}
                                    alt="user avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full inline-block"
                                /> */}

                                <span className="inline-block">
                                    {t?.userData?.firstname}{' '}
                                    {t?.userData?.lastname}
                                </span>
                            </td>
                            <td className="py-6 px-14 ">
                                {t?.userData?.email}
                            </td>
                            <td className="py-6 px-14  ">
                                {t?.userData?.phone}
                            </td>

                            <td className="py-6 pr-6 pl-14  ">
                                {' '}
                                <span
                                    className={`py-1 px-[10px] rounded-lg capitalize ${
                                        (t?.tenantData?.status ===
                                            'INCOMPLETE' &&
                                            'text-[#FA0F0F] bg-[#FFE9E9]') ||
                                        (t?.tenantData?.status === 'COMPLETE' &&
                                            'text-[#31AA06] bg-[#ECFFE9]') ||
                                        (t?.tenantData?.status === 'PENDING' &&
                                            'text-[#E07D08] bg-[#FFF5E9]')
                                    }`}
                                >
                                    {t?.tenantData?.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TenantTable;
