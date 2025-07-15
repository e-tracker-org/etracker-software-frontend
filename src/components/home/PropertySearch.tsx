import { IoBedOutline } from 'react-icons/io5';
import { TfiLocationPin } from 'react-icons/tfi';
import { SlHome } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { getAllGeneralProperties } from 'services/newServices/properties';

export default function PropertySearch() {
    const [propType, setPropType] = useState('rent');
    const [bedRooms, setBedRooms] = useState(1);
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const propertyData = await getAllGeneralProperties();
            setProperties(propertyData);
        }
        fetchData();
    }, []);

    function extractPropertyInfoFromArray(properties: any) {
        if (properties) {
            return properties.map(
                (property: {
                    number_of_bedrooms: any;
                    location: any;
                    apartmentType: any;
                }) => {
                    const { number_of_bedrooms, location, apartmentType } =
                        property;
                    const city = location.city;
                    const state = location.state;

                    return {
                        number_of_bedrooms,
                        location: `${city}`,
                        apartmentType,
                    };
                }
            );
        }
    }

    const parsePriceRange = (range: any) => {
        const [min, max] = range.split('-').map((value: string) => {
            value = value.trim().toLowerCase();
            if (value.endsWith('k')) {
                return parseInt(value) * 1000;
            } else if (value.endsWith('m')) {
                return parseInt(value) * 1000000;
            } else {
                return parseInt(value);
            }
        });

        return [min, max];
    };

    const handleSearch = () => {
        const searchQuery = {
            city,
            type,
            price,
        };

        if (!searchQuery || Object.keys(searchQuery).length === 0) {
            return properties;
        }

        const [minPrice, maxPrice] = parsePriceRange(price);

        const filteredProperties = properties.filter((property) => {
            // @ts-ignore
            const cityMatch =
                !city ||
                property.location.city.toLowerCase() === city.toLowerCase();
            // @ts-ignore
            const typeMatch =
                !type ||
                property.apartmentType.toLowerCase() === type.toLowerCase();
            // @ts-ignore
            const priceMatch =
                property.price >= minPrice && property.price <= maxPrice;

            return cityMatch && typeMatch && priceMatch;
        });

        // Set a flag to indicate that a search was performed
        localStorage.setItem('searchPerformed', 'true');

        if (filteredProperties.length > 0) {
            localStorage.setItem(
                'filteredProperties',
                JSON.stringify(filteredProperties)
            );

            window.location.reload();
        } else {
            localStorage.setItem('filteredProperties', JSON.stringify([]));

            alert('No properties found matching the search criteria.');

            window.location.reload();
        }

        return filteredProperties;
    };

    const extractedInfoArray = extractPropertyInfoFromArray(properties);

    return (
        <nav
            style={{ paddingTop: 20 }}
            className="absolute  z-10 right-0 left-0 bottom-[-72%] md:bottom-[-50%] lg:bottom-[-15%] mx-auto 
         bg-white rounded-md shadow-xl p-9 w-[94%] md:w-[90%] lg:w-[80%] 2xl:w-[60%]
        "
        >
            <div className="flex font-semibold">
                <button
                    type="button"
                    disabled
                    onClick={() => setPropType('buy')}
                    data-active={propType === 'buy'}
                    className="data-[active='true']:text-primary-600  text-gray-800 bg-[#F2F1F1] transition-all delay-150
            data-[active='true']:bg-white data-[active='true']:drop-shadow-t-xs  py-3 data-[active='true']:py-[10px]  px-4 data-[active='true']:px-[45px]"
                >
                    Buy
                </button>
                <button
                    type="button"
                    disabled
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
                            <span>Location</span>
                        </label>
                        <div className="pr-3">
                            <select
                                name="state"
                                defaultValue=""
                                onChange={(e) => setCity(e.target.value)}
                                className="text-black bg-transparent font-medium mx-auto py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="">Select</option>
                                {extractedInfoArray?.map(
                                    (state: any, i: any) => (
                                        <option key={i} value={state?.location}>
                                            {state?.location}
                                        </option>
                                    )
                                )}
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
                                onChange={(e) => setType(e.target.value)}
                                defaultValue=""
                                className="text-black bg-transparent font-medium mx-auto py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="">Select</option>
                                <option value="flat">Flat</option>
                                <option value="mini-flat">Mini Flat</option>
                                <option value="one-bed">One Bedroom</option>
                                <option value="two-bed">Two Bedroom</option>
                                <option value="three-bed">Three Bedroom</option>
                                <option value="four-bed">Four Bedroom</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Duplex">Duplex</option>
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
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                                defaultValue=""
                                className="text-black bg-transparent mx-auto font-medium py-2 pr-1 focus:outline-none md:min-w-[90px] w-full"
                            >
                                <option value="">Select</option>
                                <option value="100k-1M">100-1M</option>
                                <option value="1M - 500M">1M - 500M</option>
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
                <button
                    onClick={() => handleSearch()}
                    className="block h-12 bg-primary-600 rounded-lg px-8 py-2 text-white font-semibold lg:mx-auto"
                >
                    Search
                </button>
            </div>
        </nav>
    );
}
