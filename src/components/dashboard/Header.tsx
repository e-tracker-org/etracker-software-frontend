import BackButton from 'components/base/BackButton';
import { AccountType } from 'interfaces';
import React, { FC, ReactNode } from 'react';

const DashboardHeader: FC<{
    acctType?: AccountType | undefined;
    title: string;
    children?: ReactNode;
    backButton?: boolean;
    titleClassName?: string;
}> = ({ acctType, title, children, backButton, titleClassName }) => {
    return (
        <header className="mb-8">
            <div className="flex gap-8 items-center">
                {backButton && <BackButton />}

                <h3
                    className={`text-4xl font-semibold text-black ${titleClassName}`}
                >
                    {title}{' '}
                    {/* {acctType && (
                        <span className="text-[0.8em] text-gray-500">
                            ({acctType?.accountType})
                        </span>
                    )} */}
                </h3>
            </div>

            {children && <div className="mt-3">{children}</div>}
        </header>
    );
};

export default DashboardHeader;
