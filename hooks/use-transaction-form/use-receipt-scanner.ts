import { useCallback } from 'react';
import { toast } from 'sonner';
import { ERROR_MESSAGES } from './constants';
import { validateScannedData } from './utils';

export const useReceiptScanner = (setValue: (field: any, value: any) => void) => {
    const handleScanComplete = useCallback((scannedData: Record<string, any> | null) => {
        if (!validateScannedData(scannedData)) {
            toast.error(ERROR_MESSAGES.receiptScanError);
            return;
        }
        
        try {
            // Safely extract and validate scanned data
            const amount = scannedData?.amount;
            const scanDate = scannedData?.date;
            const description = scannedData?.description;
            const category = scannedData?.category;

            if (amount !== undefined && amount !== null) {
                setValue("amount", amount.toString());
            }
            
            if (scanDate) {
                const parsedDate = new Date(scanDate);
                if (!isNaN(parsedDate.getTime())) {
                    setValue("date", parsedDate);
                }
            }
            
            if (description && typeof description === 'string') {
                setValue("description", description);
            }
            
            if (category && typeof category === 'string') {
                setValue("category", category);
            }

            toast.success(ERROR_MESSAGES.receiptScanSuccess);
        } catch (error) {
            console.error("Error processing scanned data:", error);
            toast.error(ERROR_MESSAGES.receiptProcessingError);
        }
    }, [setValue]);

    return {
        handleScanComplete,
    };
};