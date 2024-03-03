import React from 'react';

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>
            )}
        </>
    );
};

export default Loader;
