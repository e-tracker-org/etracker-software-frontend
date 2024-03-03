import React from 'react';
import { Select, Space } from 'antd';

interface SelectBoxProp {
    defaultValue?: string | { value: string; label: string };
    handleChange?: (value: string) => void;
    resetLabel: string;
    className: '';
    options?: {
        value: string;
        label: string;
        diasbled?: boolean;
    }[];
}

const handleChangeDefault = (value: string) => {
    console.log(`selected ${value}`);
    // return value;
};

const SelectBox: React.FC<SelectBoxProp> = ({
    defaultValue,
    resetLabel,
    options,
    handleChange,
    className,
}) => (
    // <Space wrap>
    <Select
        // @ts-ignore
        defaultValue={defaultValue}
        // style={}
        className={className}
        onChange={handleChange ? handleChange : handleChangeDefault}
        options={
            options
                ? [{ value: '', label: resetLabel }, ...options]
                : [{ value: '', label: 'Add Options' }]
        }
    />
    // </Space>
);

export default SelectBox;
