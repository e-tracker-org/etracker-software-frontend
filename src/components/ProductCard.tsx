import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaBath, FaBed } from 'react-icons/fa';
import sample_apt from 'assets/imgs/apt_sample.jpg';
import Image from 'next/image';

export default function ProductCard() {
    return (
        <div className="h-[240px] w-[320px] my-5">
            <div className="w-full h-full relative rounded-md overflow-hidden shadow-md">
                <Image src={sample_apt} alt="apt" fill />
                <div className="absolute right-0 left-0 top-2 flex items-center justify-between px-5 z-30">
                    <span className="text-primary-600 bg-white rounded-md px-4 py-2">
                        NEW - 1 DAY AGO
                    </span>
                    <AiFillHeart className="fill-white" />
                    {/* <AiOutlineHeart /> */}
                </div>
            </div>
            <h4 className="font-semibold text-lg mt-3">NGN1,799,000/yr</h4>
            <div className="flex gap-10 my-1">
                <span className="inline-flex items-center gap-3 text-gray-500">
                    <FaBed /> 3
                </span>
                <span className="inline-flex items-center gap-3 text-gray-500">
                    <FaBath /> 3
                </span>
            </div>
            <p className="text-md text-black">
                Grand Reserve at Gbagada, Lagos.
            </p>
        </div>
    );
}
