import React from 'react';
import ReportStatusBadge from './ReportStatusBadge';

const ReportTable = ({ columns, rows }) => {
    if (rows.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No data found for the selected criteria.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-6 py-3">{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={`${rowIndex}-${col.key}`} className="px-6 py-4">
                                    {col.key === 'status' ? (
                                        <ReportStatusBadge status={row[col.key]} />
                                    ) : (
                                        row[col.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
