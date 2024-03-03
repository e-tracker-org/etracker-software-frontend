import { IoBedOutline } from 'react-icons/io5';
import { TfiLocationPin } from 'react-icons/tfi';
import { SlHome } from 'react-icons/sl';
import { useState } from 'react';

export default function PropertySearch() {
    const [propType, setPropType] = useState('rent');
    const [bedRooms, setBedRooms] = useState(2);

    return (
        <form
            className="absolute  z-10 right-0 left-0 bottom-[-72%] md:bottom-[-50%] lg:bottom-[-15%] mx-auto 
         bg-white rounded-md shadow-xl p-9 w-[94%] md:w-[90%] lg:w-[80%] 2xl:w-[60%]
        "
        >
            <div className="flex font-semibold">
                <button
                    type="button"
                    onClick={() => setPropType('buy')}
                    data-active={propType === 'buy'}
                    className="data-[active='true']:text-primary-600  text-gray-800 bg-[#F2F1F1] transition-all delay-150
            data-[active='true']:bg-white data-[active='true']:drop-shadow-t-xs  py-3 data-[active='true']:py-[10px]  px-4 data-[active='true']:px-[45px]"
                >
                    Buy
                </button>
                <button
                    type="button"
                    onClick={() => setPropType('sell')}
                    data-active={propType === 'sell'}
                    className="data-[active='true']:text-primary-600  text-gray-800 bg-[#F2F1F1] transition-all delay-150
            data-[active='true']:bg-white data-[active='true']:drop-shadow-t-xs  py-3 data-[active='true']:py-[10px]  px-4 data-[active='true']:px-[45px]"
                >
                    Sell
                </button>
                <button
                    type="button"
                    onClick={() => setPropType('rent')}
                    data-active={propType === 'rent'}
                    className="data-[active='true']:text-primary-600  text-gray-800 bg-[#F2F1F1] transition-all delay-150
            data-[active='true']:bg-white data-[active='true']:drop-shadow-t-xs  py-3 data-[active='true']:py-[10px]  px-4 data-[active='true']:px-[45px]"
                >
                    Rent
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-5 py-5 items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0 gap-y-5 md:gap-0 flex-1">
                    <div className="px-2 py-1 border md:border-r-gray-200 mr-5">
                        <label
                            htmlFor="state"
                            className="flex items-center gap-3 text-sm font-bold text-gray-400"
                        >
                            <TfiLocationPin className="stroke-gray-400" />
                            <span>City</span>
                        </label>
                        <div className="pr-3">
                            <select
                                name="state"
                                defaultValue=""
                                className="text-black bg-transparent font-medium mx-auto py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="mini-flat">Ogun</option>
                                <option value="two-bed">Oyo</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-2 py-1 border md:border-r-gray-200 mr-5">
                        <label
                            htmlFor="type"
                            className="flex items-center gap-3 text-sm font-bold text-gray-400"
                        >
                            <SlHome className="stroke-gray-400" />
                            <span>Type</span>
                        </label>
                        <div className="pr-3">
                            <select
                                name="type"
                                defaultValue=""
                                className="text-black bg-transparent font-medium mx-auto py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="mini-flat">Bungalow</option>
                                <option value="two-bed">Duplex</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-2 py-1 border md:border-r-gray-200 mr-5">
                        <label
                            htmlFor="price"
                            className="flex items-center gap-3 text-sm font-bold text-gray-400"
                        >
                            <span>₦</span>
                            <span>Price</span>
                        </label>
                        <div className="pr-3">
                            <select
                                name="state"
                                defaultValue=""
                                className="text-black bg-transparent mx-auto font-medium py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="mini-flat">100-1M</option>
                                <option value="two-bed">1M - 500M</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-2 py-1 border mr-5 ">
                        <label
                            htmlFor="bedroom"
                            className="flex items-center gap-3 text-sm font-bold text-gray-400"
                        >
                            <IoBedOutline className="stroke-gray-400" />
                            <span>Bedroom</span>
                        </label>
                        <div className="pr-3">
                            <input
                                onChange={(e) =>
                                    setBedRooms(parseInt(e.target.value))
                                }
                                value={bedRooms}
                                type="number"
                                name="bedroom"
                                className="text-black bg-transparent font-medium mx-auto py-2 px-1 focus:outline-none md:min-w-[90px] w-full"
                            />
                        </div>
                    </div>
                </div>
                <button className="block h-12 bg-primary-600 rounded-lg px-8 py-2 text-white font-semibold lg:mx-auto">
                    Search
                </button>
            </div>
        </form>
    );
}
