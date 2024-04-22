//@ts-ignore
import { Property } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import Header from './Header';
import PropertyListingCard from './PropertyListingCard';
import { useAppStore } from 'hooks/useAppStore';
import Loader from 'components/base/Loader';

interface PropertyProp {
    properties: Property[] | undefined;
}

const Property: FC<PropertyProp> = ({ properties }) => {
    const states = useAppStore();

    const getFilterDetailsFromLocalStorage = () => {
        const filterDetailsString = localStorage.getItem('filterDetails');
        if (filterDetailsString) {
            return JSON.parse(filterDetailsString);
        }
        return null;
    };

    const applyFilter = (properties: Property[]) => {
        const filterDetailsFromLocalStorage =
            getFilterDetailsFromLocalStorage();

        const filteredProperties = properties.filter((property: Property) => {
            if (filterDetailsFromLocalStorage) {
                const { state, propertyActive, apartmentType } =
                    filterDetailsFromLocalStorage;

                if (
                    state &&
                    !property.location.state
                        .toLowerCase()
                        .includes(state.toLowerCase())
                ) {
                    return false;
                }

                const isActive =
                    propertyActive === 'Active'
                        ? true
                        : propertyActive === 'Off Market'
                        ? false
                        : undefined;

                if (isActive !== undefined && property.is_active !== isActive) {
                    return false;
                }

                if (
                    apartmentType &&
                    !property.apartmentType
                        .toLowerCase()
                        .includes(apartmentType.toLowerCase())
                ) {
                    return false;
                }
            }

            return true;
        });

        return filteredProperties;
    };

    const searchedProperty = properties?.filter((property: any) =>
        property.name.toLowerCase().includes(states?.searchParam.toLowerCase())
    );

    const displayProperties = states?.searchParam
        ? searchedProperty
        : properties;

    const filteredProperties = applyFilter(displayProperties || []);

    return (
        <>
            <div className="w-full">
                <Header
                    propertyCount={
                        filteredProperties ? filteredProperties.length : 0
                    }
                />
                <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full mb-10 min-h-[300px] ">
                    {Array.isArray(filteredProperties) &&
                    filteredProperties.length ? (
                        filteredProperties.map((property) => (
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
