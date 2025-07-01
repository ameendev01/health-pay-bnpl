import React from 'react';

interface DataTableProps {
  headers: {
    key: string;
    label: string;
  }[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}

export default function DataTable({ headers, data, renderRow }: DataTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map(header => (
                <th key={header.key} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                {renderRow(item)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
