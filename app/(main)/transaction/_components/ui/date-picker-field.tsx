"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface DatePickerFieldProps {
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
    value,
    onChange,
    error,
}) => {
    return (
        <div className='space-y-2'>
            <label className='text-sm font-medium'> Date </label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full pl-3 text-left font-normal">
                        {value ? format(value, "PPP") : <span> Pick a date </span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        className="p-2"
                        classNames={{}}
                        mode="single"
                        selected={value}
                        onSelect={(date: Date | undefined) => date && onChange(date)}
                        disabled={(date: Date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus={true}
                    />
                </PopoverContent>
            </Popover>

            {error && (
                <p className='text-sm text-red-500'> {error} </p>
            )}
        </div>
    );
};

export default DatePickerField;
