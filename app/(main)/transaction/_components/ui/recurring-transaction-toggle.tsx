"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface RecurringTransactionToggleProps {
    isRecurring: boolean;
    onRecurringChange: (checked: boolean) => void;
    recurringInterval?: string;
    onIntervalChange?: (value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY") => void;
    intervalError?: string;
    intervalDefaultValue?: string;
}

const RecurringTransactionToggle: React.FC<RecurringTransactionToggleProps> = ({
    isRecurring,
    onRecurringChange,
    recurringInterval,
    onIntervalChange,
    intervalError,
    intervalDefaultValue,
}) => {
    return (
        <>
            <div className='flex items-center justify-between rounded-lg border p-3'>
                <div className='space-y-0.5'>
                    <label htmlFor='isDefault' className='text-sm font-medium cursor-pointer'> Recurring Transaction </label>
                    <p className='text-sm text-muted-foreground'> Set up a recurring schedule for this transaction </p>
                </div>
                
                <Switch checked={isRecurring} onCheckedChange={onRecurringChange} />
            </div>

            {isRecurring && (
                <div className='space-y-2'>
                    <label className='text-sm font-medium'> Recurring Interval </label>
                    <Select 
                        onValueChange={onIntervalChange} 
                        value={recurringInterval}
                        defaultValue={intervalDefaultValue}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Interval" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DAILY"> Daily </SelectItem>
                            <SelectItem value="WEEKLY"> Weekly </SelectItem>
                            <SelectItem value="MONTHLY"> Monthly </SelectItem>
                            <SelectItem value="YEARLY"> Yearly </SelectItem>
                        </SelectContent>
                    </Select>

                    {intervalError && (
                        <p className='text-sm text-red-500'> {intervalError} </p>
                    )}
                </div>
            )}
        </>
    );
};

export default RecurringTransactionToggle;
