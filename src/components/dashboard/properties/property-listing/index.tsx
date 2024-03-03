import { Property } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import Header from './Header';
import PropertyListingCard from './PropertyListingCard';

interface PropertyProp {
    properties: Property[] | undefined;
}

const Property: FC<PropertyProp> = ({ properties }) => {
    return (
        <>
            <div className="w-full">
                <Header propertyCount={properties ? properties.length : 0} />
                <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full mb-10 min-h-[300px] ">
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
            </div>
        </>
    );
};

export default Property;
