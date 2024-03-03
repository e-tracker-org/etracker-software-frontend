import { CurrentKyc } from './Auth';

export interface Property {
    name: string;
    description: string;
    price: number;
    location: { city: string; state: string };
    agreementEstimate: number;
    status: string;
    apartmentType: string;
    featureList: string[];
    imageList: string;
    createdBy: string;
    currentOwner: string;
    createdAt: string;
    updatedAt: string;
    is_active: boolean;
    year_built: string;
    address: string;
    number_of_bath: number;
    number_of_bedrooms: number;
    image_list: any;
    id: string;
}

export interface PropertySchema {
    id?: string;
    name: string;
    price: number;
    number_of_bedrooms: number | undefined;
    number_of_bath: number | undefined;
    address: string;
    status: 'RENT' | 'BUY' | 'SELL';
    description: string;
    city: string;
    state: string;
    apartmentType: string;
    year_built: number | undefined;
    accountType: number | undefined;
    kycStage: number | undefined;
    category: string | undefined;
    currentKyc?: CurrentKyc;
}
