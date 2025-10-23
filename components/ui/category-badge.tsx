"use client";

import React from 'react';
import { categoryColors } from '@/data/categories';

interface CategoryBadgeProps {
    category: string;
    className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
    category, 
    className = "" 
}) => (
    <span 
        style={{
            background: categoryColors[category] || "#64748b"
        }} 
        className={`px-2 py-1 rounded text-white text-sm ${className}`}
    >
        {category}
    </span>
);
