"use client";

import { Table, TableBody, TableCell, TableCaption } from '@/components/ui/table';
import React from 'react';

interface TransactionTableContainerProps {
    children: React.ReactNode;
    isEmpty?: boolean;
    emptyMessage?: string;
}

export const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({
    children,
    isEmpty = false,
    emptyMessage = "No Transactions Found",
}) => {
    return (
        <div className='rounded-md border'>
            <Table>
                {children}
                {isEmpty && (
                    <TableCaption className='text-center text-muted-foreground'>
                        {emptyMessage}
                    </TableCaption>
                )}
            </Table>
        </div>
    );
};

export const EmptyTransactionRow: React.FC<{ colSpan?: number; message?: string }> = ({
    colSpan = 7,
    message = "No Transactions Found"
}) => (
    <TableBody>
        <tr>
            <TableCell colSpan={colSpan} className='text-center text-muted-foreground'>
                {message}
            </TableCell>
        </tr>
    </TableBody>
);