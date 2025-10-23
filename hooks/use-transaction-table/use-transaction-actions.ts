import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useFetch from '@/hooks/use-fetch';
import { bulkDeleteTransaction } from '@/app/actions/accounts';

/**
 * Hook for managing transaction actions (delete, edit, etc.)
 */
export const useTransactionActions = () => {
    const router = useRouter();

    const {
        loading: deleteLoading,
        fn: deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransaction);

    /**
     * Handle bulk delete of selected transactions
     */
    const handleBulkDelete = useCallback(async (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            toast.error("No transactions selected");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete ${selectedIds.length} transaction${selectedIds.length > 1 ? 's' : ''}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFn(selectedIds);
        } catch (error) {
            toast.error("Failed to delete transactions");
        }
    }, [deleteFn]);

    /**
     * Handle single transaction delete
     */
    const handleDeleteTransaction = useCallback(async (transactionId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFn([transactionId]);
        } catch (error) {
            toast.error("Failed to delete transaction");
        }
    }, [deleteFn]);

    /**
     * Handle edit transaction navigation
     */
    const handleEditTransaction = useCallback((transactionId: string) => {
        router.push(`/transaction/create?edit=${transactionId}`);
    }, [router]);

    /**
     * Handle duplicate transaction navigation
     */
    const handleDuplicateTransaction = useCallback((transactionId: string) => {
        router.push(`/transaction/create?duplicate=${transactionId}`);
    }, [router]);

    /**
     * Handle view transaction details
     */
    const handleViewTransaction = useCallback((transactionId: string) => {
        router.push(`/transaction/${transactionId}`);
    }, [router]);

    // Show success message when deletion is complete
    useEffect(() => {
        if (deleted && !deleteLoading) {
            toast.success("Transaction(s) deleted successfully");
        }
    }, [deleted, deleteLoading]);

    return {
        // State
        deleteLoading,
        
        // Actions
        handleBulkDelete,
        handleDeleteTransaction,
        handleEditTransaction,
        handleDuplicateTransaction,
        handleViewTransaction,
    };
};
