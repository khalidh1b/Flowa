"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Category } from '@/app/types/transaction';

interface CategorySelectorProps {
    value: string;
    onValueChange: (value: string) => void;
    categories: Category[];
    error?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    value,
    onValueChange,
    categories,
    error,
}) => {
    return (
        <div className='space-y-2'>
            <label className='text-sm font-medium'> Category </label>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && (
                <p className='text-sm text-red-500'> {error} </p>
            )}
        </div>
    );
};

export default CategorySelector;
