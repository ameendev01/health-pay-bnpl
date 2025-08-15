import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
        <p className="mt-3 text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
      {children && <div className="flex items-center space-x-4">{children}</div>}
    </div>
  );
}
