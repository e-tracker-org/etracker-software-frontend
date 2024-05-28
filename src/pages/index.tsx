import HomeLayout from 'layouts/home';
import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropertySearch from 'components/home/PropertySearch';
import { TbShieldCheckFilled } from 'react-icons/tb';
import test1 from 'assets/imgs/test-1.png';
import test2 from 'assets/imgs/test-2.png';
import { BsArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'services';
import { toast } from 'react-hot-toast';
import { useAppStore } from 'hooks/useAppStore';
import PropertyListingCard from 'components/dashboard/properties/property-listing/PropertyListingCard';
import { getAllGeneralProperties } from 'services/newServices/properties';

const SERVICES = [
    {
        title: 'Property Data',
        img: '/Home/Properties.svg',
        content:
            'Access comprehensive data on properties for buying, renting, and gathering information. Tenants can also chat directly with landlords and property managers.',
    },
    {
        title: 'Landlord Insights',
        img: '/Home/Landlords.svg',
        content:
            'Get valuable insights into landlords’ characteristics to help you make informed decisions and enhance your property search experience.',
    },
    {
        title: 'Tenant Information',
        img: '/Home/Tenants.svg',
        content:
            'Store and access tenancy data to streamline processes and make better decisions regarding tenant management.',
    },
];

export default function Home() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const storedProperty = localStorage.getItem('filteredProperties');

        const property = JSON.parse(storedProperty as any);

        if (property) {
            setProperties(property);
            return;
        }

        async function fetchData() {
            const propertyData = await getAllGeneralProperties();
            setProperties(propertyData);
        }
        fetchData();
    }, []);

    return (
        <>
            <section className="bg-gray-50">
            <section className="relative">
                <div className="absolute bg-cover bg-center">
                    <div className="absolute bg-black "></div>
                </div>
                <div className="relative flex flex-col items-center  shadow-lg p-8 lg:p-16 text-center" style={{backgroundColor: '#000000'}}>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-full mb-4">
                    🤝 Trusted Real Estate Partner
                    </button>
                    <h1 className="text-3xl lg:text-6xl font-bold mb-4 text-white ">
                    Your Partner for <span className="text-primary-600">Real Estate</span> Data and Property Management
                    </h1>
                    <p className="text-lg text-white  lg:text-xl mb-8">
                    E-Tracka offers marketing software and technology solutions to help real estate professionals maximize business opportunities.
                    </p>
                    <Link href="/auth/signup">
                    <span className="bg-primary-600 text-white rounded-full px-8 py-3 text-lg font-semibold">
                        Get Started
                    </span>
                    </Link>
                    <div className="flex justify-around items-center gap-10 mt-12 w-full" style={{ marginBottom: '100px' }}>
                    <div className="text-center">
                        <Image src="/Home/Agents.svg" alt="Agents" width={100} height={100} />
                        <p className="text-primary-600 text-4xl  mt-2">200+</p>
                        <p className="font-medium text-lg text-white ">Agents</p>
                    </div>
                    <div className="text-center">
                        <Image src="/Home/PropertyListing.svg" alt="Property Listings" width={100} height={100} />
                        <p className="text-primary-600 text-4xl mt-2">1200+</p>
                        <p className="font-medium text-white  text-lg">Listings</p>
                    </div>
                    <div className="text-center">
                        <Image src="/Home/AreasCoverd.svg" alt="Areas Covered" width={100} height={100} />
                        <p className="text-primary-600 text-4xl mt-2">100+</p>
                        <p className="font-medium text-white  text-lg">Areas Covered</p>
                    </div>
                    </div>
                </div>
                <PropertySearch />
                </section>


                <section className="my-16 propertyCard" >
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                        Explore <span className="text-primary-600">Your Dream</span> Properties
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {Array.isArray(properties) && properties.length ? (
                        properties.map((property) => (
                        // @ts-ignore
                        <div key={property?.id}>
                            <PropertyListingCard property={property} />
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-xl w-full col-span-full">
                        No properties found for your search
                        </p>
                    )}
                    </div>

                </section>

                <section className="my-16 py-16 bg-gray-50">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {SERVICES.map((service, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <div className="w-full aspect-w-16 aspect-h-9 relative mb-4">
                                    <Image src={service.img} alt={service.title} layout="fill" />
                                </div>
                                <h3 className="font-bold text-xl mb-4">{service.title}</h3>
                                <p className="text-gray-700">{service.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="aboutus" className="my-16 px-4 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">Our Mission & Vision</h2>
                    <p className="text-lg lg:text-xl mb-12 mx-auto max-w-2xl text-gray-600">
                    At E-Tracka, we are committed to <span className='text-primary-600'> honesty integrity, and transparency</span>. 
                    <p>Our mission is to ensure that you find your dream home with confidence and ease.</p><br/> <p>Our vision is to be the leading real estate platform providing reliable data and seamless property management services.</p>
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="relative w-full md:w-80 h-56 rounded-lg overflow-hidden shadow-lg">
                        <Image src="/house-1.png" alt="House" layout="fill" className="object-cover" />
                    </div>
                    <div className="relative w-full md:w-80 h-56 rounded-lg overflow-hidden shadow-lg">
                        <Image src="/house-2.png" alt="House" layout="fill" className="object-cover" />
                    </div>
                    </div>
                </div>
                </section>


                <section id="faq" className="my-16 py-16 px-4 lg:px-8 bg-gray-100">
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">FAQ</h2>
                <ul className="space-y-8 max-w-3xl mx-auto text-lg text-gray-700">
                    <li>
                    <strong className="text-gray-900">Q: What services does E-Tracka offer?</strong>
                    <p className="text-gray-600">A: E-Tracka offers property listings, landlord and tenant data, and property management solutions.</p>
                    </li>
                    <li>
                    <strong className="text-gray-900">Q: How can I trust the data provided by E-Tracka?</strong>
                    <p className="text-gray-600">A: E-Tracka ensures all data is verified and accurate, providing reliable information for making informed decisions.</p>
                    </li>
                    <li>
                    <strong className="text-gray-900">Q: How do I get started with E-Tracka?</strong>
                    <p className="text-gray-600">A: Sign up on our website and explore our services tailored to your real estate needs.</p>
                    </li>
                    <li>
                    <strong className="text-gray-900">Q: Can I contact property owners directly through E-Tracka?</strong>
                    <p className="text-gray-600">A: Yes, E-Tracka allows tenants to chat directly with landlords and property managers.</p>
                    </li>
                </ul>
                </section>


                <section id="contactus" className="my-16 py-16" style={{backgroundColor: '#000000'}}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">Are you an estate agent or developer? </h2>
                    <div className="flex flex-col items-center mt-8">
                        <span className="text-lg text-white lg:text-xl mb-4 text-center max-w-4xl">
                        List your property for FREE.
                        </span>
                        <Link href="/auth/signup">
                        <span className="bg-primary-600 text-white rounded-full px-8 py-3 text-lg font-semibold">
                            Get Started
                        </span>
                        </Link>
                    </div>
                </section>
            </section>
        </>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
