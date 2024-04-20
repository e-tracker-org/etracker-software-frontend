import Button from 'components/base/Button';
import { useAppStore } from 'hooks/useAppStore';
import { KycStatus } from 'interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { goBackToKyc2 } from 'utils/helper';

const Header = ({ propertyCount }: { propertyCount?: number }) => {
    const states = useAppStore();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const AddPropertyBtn = (
        <>
            {states?.activeAccount !== 1 && (
                <div className="flex justify-end w-full">
                    <Button
                        className="flex items-center md:py-2 lg:py-3 md:gap-1 lg:gap-2"
                        onClick={() => {
                            const isUserVerify = goBackToKyc2(states, router);
                            if (isUserVerify) {
                                router.replace('/dashboard/properties/add');
                            }
                            // if (
                            //     states?.activeKyc?.status ===
                            //     KycStatus.INCOMPLETE
                            // ) {
                            //     states?.setScreen('kyc');
                            //     states?.setActiveKyc(states?.activeKyc);
                            //     states?.setStep(
                            //         states?.activeKyc?.kycStage + 1
                            //     );
                            //     router.push('/onboarding/kyc');
                            // } else {
                            //     router.push('/dashboard/property');
                            // }
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z"
                                fill="white"
                            />
                        </svg>
                        Add Property
                    </Button>
                </div>
            )}
        </>
    );

    const SearchInput = (
        <div className="relative w-full">
            <svg
                className="absolute top-[25%] left-5"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22.2314 21.1895L16.5674 15.5255C17.9285 13.8914 18.6072 11.7956 18.4624 9.67389C18.3176 7.55219 17.3603 5.56801 15.7898 4.1341C14.2193 2.7002 12.1565 1.92697 10.0304 1.97528C7.90429 2.02359 5.87867 2.88971 4.37492 4.39347C2.87116 5.89723 2.00503 7.92284 1.95672 10.0489C1.90842 12.175 2.68164 14.2379 4.11555 15.8084C5.54945 17.3789 7.53364 18.3361 9.65534 18.481C11.777 18.6258 13.8729 17.9471 15.5069 16.586L21.1709 22.25L22.2314 21.1895ZM3.48141 10.25C3.48141 8.91494 3.87729 7.6099 4.61899 6.49987C5.36069 5.38983 6.4149 4.52467 7.6483 4.01378C8.8817 3.50289 10.2389 3.36921 11.5483 3.62966C12.8576 3.89011 14.0604 4.53299 15.0044 5.47699C15.9484 6.421 16.5913 7.62373 16.8517 8.9331C17.1122 10.2425 16.9785 11.5997 16.4676 12.8331C15.9567 14.0665 15.0915 15.1207 13.9815 15.8624C12.8715 16.6041 11.5664 17 10.2314 17C8.44181 16.998 6.72607 16.2862 5.46063 15.0207C4.19519 13.7553 3.4834 12.0396 3.48141 10.25Z"
                    fill="#131313"
                    fillOpacity="0.45"
                />
            </svg>

            <input
                type="search"
                placeholder="Type here to search for property"
                className="rounded-xl bg-[#FFFFFF] placeholder:text-[#13131373] w-full pl-16 pr-4 py-3 focus:border-primary-600 border border-[#B9B9B9]"
            />
        </div>
    );
    return (
        <header className="flex flex-col lg:flex-row justify-between items-center w-full my-5 gap-5 lg:gap-20 pb-5 px-5">
            {isMobile ? AddPropertyBtn : null}
            <div className="flex items-center gap-x-8 mb-4">
                <span className="text-xl font-medium whitespace-nowrap">
                    {propertyCount} Total
                </span>
                {!isMobile ? SearchInput : null}
                <div className="flex w-2/5 justify-between items-center">
                    <svg
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                    >
                        <path
                            d="M9.33334 20.3335C8.95556 20.3335 8.63867 20.2055 8.38267 19.9495C8.12667 19.6935 7.99911 19.3771 8 19.0002C8 18.6224 8.128 18.3055 8.384 18.0495C8.64 17.7935 8.95645 17.6659 9.33334 17.6668H22.6667C23.0444 17.6668 23.3613 17.7948 23.6173 18.0508C23.8733 18.3068 24.0009 18.6233 24 19.0002C24 19.3779 23.872 19.6948 23.616 19.9508C23.36 20.2068 23.0436 20.3344 22.6667 20.3335H9.33334ZM9.33334 12.3335C8.95556 12.3335 8.63867 12.2055 8.38267 11.9495C8.12667 11.6935 7.99911 11.3771 8 11.0002C8 10.6224 8.128 10.3055 8.384 10.0495C8.64 9.7935 8.95645 9.66594 9.33334 9.66683H22.6667C23.0444 9.66683 23.3613 9.79483 23.6173 10.0508C23.8733 10.3068 24.0009 10.6233 24 11.0002C24 11.3779 23.872 11.6948 23.616 11.9508C23.36 12.2068 23.0436 12.3344 22.6667 12.3335H9.33334ZM9.33334 4.3335C8.95556 4.3335 8.63867 4.2055 8.38267 3.9495C8.12667 3.6935 7.99911 3.37705 8 3.00016C8 2.62239 8.128 2.3055 8.384 2.0495C8.64 1.7935 8.95645 1.66594 9.33334 1.66683H22.6667C23.0444 1.66683 23.3613 1.79483 23.6173 2.05083C23.8733 2.30683 24.0009 2.62328 24 3.00016C24 3.37794 23.872 3.69483 23.616 3.95083C23.36 4.20683 23.0436 4.33439 22.6667 4.3335H9.33334ZM2.66667 21.6668C1.93334 21.6668 1.30534 21.4055 0.782669 20.8828C0.260002 20.3602 -0.000886625 19.7326 2.26373e-06 19.0002C2.26373e-06 18.2668 0.261336 17.6388 0.784002 17.1162C1.30667 16.5935 1.93422 16.3326 2.66667 16.3335C3.4 16.3335 4.028 16.5948 4.55067 17.1175C5.07334 17.6402 5.33422 18.2677 5.33334 19.0002C5.33334 19.7335 5.072 20.3615 4.54934 20.8842C4.02667 21.4068 3.39911 21.6677 2.66667 21.6668ZM2.66667 13.6668C1.93334 13.6668 1.30534 13.4055 0.782669 12.8828C0.260002 12.3602 -0.000886625 11.7326 2.26373e-06 11.0002C2.26373e-06 10.2668 0.261336 9.63883 0.784002 9.11616C1.30667 8.5935 1.93422 8.33261 2.66667 8.3335C3.4 8.3335 4.028 8.59483 4.55067 9.1175C5.07334 9.64017 5.33422 10.2677 5.33334 11.0002C5.33334 11.7335 5.072 12.3615 4.54934 12.8842C4.02667 13.4068 3.39911 13.6677 2.66667 13.6668ZM2.66667 5.66683C1.93334 5.66683 1.30534 5.4055 0.782669 4.88283C0.260002 4.36017 -0.000886625 3.73261 2.26373e-06 3.00016C2.26373e-06 2.26683 0.261336 1.63883 0.784002 1.11616C1.30667 0.593498 1.93422 0.332609 2.66667 0.333498C3.4 0.333498 4.028 0.594831 4.55067 1.1175C5.07334 1.64016 5.33422 2.26772 5.33334 3.00016C5.33334 3.7335 5.072 4.3615 4.54934 4.88416C4.02667 5.40683 3.39911 5.66772 2.66667 5.66683Z"
                            fill="black"
                        />
                    </svg>
                    <div className="p-2 bg-white flex justify-between items-center w-[115px] py-2 px-5 rounded-md text-lg font-medium">
                        <svg
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21.3197 0.666504H0.653028C0.565785 0.673235 0.484313 0.712709 0.424962 0.777006C0.36561 0.841304 0.332769 0.925668 0.333028 1.01317V2.15984C0.332227 2.27737 0.354801 2.39388 0.399436 2.50261C0.444071 2.61134 0.509878 2.71011 0.593028 2.79317L8.59303 10.7932V17.4598L13.4264 19.8665V10.7798L21.4264 2.77984C21.5794 2.61475 21.6651 2.39829 21.6664 2.17317V1.01317C21.6664 0.921229 21.6298 0.833053 21.5648 0.76804C21.4998 0.703028 21.4116 0.666504 21.3197 0.666504Z"
                                fill="#131313"
                                fill-opacity="0.8"
                            />
                        </svg>
                        <span>Filter</span>
                    </div>
                </div>
                {/* Conditionally render AddPropertyBtn based on screen size */}
                {!isMobile ? AddPropertyBtn : null}
            </div>
            {/* Conditionally render SearchInput based on screen size */}
            {isMobile ? SearchInput : null}
        </header>
    );
};

export default Header;
