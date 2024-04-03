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
        title: 'Get data on properties',
        img: '/home/Properties.svg',
        content:
            'Buy, rent and gather information on real estate properties. As a tenant, you can also send personal chats to landlords and property managers.',
    },
    {
        title: 'Get data on landlords',
        img: '/home/Landlords.svg',
        content:
            'We give insights into their characteristics and characters which strengthen their agency&apos;s advertisement and promotion.',
    },
    {
        title: 'Get data on tenants',
        img: '/home/Tenants.svg',
        content:
            'We store tenancy data to improve your processes and enhance your ability to make an informed decision.',
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
            <section className="py-[39px]">
                <section className="relative mb-[130%] md:mb-[50%] lg:mb-[20%]">
                    <section style={{padding: 100}}
                        className="flex items-center rounded-[12px]  justify-between lg:justify-center relative
                    gap-10 bg-[#E6F0F5] min-h-[400px] px-8 overflow-hidden "
                    >
                        <div  style={{textAlign: 'center'}} className="absolute z-10 md:relative ">
                            <button style={{backgroundColor: '#61C454', margin: 20, padding: 10, color: 'white', borderRadius: '20px', cursor: 'default'}}>🤝 We are the company that makes sure your properties are given to trusted individuals</button>
                            <h1  className="text-xl lg:text-5xl font-bold">
                                Your Trusted Partner for{' '}
                                <span className="text-primary-600">
                                    Real Estate
                                </span>{' '}
                                Data and Property Management.
                            </h1>
                            <br></br>

                            <p className="text-sm lg:text-lg font-medium">
                                E-Tracka provides a complementary suite of
                                marketing software and technology solutions to
                                help real estate professionals maximize business
                                opportunities and connect with consumers.
                            </p>

                            <Link href="/auth/signup">
                                <button style={{marginTop: 10}} className="bg-primary-600 rounded-lg px-8 py-2 text-white font-semibold">
                                    Get Started
                                </button>
                            </Link>

                            <div style={{marginBottom: 50}} className="mx-auto flex lg:justify-center items-center gap-5 justify-between">
                                <div className="">
                                
                                    <div className="text-sm lg:text-4xl">
                                    
                                    <Image src="/Home/Agents.svg" alt="" width={600} height={600} />
                                        
                                        <span className="text-primary-600">
                                        200  +
                                        </span>
                                       
                                    </div>
                                    
                                    <p className="font-medium text-xs lg:text-lg">
                                        Agents
                                    </p>
                                </div>
                                <div className="">
                                    <div className="text-sm lg:text-4xl">
                                        
                                        <Image src="/Home/PropertyListing.svg" alt="" width={600} height={600} />
                                        <span className="text-primary-600">
                                        1200  +
                                        </span>
                                    </div>
                                    <p className="font-medium text-xs lg:text-lg">
                                        Property Listing
                                    </p>
                                </div>
                                <div className="">
                                    <div className="text-sm lg:text-4xl">
                                    <Image src="/Home/AreasCoverd.svg" alt="" width={600} height={600} />
                                        
                                        <span className="text-primary-600">
                                        100   +
                                        </span>
                                    </div>
                                    <p className="font-medium text-xs lg:text-lg">
                                        Areas Covered
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="relative flex-[0.7] md:flex-1 h-[500px] md:w-[689px] lg:h-[717px] -bottom-12 
                    -right-40 md:-right-8 opacity-60 md:opacity-100"
                        >
                            <Image src="/hero.png" alt="" fill />
                        </div>
                    </section>
                    <PropertySearch />
                </section>
                <h1  className="text-lg lg:text-4xl font-bold">
                                Explore{' '}
                                <span className="text-primary-600">
                                    Your Dream
                                </span>{' '}
                                 Properties
                            </h1>
                <section
                    style={{
                        borderLeftColor: '#1F32EB',
                        borderLeftWidth: 5,
                    }}
                    className="mt-5 px-8 bg-white rounded-md pt-5 flex gap-4 my-5 w-full overflow-x-auto"
                >
                    {/* <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full mb-10 min-h-[300px] "> */}
                    {Array.isArray(properties) && properties.length ? (
                        properties.map((property) => (
                            <div key={property?.id} className="w-full">
                                <PropertyListingCard property={property} />
                            </div>
                        ))
                    ) : (
                        <p className="flex justify-center items-center text-center text-xl w-full">
                            No property record found
                        </p>
                    )}
                </section>
                {/* <PropertyListingCard properties={properties} /> */}
                <section
                    id="aboutus"
                    className="flex flex-col items-center gap-10 my-20"
                >
                    <h2 className="text-black text-left font-bold text-[28px] flex items-center gap-10 w-full">
                        <hr className="border-2 border-primary-600 w-[77px]" />
                        Why choose us
                    </h2>

                    <div className="flex flex-col  md:flex-row lg:justify-between md:justify-center md:overflow-auto lg:flex-nowrap py-5 gap-5  w-full ">
                        {SERVICES.map((service, i) => (
                            <div
                                key={i}
                                className="px-6 py-3 rounded-lg bg-white w-full lg:w-2/3 drop-shadow-md"
                            >
                                <div className="w-full aspect-[7/5] relative rounded-lg overflow-clip">
                                    <Image src={service.img} alt="" fill />
                                </div>
                                <h3 className="font-bold text-primary-600 text-xl 2xl:text-4xl 2xl:my-5 text-center my-3">
                                    {service.title}
                                </h3>
                                <p className="font-medium text-sm 2xl:text-xl 2xl:pb-5 text-center opacity-60">
                                    {service.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-black font-bold text-[28px] flex items-center w-full gap-8 lg:gap-10">
                        <hr className="border-2 border-primary-600 w-[50px] lg:w-[77px]" />
                        Our Mission
                    </h2>

                    <div className="flex flex-col lg:flex-row justify-between gap-20 mb-10">
                        <p className="font-light opacity-75 text-md md:text-lg lg:text-xl w-full lg:w-2/3">
                            As a potential homebuyer, you want to work with a
                            real estate company that has your best interests in
                            mind. That&apos;s where E-Tracka comes in. We are a
                            team of dedicated professionals who are passionate
                            about helping you find your dream home. We are here
                            to help you find your dream home and make your real
                            estate dreams a reality. Contact us today to learn
                            more about our services and how we can help you.
                        </p>
                        <div className="relative w-full lg:w-[403px] h-[264px] overflow-clip rounded-lg">
                            <Image src="/house-1.png" alt="" fill />
                        </div>
                    </div>

                    <h2 className="text-black text-left font-bold text-[28px] flex items-center gap-10 w-full">
                        <hr className="border-2 border-primary-600 w-[50px] lg:w-[77px]" />
                        Vision
                    </h2>

                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-20">
                        <p className="font-light opacity-75 text-base md:text-lg lg:text-xl w-full lg:w-2/3">
                            At E-Tracka, we pride ourselves on our commitment to
                            honesty, integrity, and transparency. We understand
                            that buying a home can be one of the most
                            significant financial decisions you&apos;ll ever
                            make, and we want to ensure that you feel confident
                            and informed every step of the way. Our team of
                            experts has years of experience in the real estate
                            industry, and we know the ins and outs of the market
                            like the back of our hands.
                        </p>
                        <div className="relative w-full lg:w-[403px] h-[264px] overflow-clip rounded-lg">
                            <Image src="/house-2.png" alt="" fill />
                        </div>
                    </div>
                </section>

                <section id="services" className="my-20">
                    <h2 className="text-black lg:justify-end font-bold text-[28px] flex items-center gap-10 w-full">
                        <hr className="border-2 border-primary-600 w-[50px] lg:w-[77px]" />
                        Services we offer
                    </h2>

                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-10 my-10">
                        <div className="relative w-full lg:w-[500px] h-[340px]">
                            <Image src="/hero.png" alt="" fill />
                        </div>
                        <div className="flex flex-col justify-between items-start">
                            <h2 className="text-3xl font-bold w-3/4">
                                Injecting some integrity into the real estate
                                business
                            </h2>
                            <p className="font-light text-lg pr-10">
                                We believe at times that quality was a bit
                                deficient and there is a need to do things
                                mostly to some level of international standards
                            </p>
                            <ul className="grid grid-cols-2 items-start gap-y-6 gap-x-5 my-5">
                                <li className="flex items-start gap-5 text-md lg:text-2xl font-bold">
                                    <TbShieldCheckFilled className="text-yellow-500 w-5 h-5 " />
                                    <span className="flex-1">
                                        Listing of Properties
                                    </span>
                                </li>
                                <li className="flex items-start gap-5 text-md lg:text-2xl font-bold">
                                    <TbShieldCheckFilled className="text-yellow-500 w-5 h-5 " />
                                    <span className="flex-1">
                                        Property Management
                                    </span>
                                </li>
                                <li className="flex items-start gap-5 text-md lg:text-2xl font-bold">
                                    <TbShieldCheckFilled className="text-yellow-500 w-5 h-5 " />
                                    <span className="max-w-[270px] flex-1">
                                        Credit scores for Landlord & Tenants
                                    </span>
                                </li>
                                <li className="flex items-start gap-5 text-md lg:text-2xl font-bold">
                                    <TbShieldCheckFilled className="text-yellow-500 w-5 h-5 " />
                                    <span className="flex-1">
                                        Facilitate rent loans
                                    </span>
                                </li>
                            </ul>
                            <button className="border border-primary-600 rounded-lg px-8 py-2 text-black font-semibold mx-auto lg:mx-0">
                                See More
                            </button>
                        </div>
                    </div>
                </section>

                <section id="testimonial" className="my-20">
                    <h3 className="text-black text-left font-bold text-[28px] flex items-center gap-10 w-full">
                        <hr className="border-2 border-primary-600 w-[50px] lg:w-[77px]" />
                        Testimonial
                    </h3>

                    <h2 className="font-bold text-black text-[32px] max-w-[403px] my-5">
                        What our customers say about us
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-10 mb-10">
                        <div className="relative w-[220px] lg:w-[294px] h-[227px]">
                            <Image src={test1} alt="" fill />
                        </div>
                        <div className="border border-gray-200 px-6 py-3 max-w-3xl shadow-md">
                            <h4 className="text-xl font-bold">Engr. Ben</h4>
                            <p className="font-light text-base my-6">
                                &quot;Their team was incredibly responsive and
                                helped me find the perfect home within my
                                budget. I couldn&apos;t be happier with my
                                experience and highly recommend E-Tracka to
                                anyone in the market for a new home.&quot;
                            </p>
                            <p className="font-bold">Home owner</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse gap-10 mt-10">
                        <div className="relative w-[220px] lg:w-[294px] h-[227px]">
                            <Image src={test2} alt="" fill />
                        </div>
                        <div className="border border-gray-200 px-6 py-3 max-w-3xl shadow-md">
                            <h4 className="text-xl font-bold">Engr. Ben</h4>
                            <p className="font-light text-base my-6">
                                &quot;Their team was incredibly responsive and
                                helped me find the perfect home within my
                                budget. I couldn&apos;t be happier with my
                                experience and highly recommend E-Tracka to
                                anyone in the market for a new home.&quot;
                            </p>
                            <p className="font-bold">Home owner</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center gap-y-6 mt-20 text-center">
                    <h3 className="text-2xl lg:ext-3.5xl">
                        Get the latest on neighborhoods and more
                    </h3>
                    <p className="font-normal text-md lg:text-lg">
                        Receive real estate advice, tips, and more on the
                        homebuying journey.
                    </p>
                    <form
                        action=""
                        className="inline-flex rounded-xl overflow-hidden border w-full max-w-[350px] h-12 bg-gray-100"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email here"
                            name="email"
                            id="email"
                            className="focus:outline-none focus:border-none px-4 py-2 bg-transparent flex-1"
                        />
                        <button className="bg-primary-600 text-white px-4 py-3 h-full">
                            <BsArrowRight />
                        </button>
                    </form>
                </section>
            </section>
        </>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
