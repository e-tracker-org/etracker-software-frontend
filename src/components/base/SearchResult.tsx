import Image from 'next/image';
import React, { FC } from 'react';

interface SearchResultProps {
    title?: string;
    content?: string;
}

const SearchResult: FC<SearchResultProps> = ({
    title = 'No results found',
    content = ' Please modify search criteria and try searching again',
}) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <Image
                src="/searchResult.svg"
                width={100}
                height={200}
                alt="Search not found result"
            />
            <h3 className=" text-[rgba(19,19,19,0.6)] text-md lg:text-lg mb-5">
                {title}
            </h3>
            <p className=" text-[rgba(19,19,19,0.6)] text-sm lg:text-md">
                {content}
            </p>
        </div>
    );
};

export default SearchResult;
