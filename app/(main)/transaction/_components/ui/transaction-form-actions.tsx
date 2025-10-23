"use client";

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TransactionFormActionsProps {
    isLoading?: boolean;
    editMode?: boolean;
    onCancel?: () => void;
}

const TransactionFormActions: React.FC<TransactionFormActionsProps> = ({
    isLoading = false,
    editMode = false,
    onCancel,
}) => {
    const router = useRouter();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    };

    return (
        <div className='flex gap-4'>
            <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleCancel}
            > 
                Cancel 
            </Button>
            <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
            > 
                {isLoading ? (
                    <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        {editMode ? "Updating..." : "Creating..."}
                    </>
                ) : editMode ? (
                    "Update Transaction"
                ) : (
                    "Create Transaction"
                )} 
            </Button>
        </div>
    );
};

export default TransactionFormActions;
