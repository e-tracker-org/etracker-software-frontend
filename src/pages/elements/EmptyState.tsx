import React from 'react';

const renderEmptyState = () => (
    <tr>
        <td colSpan={4} className="text-center py-8">
            <p className="text-gray-500">No data found.</p>
        </td>
    </tr>
);

export default renderEmptyState