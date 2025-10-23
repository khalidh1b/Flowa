"use client";

import CreateAccountDrawer from '@/components/create-account-drawer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Account } from '@/app/types/transaction';

interface AmountAccountFieldsProps {
    amountValue?: string;
    amountOnChange?: (value: string) => void;
    amountError?: string;
    amountRegister?: any;
    
    accountIdValue?: string;
    accountIdOnChange?: (value: string) => void;
    accountIdError?: string;
    accountIdRegister?: any;
    accountIdDefaultValue?: string;
    
    accounts: Account[];
}

const AmountAccountFields: React.FC<AmountAccountFieldsProps> = ({
    amountValue,
    amountOnChange,
    amountError,
    amountRegister,
    accountIdValue,
    accountIdOnChange,
    accountIdError,
    accountIdDefaultValue,
    accounts,
}) => {
    return (
        <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
                <label className='text-sm font-medium'> Amount </label>
                <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amountValue}
                    onChange={amountOnChange ? (e) => amountOnChange(e.target.value) : undefined}
                    {...amountRegister}
                />

                {amountError && (
                    <p className='text-sm text-red-500'> {amountError} </p>
                )}
            </div>

            <div className='space-y-2'>
                <label className='text-sm font-medium'> Account </label>
                <Select 
                    onValueChange={accountIdOnChange} 
                    value={accountIdValue}
                    defaultValue={accountIdDefaultValue}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                        {accounts.map((account: Account) => (
                            <SelectItem key={account.id} value={account.id}>
                                {account.name} ({account.currency} {parseFloat(String(account.balance)).toFixed(2)})
                            </SelectItem>
                        ))}

                        {/* Render a simple button that opens the CreateAccountDrawer */}
                        <CreateAccountDrawer>
                            <div className="w-full select-none items-center text-sm outline-none ghost">
                                Create Account
                            </div>
                        </CreateAccountDrawer>
                    </SelectContent>
                </Select>

                {accountIdError && (
                    <p className='text-sm text-red-500'> {accountIdError} </p>
                )}
            </div>
        </div>
    );
};

export default AmountAccountFields;
