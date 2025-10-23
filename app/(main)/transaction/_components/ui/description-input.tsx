"use client";

import { Input } from '@/components/ui/input';

interface DescriptionInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string;
    register?: any;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
    value,
    onChange,
    placeholder = "Enter description",
    error,
    register,
}) => {
    return (
        <div className='space-y-2'>
            <label className='text-sm font-medium'> Description </label>
            <Input 
                placeholder={placeholder} 
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                {...register}
            />

            {error && (
                <p className='text-sm text-red-500'> {error} </p>
            )}
        </div>
    );
};

export default DescriptionInput;
