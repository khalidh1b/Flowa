"use client";

import React from 'react';
import { useAccountCard } from '@/hooks/use-account-card';
import AccountCardUI from './ui/account-card-ui';
import { AccountCardProps } from '@/app/types/dashboard';

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
    const { updateDefaultLoading, handleDefaultChange } = useAccountCard(account);

    return (
        <AccountCardUI 
            account={account}
            updateDefaultLoading={updateDefaultLoading}
            onDefaultChange={handleDefaultChange}
        />
    );
};

export default AccountCard;