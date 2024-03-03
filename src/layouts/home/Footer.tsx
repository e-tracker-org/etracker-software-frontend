import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 mt-5 py-10 px-[5%] md:px-[8%] lg:px-[6%] 2xl:px-[5%] relative">
            <div className="flex flex-col-reverse md: gap-x-10 lg:gap-x-28 gap-y-12 md:flex-row  md:justify-items-start justify-items-center ">
                <div className="hidden md:block">
                    <div className="lg:w-[200px] h-[55px] relative mx-auto">
                        <Image
                            src="/logo.svg"
                            alt="e-tracka logo"
                            className="m-auto"
                            fill
                        />
                    </div>
                    <div className="flex items-center justify-center gap-5 mt-10 ">
                        <a href="#" target="_blank">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20.9 1.56799H4.10001C2.78001 1.56799 1.70001 2.64799 1.70001 3.96799V20.768C1.70001 22.0892 2.78001 23.168 4.10001 23.168H12.5V14.768H10.1V11.798H12.5V9.33799C12.5 6.74119 13.9544 4.91719 17.0192 4.91719L19.1828 4.91959V8.04559H17.7464C16.5536 8.04559 16.1 8.94079 16.1 9.77119V11.7992H19.1816L18.5 14.768H16.1V23.168H20.9C22.22 23.168 23.3 22.0892 23.3 20.768V3.96799C23.3 2.64799 22.22 1.56799 20.9 1.56799Z"
                                    fill="#66ACFF"
                                />
                            </svg>
                        </a>
                        <a href="#" target="_blank">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.5 3.20604C1.5 2.71858 1.69365 2.25107 2.03834 1.90638C2.38303 1.56169 2.85053 1.36804 3.338 1.36804H21.66C21.9016 1.36765 22.1409 1.41491 22.3641 1.50711C22.5874 1.59931 22.7903 1.73465 22.9612 1.90538C23.1322 2.07611 23.2677 2.27887 23.3602 2.50205C23.4526 2.72524 23.5001 2.96447 23.5 3.20604V21.528C23.5003 21.7697 23.4529 22.009 23.3606 22.2323C23.2683 22.4556 23.1328 22.6585 22.962 22.8294C22.7912 23.0003 22.5884 23.1358 22.3651 23.2282C22.1419 23.3207 21.9026 23.3682 21.661 23.368H3.338C3.09655 23.368 2.85746 23.3205 2.6344 23.228C2.41134 23.1356 2.20867 23.0001 2.03798 22.8294C1.8673 22.6586 1.73193 22.4558 1.63962 22.2327C1.54731 22.0096 1.49987 21.7705 1.5 21.529V3.20604ZM10.208 9.75604H13.187V11.252C13.617 10.392 14.717 9.61804 16.37 9.61804C19.539 9.61804 20.29 11.331 20.29 14.474V20.296H17.083V15.19C17.083 13.4 16.653 12.39 15.561 12.39C14.046 12.39 13.416 13.479 13.416 15.19V20.296H10.208V9.75604ZM4.708 20.159H7.916V9.61804H4.708V20.158V20.159ZM8.375 6.18004C8.38105 6.45472 8.33217 6.72783 8.23124 6.98336C8.13031 7.23889 7.97935 7.47168 7.78723 7.66808C7.59511 7.86447 7.3657 8.02052 7.11246 8.12705C6.85921 8.23358 6.58724 8.28846 6.3125 8.28846C6.03776 8.28846 5.76579 8.23358 5.51255 8.12705C5.2593 8.02052 5.02989 7.86447 4.83777 7.66808C4.64565 7.47168 4.49469 7.23889 4.39376 6.98336C4.29283 6.72783 4.24395 6.45472 4.25 6.18004C4.26187 5.6409 4.48439 5.12784 4.86989 4.75073C5.25539 4.37363 5.77322 4.16246 6.3125 4.16246C6.85178 4.16246 7.36961 4.37363 7.75512 4.75073C8.14062 5.12784 8.36313 5.6409 8.375 6.18004Z"
                                    fill="#4AC1F3"
                                />
                            </svg>
                        </a>
                        <a href="#" target="_blank">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.25 6.32821C21.5328 6.63758 20.7524 6.86024 19.9485 6.94696C20.7831 6.4511 21.4081 5.66774 21.7063 4.74383C20.9231 5.20974 20.0651 5.53645 19.1703 5.70946C18.7964 5.30968 18.3441 4.99119 17.8417 4.77385C17.3392 4.55651 16.7974 4.44497 16.25 4.44618C14.0352 4.44618 12.2539 6.24149 12.2539 8.44461C12.2539 8.75399 12.2914 9.06336 12.3524 9.36102C9.03596 9.18758 6.07815 7.60321 4.11174 5.17743C3.75344 5.78942 3.56568 6.48624 3.56799 7.19539C3.56799 8.5829 4.27346 9.80633 5.34924 10.5259C4.71527 10.5009 4.09614 10.3266 3.54221 10.0173V10.0665C3.54221 12.0095 4.91565 13.6196 6.74612 13.9899C6.40243 14.0792 6.04887 14.1249 5.69377 14.1259C5.43362 14.1259 5.18752 14.1001 4.93909 14.0649C5.44534 15.6493 6.91956 16.8001 8.67502 16.8376C7.30159 17.9134 5.58127 18.5462 3.71331 18.5462C3.37815 18.5462 3.06877 18.5345 2.74768 18.497C4.51956 19.6337 6.6219 20.2899 8.88596 20.2899C16.236 20.2899 20.2578 14.2009 20.2578 8.91571C20.2578 8.74227 20.2578 8.56883 20.2461 8.3954C21.0242 7.82586 21.7063 7.1204 22.25 6.32821Z"
                                    fill="#6D7CFF"
                                />
                            </svg>
                        </a>
                        <a href="#" target="_blank">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.965 1.43404C9.138 1.38004 9.512 1.36804 12.5 1.36804C15.488 1.36804 15.862 1.38104 17.034 1.43404C18.206 1.48704 19.006 1.67404 19.706 1.94504C20.439 2.22204 21.104 2.65504 21.654 3.21504C22.214 3.76404 22.646 4.42804 22.922 5.16204C23.194 5.86204 23.38 6.66204 23.434 7.83204C23.488 9.00704 23.5 9.38104 23.5 12.368C23.5 15.356 23.487 15.73 23.434 16.903C23.381 18.073 23.194 18.873 22.922 19.573C22.646 20.3071 22.2133 20.9722 21.654 21.522C21.104 22.082 20.439 22.514 19.706 22.79C19.006 23.062 18.206 23.248 17.036 23.302C15.862 23.356 15.488 23.368 12.5 23.368C9.512 23.368 9.138 23.355 7.965 23.302C6.795 23.249 5.995 23.062 5.295 22.79C4.56092 22.514 3.89582 22.0813 3.346 21.522C2.78638 20.9727 2.35331 20.3079 2.077 19.574C1.806 18.874 1.62 18.074 1.566 16.904C1.512 15.729 1.5 15.355 1.5 12.368C1.5 9.38004 1.513 9.00604 1.566 7.83404C1.619 6.66204 1.806 5.86204 2.077 5.16204C2.35372 4.42812 2.78712 3.76336 3.347 3.21404C3.89604 2.65454 4.56047 2.22149 5.294 1.94504C5.994 1.67404 6.794 1.48804 7.964 1.43404H7.965ZM16.945 3.41404C15.785 3.36104 15.437 3.35004 12.5 3.35004C9.563 3.35004 9.215 3.36104 8.055 3.41404C6.982 3.46304 6.4 3.64204 6.012 3.79304C5.499 3.99304 5.132 4.23004 4.747 4.61504C4.38205 4.97009 4.10118 5.40232 3.925 5.88004C3.774 6.26804 3.595 6.85004 3.546 7.92304C3.493 9.08304 3.482 9.43104 3.482 12.368C3.482 15.305 3.493 15.653 3.546 16.813C3.595 17.886 3.774 18.468 3.925 18.856C4.101 19.333 4.382 19.766 4.747 20.121C5.102 20.486 5.535 20.767 6.012 20.943C6.4 21.094 6.982 21.273 8.055 21.322C9.215 21.375 9.562 21.386 12.5 21.386C15.438 21.386 15.785 21.375 16.945 21.322C18.018 21.273 18.6 21.094 18.988 20.943C19.501 20.743 19.868 20.506 20.253 20.121C20.618 19.766 20.899 19.333 21.075 18.856C21.226 18.468 21.405 17.886 21.454 16.813C21.507 15.653 21.518 15.305 21.518 12.368C21.518 9.43104 21.507 9.08304 21.454 7.92304C21.405 6.85004 21.226 6.26804 21.075 5.88004C20.875 5.36704 20.638 5.00004 20.253 4.61504C19.8979 4.25011 19.4657 3.96925 18.988 3.79304C18.6 3.64204 18.018 3.46304 16.945 3.41404ZM11.095 15.759C11.8797 16.0857 12.7534 16.1298 13.5669 15.8838C14.3805 15.6378 15.0834 15.117 15.5556 14.4103C16.0278 13.7036 16.2401 12.8549 16.156 12.0091C16.072 11.1634 15.697 10.373 15.095 9.77304C14.7112 9.38952 14.2472 9.09585 13.7363 8.91319C13.2255 8.73052 12.6804 8.6634 12.1405 8.71666C11.6006 8.76991 11.0792 8.94222 10.6138 9.22117C10.1485 9.50013 9.75074 9.87879 9.4493 10.3299C9.14786 10.781 8.95019 11.2933 8.87052 11.83C8.79084 12.3667 8.83115 12.9143 8.98854 13.4336C9.14593 13.9528 9.41648 14.4307 9.78072 14.8328C10.145 15.2349 10.5938 15.5512 11.095 15.759ZM8.502 8.37004C9.02702 7.84502 9.65032 7.42854 10.3363 7.1444C11.0223 6.86026 11.7575 6.71402 12.5 6.71402C13.2425 6.71402 13.9777 6.86026 14.6637 7.1444C15.3497 7.42854 15.973 7.84502 16.498 8.37004C17.023 8.89507 17.4395 9.51836 17.7236 10.2043C18.0078 10.8903 18.154 11.6255 18.154 12.368C18.154 13.1105 18.0078 13.8458 17.7236 14.5317C17.4395 15.2177 17.023 15.841 16.498 16.366C15.4377 17.4264 13.9995 18.0221 12.5 18.0221C11.0005 18.0221 9.56234 17.4264 8.502 16.366C7.44166 15.3057 6.84597 13.8676 6.84597 12.368C6.84597 10.8685 7.44166 9.43038 8.502 8.37004ZM19.408 7.55604C19.5381 7.43331 19.6423 7.28572 19.7143 7.12202C19.7863 6.95831 19.8248 6.78181 19.8274 6.60297C19.83 6.42413 19.7967 6.24659 19.7295 6.08085C19.6622 5.91511 19.5624 5.76455 19.436 5.63808C19.3095 5.51161 19.1589 5.4118 18.9932 5.34456C18.8275 5.27732 18.6499 5.24402 18.4711 5.24662C18.2922 5.24923 18.1157 5.2877 17.952 5.35974C17.7883 5.43178 17.6407 5.53594 17.518 5.66604C17.2793 5.91907 17.1486 6.25516 17.1537 6.60297C17.1588 6.95078 17.2992 7.28292 17.5452 7.52888C17.7911 7.77485 18.1233 7.91527 18.4711 7.92034C18.8189 7.92541 19.155 7.79473 19.408 7.55604Z"
                                    fill="#FF6363"
                                />
                            </svg>
                        </a>
                        <a href="#" target="_blank">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_18_531)">
                                    <path
                                        d="M23.9999 6.875C23.864 6.39023 23.5993 5.95134 23.2339 5.605C22.8582 5.248 22.3977 4.99263 21.8959 4.863C20.0179 4.368 12.4939 4.368 12.4939 4.368C9.35722 4.33231 6.22131 4.48927 3.10389 4.838C2.60208 4.97721 2.14245 5.23828 1.76588 5.598C1.39588 5.954 1.12788 6.393 0.987885 6.874C0.651578 8.68574 0.488177 10.5253 0.499885 12.368C0.487885 14.209 0.650885 16.048 0.987885 17.862C1.12488 18.341 1.39188 18.778 1.76288 19.131C2.13388 19.484 2.59589 19.739 3.10389 19.874C5.00689 20.368 12.4939 20.368 12.4939 20.368C15.6345 20.4037 18.7744 20.2468 21.8959 19.898C22.3977 19.7684 22.8582 19.513 23.2339 19.156C23.5992 18.8097 23.8636 18.3708 23.9989 17.886C24.344 16.075 24.5118 14.2346 24.4999 12.391C24.5258 10.5396 24.3583 8.69056 23.9999 6.874V6.875ZM10.1019 15.792V8.945L16.3619 12.369L10.1019 15.792Z"
                                        fill="#F45252"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_18_531">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0.5 0.368042)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-black mb-5">Landlord</h4>
                    <ul className="grid gap-4">
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Manage Tenant
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Check Client&apos;s Score
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                List Property
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-black mb-5">Tenant</h4>
                    <ul className="grid gap-4">
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Check Landlord
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Search Property
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Check Property History
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-black mb-5">Resources</h4>
                    <ul className="grid gap-4">
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#"
                                className="text-sm font-normal text-black"
                            >
                                Help Centre
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-12 md:pt-4 lg:w-5/6">
                <div className="flex flex-col md:flex-row justify-start gap-4 md:gap-10 flex-1">
                    <Link className="text-sm font-normal text-black" href="/">
                        Privacy
                    </Link>
                    <Link className="text-sm font-normal text-black" href="/">
                        Cookies
                    </Link>
                    <Link className="text-sm font-normal text-black" href="/">
                        Contact us
                    </Link>
                    <Link className="text-sm font-normal text-black" href="/">
                        Careers
                    </Link>
                    <Link className="text-sm font-normal text-black" href="/">
                        Terms of Service
                    </Link>
                </div>
                <div className="py-4 my-6 md:my-10 md:text-right font-normal text-sm self-start">
                    &copy; 2022 E-Tracka Limited. All rights reserved.
                </div>
            </div>
            <p className="text-xs mb-10 lg:w-5/6">
                E-Tracka is committed to ensuring digital accessibility for
                individuals with disabilities. We are continuously working to
                improve the accessibility of our web experience for everyone,
                and we welcome feedback and accommodation requests. If you wish
                to report an issue or seek an accommodation, please{' '}
                <a href="#" className="text-primary-600">
                    let us know.
                </a>
            </p>
            <div className="block md:hidden my-10">
                <Image
                    src="/logo.svg"
                    alt="e-tracka logo"
                    className=""
                    width={200}
                    height={60}
                />
                <div className="flex md:justify-center gap-5 mt-5 ">
                    <a href="#" target="_blank">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.9 1.56799H4.10001C2.78001 1.56799 1.70001 2.64799 1.70001 3.96799V20.768C1.70001 22.0892 2.78001 23.168 4.10001 23.168H12.5V14.768H10.1V11.798H12.5V9.33799C12.5 6.74119 13.9544 4.91719 17.0192 4.91719L19.1828 4.91959V8.04559H17.7464C16.5536 8.04559 16.1 8.94079 16.1 9.77119V11.7992H19.1816L18.5 14.768H16.1V23.168H20.9C22.22 23.168 23.3 22.0892 23.3 20.768V3.96799C23.3 2.64799 22.22 1.56799 20.9 1.56799Z"
                                fill="#66ACFF"
                            />
                        </svg>
                    </a>
                    <a href="#" target="_blank">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.5 3.20604C1.5 2.71858 1.69365 2.25107 2.03834 1.90638C2.38303 1.56169 2.85053 1.36804 3.338 1.36804H21.66C21.9016 1.36765 22.1409 1.41491 22.3641 1.50711C22.5874 1.59931 22.7903 1.73465 22.9612 1.90538C23.1322 2.07611 23.2677 2.27887 23.3602 2.50205C23.4526 2.72524 23.5001 2.96447 23.5 3.20604V21.528C23.5003 21.7697 23.4529 22.009 23.3606 22.2323C23.2683 22.4556 23.1328 22.6585 22.962 22.8294C22.7912 23.0003 22.5884 23.1358 22.3651 23.2282C22.1419 23.3207 21.9026 23.3682 21.661 23.368H3.338C3.09655 23.368 2.85746 23.3205 2.6344 23.228C2.41134 23.1356 2.20867 23.0001 2.03798 22.8294C1.8673 22.6586 1.73193 22.4558 1.63962 22.2327C1.54731 22.0096 1.49987 21.7705 1.5 21.529V3.20604ZM10.208 9.75604H13.187V11.252C13.617 10.392 14.717 9.61804 16.37 9.61804C19.539 9.61804 20.29 11.331 20.29 14.474V20.296H17.083V15.19C17.083 13.4 16.653 12.39 15.561 12.39C14.046 12.39 13.416 13.479 13.416 15.19V20.296H10.208V9.75604ZM4.708 20.159H7.916V9.61804H4.708V20.158V20.159ZM8.375 6.18004C8.38105 6.45472 8.33217 6.72783 8.23124 6.98336C8.13031 7.23889 7.97935 7.47168 7.78723 7.66808C7.59511 7.86447 7.3657 8.02052 7.11246 8.12705C6.85921 8.23358 6.58724 8.28846 6.3125 8.28846C6.03776 8.28846 5.76579 8.23358 5.51255 8.12705C5.2593 8.02052 5.02989 7.86447 4.83777 7.66808C4.64565 7.47168 4.49469 7.23889 4.39376 6.98336C4.29283 6.72783 4.24395 6.45472 4.25 6.18004C4.26187 5.6409 4.48439 5.12784 4.86989 4.75073C5.25539 4.37363 5.77322 4.16246 6.3125 4.16246C6.85178 4.16246 7.36961 4.37363 7.75512 4.75073C8.14062 5.12784 8.36313 5.6409 8.375 6.18004Z"
                                fill="#4AC1F3"
                            />
                        </svg>
                    </a>
                    <a href="#" target="_blank">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.25 6.32821C21.5328 6.63758 20.7524 6.86024 19.9485 6.94696C20.7831 6.4511 21.4081 5.66774 21.7063 4.74383C20.9231 5.20974 20.0651 5.53645 19.1703 5.70946C18.7964 5.30968 18.3441 4.99119 17.8417 4.77385C17.3392 4.55651 16.7974 4.44497 16.25 4.44618C14.0352 4.44618 12.2539 6.24149 12.2539 8.44461C12.2539 8.75399 12.2914 9.06336 12.3524 9.36102C9.03596 9.18758 6.07815 7.60321 4.11174 5.17743C3.75344 5.78942 3.56568 6.48624 3.56799 7.19539C3.56799 8.5829 4.27346 9.80633 5.34924 10.5259C4.71527 10.5009 4.09614 10.3266 3.54221 10.0173V10.0665C3.54221 12.0095 4.91565 13.6196 6.74612 13.9899C6.40243 14.0792 6.04887 14.1249 5.69377 14.1259C5.43362 14.1259 5.18752 14.1001 4.93909 14.0649C5.44534 15.6493 6.91956 16.8001 8.67502 16.8376C7.30159 17.9134 5.58127 18.5462 3.71331 18.5462C3.37815 18.5462 3.06877 18.5345 2.74768 18.497C4.51956 19.6337 6.6219 20.2899 8.88596 20.2899C16.236 20.2899 20.2578 14.2009 20.2578 8.91571C20.2578 8.74227 20.2578 8.56883 20.2461 8.3954C21.0242 7.82586 21.7063 7.1204 22.25 6.32821Z"
                                fill="#6D7CFF"
                            />
                        </svg>
                    </a>
                    <a href="#" target="_blank">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.965 1.43404C9.138 1.38004 9.512 1.36804 12.5 1.36804C15.488 1.36804 15.862 1.38104 17.034 1.43404C18.206 1.48704 19.006 1.67404 19.706 1.94504C20.439 2.22204 21.104 2.65504 21.654 3.21504C22.214 3.76404 22.646 4.42804 22.922 5.16204C23.194 5.86204 23.38 6.66204 23.434 7.83204C23.488 9.00704 23.5 9.38104 23.5 12.368C23.5 15.356 23.487 15.73 23.434 16.903C23.381 18.073 23.194 18.873 22.922 19.573C22.646 20.3071 22.2133 20.9722 21.654 21.522C21.104 22.082 20.439 22.514 19.706 22.79C19.006 23.062 18.206 23.248 17.036 23.302C15.862 23.356 15.488 23.368 12.5 23.368C9.512 23.368 9.138 23.355 7.965 23.302C6.795 23.249 5.995 23.062 5.295 22.79C4.56092 22.514 3.89582 22.0813 3.346 21.522C2.78638 20.9727 2.35331 20.3079 2.077 19.574C1.806 18.874 1.62 18.074 1.566 16.904C1.512 15.729 1.5 15.355 1.5 12.368C1.5 9.38004 1.513 9.00604 1.566 7.83404C1.619 6.66204 1.806 5.86204 2.077 5.16204C2.35372 4.42812 2.78712 3.76336 3.347 3.21404C3.89604 2.65454 4.56047 2.22149 5.294 1.94504C5.994 1.67404 6.794 1.48804 7.964 1.43404H7.965ZM16.945 3.41404C15.785 3.36104 15.437 3.35004 12.5 3.35004C9.563 3.35004 9.215 3.36104 8.055 3.41404C6.982 3.46304 6.4 3.64204 6.012 3.79304C5.499 3.99304 5.132 4.23004 4.747 4.61504C4.38205 4.97009 4.10118 5.40232 3.925 5.88004C3.774 6.26804 3.595 6.85004 3.546 7.92304C3.493 9.08304 3.482 9.43104 3.482 12.368C3.482 15.305 3.493 15.653 3.546 16.813C3.595 17.886 3.774 18.468 3.925 18.856C4.101 19.333 4.382 19.766 4.747 20.121C5.102 20.486 5.535 20.767 6.012 20.943C6.4 21.094 6.982 21.273 8.055 21.322C9.215 21.375 9.562 21.386 12.5 21.386C15.438 21.386 15.785 21.375 16.945 21.322C18.018 21.273 18.6 21.094 18.988 20.943C19.501 20.743 19.868 20.506 20.253 20.121C20.618 19.766 20.899 19.333 21.075 18.856C21.226 18.468 21.405 17.886 21.454 16.813C21.507 15.653 21.518 15.305 21.518 12.368C21.518 9.43104 21.507 9.08304 21.454 7.92304C21.405 6.85004 21.226 6.26804 21.075 5.88004C20.875 5.36704 20.638 5.00004 20.253 4.61504C19.8979 4.25011 19.4657 3.96925 18.988 3.79304C18.6 3.64204 18.018 3.46304 16.945 3.41404ZM11.095 15.759C11.8797 16.0857 12.7534 16.1298 13.5669 15.8838C14.3805 15.6378 15.0834 15.117 15.5556 14.4103C16.0278 13.7036 16.2401 12.8549 16.156 12.0091C16.072 11.1634 15.697 10.373 15.095 9.77304C14.7112 9.38952 14.2472 9.09585 13.7363 8.91319C13.2255 8.73052 12.6804 8.6634 12.1405 8.71666C11.6006 8.76991 11.0792 8.94222 10.6138 9.22117C10.1485 9.50013 9.75074 9.87879 9.4493 10.3299C9.14786 10.781 8.95019 11.2933 8.87052 11.83C8.79084 12.3667 8.83115 12.9143 8.98854 13.4336C9.14593 13.9528 9.41648 14.4307 9.78072 14.8328C10.145 15.2349 10.5938 15.5512 11.095 15.759ZM8.502 8.37004C9.02702 7.84502 9.65032 7.42854 10.3363 7.1444C11.0223 6.86026 11.7575 6.71402 12.5 6.71402C13.2425 6.71402 13.9777 6.86026 14.6637 7.1444C15.3497 7.42854 15.973 7.84502 16.498 8.37004C17.023 8.89507 17.4395 9.51836 17.7236 10.2043C18.0078 10.8903 18.154 11.6255 18.154 12.368C18.154 13.1105 18.0078 13.8458 17.7236 14.5317C17.4395 15.2177 17.023 15.841 16.498 16.366C15.4377 17.4264 13.9995 18.0221 12.5 18.0221C11.0005 18.0221 9.56234 17.4264 8.502 16.366C7.44166 15.3057 6.84597 13.8676 6.84597 12.368C6.84597 10.8685 7.44166 9.43038 8.502 8.37004ZM19.408 7.55604C19.5381 7.43331 19.6423 7.28572 19.7143 7.12202C19.7863 6.95831 19.8248 6.78181 19.8274 6.60297C19.83 6.42413 19.7967 6.24659 19.7295 6.08085C19.6622 5.91511 19.5624 5.76455 19.436 5.63808C19.3095 5.51161 19.1589 5.4118 18.9932 5.34456C18.8275 5.27732 18.6499 5.24402 18.4711 5.24662C18.2922 5.24923 18.1157 5.2877 17.952 5.35974C17.7883 5.43178 17.6407 5.53594 17.518 5.66604C17.2793 5.91907 17.1486 6.25516 17.1537 6.60297C17.1588 6.95078 17.2992 7.28292 17.5452 7.52888C17.7911 7.77485 18.1233 7.91527 18.4711 7.92034C18.8189 7.92541 19.155 7.79473 19.408 7.55604Z"
                                fill="#FF6363"
                            />
                        </svg>
                    </a>
                    <a href="#" target="_blank">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_18_531)">
                                <path
                                    d="M23.9999 6.875C23.864 6.39023 23.5993 5.95134 23.2339 5.605C22.8582 5.248 22.3977 4.99263 21.8959 4.863C20.0179 4.368 12.4939 4.368 12.4939 4.368C9.35722 4.33231 6.22131 4.48927 3.10389 4.838C2.60208 4.97721 2.14245 5.23828 1.76588 5.598C1.39588 5.954 1.12788 6.393 0.987885 6.874C0.651578 8.68574 0.488177 10.5253 0.499885 12.368C0.487885 14.209 0.650885 16.048 0.987885 17.862C1.12488 18.341 1.39188 18.778 1.76288 19.131C2.13388 19.484 2.59589 19.739 3.10389 19.874C5.00689 20.368 12.4939 20.368 12.4939 20.368C15.6345 20.4037 18.7744 20.2468 21.8959 19.898C22.3977 19.7684 22.8582 19.513 23.2339 19.156C23.5992 18.8097 23.8636 18.3708 23.9989 17.886C24.344 16.075 24.5118 14.2346 24.4999 12.391C24.5258 10.5396 24.3583 8.69056 23.9999 6.874V6.875ZM10.1019 15.792V8.945L16.3619 12.369L10.1019 15.792Z"
                                    fill="#F45252"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_18_531">
                                    <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="translate(0.5 0.368042)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
