import React, { FC } from 'react';

interface FeatureCardProp {
    featureIcon: any;
    featureText: string;
}

export const FeatureCard: FC<FeatureCardProp> = ({
    featureIcon,
    featureText,
}) => {
    return (
        <div className="flex items-center sm:gap-2 lg:gap-5 w-full flex-wrap">
            {featureIcon}
            <span className="sm:text-sm lg:text-xl">{featureText}</span>
        </div>
    );
};
