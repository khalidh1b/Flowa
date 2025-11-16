import { scanReceipt } from '@/app/actions/transaction';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ReceiptData {
    [key: string]: unknown;
};

interface UseReceiptScannerProps {
    onScanComplete: (data: ReceiptData) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ERROR_MESSAGES = {
    FILE_TOO_LARGE: 'file size should be less than 5mb',
    SCAN_FAILED: 'failed to process the receipt image',
    AI_RATE_LIMIT: 'ai service temporarily unavailable. please try again in a moment',
    SCAN_SUCCESS: 'receipt scanned successfully'
} as const;

// custom hook for scanning and processing receipt images
export const useReceiptScanner = ({ onScanComplete }: UseReceiptScannerProps) => {
    const {
        loading: scanReceiptLoading,
        execute: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReceipt);

    // validates file size before processing
    const validateFile = (file: File): boolean => {
        if (file.size > MAX_FILE_SIZE) {
            toast.error(ERROR_MESSAGES.FILE_TOO_LARGE);
            return false;
        }
        return true;
    };

    // converts file to base64 string for api submission
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                const result = reader.result as string;
                const base64Data = result?.split(',')[1];
                
                if (!base64Data) {
                    reject(new Error('failed to extract base64 data'));
                    return;
                }
                
                resolve(base64Data);
            };
            
            reader.onerror = () => reject(new Error('file reading failed'));
            reader.readAsDataURL(file);
        });
    };

    // main function to handle the complete receipt scanning process
    const handleReceiptScan = async (file: File): Promise<void> => {
        if (!validateFile(file)) return;

        try {
            const base64String = await convertFileToBase64(file);
            await scanReceiptFn(base64String, file.type);
        } catch (error) {
            toast.error(ERROR_MESSAGES.SCAN_FAILED);
            console.error('receipt scan error:', error);
        }
    };

    // monitors scan results and handles success/error states
    useEffect(() => {
        if (scanReceiptLoading || !scannedData) return;

        if (Object.keys(scannedData).length > 0) {
            onScanComplete(scannedData);
            toast.success(ERROR_MESSAGES.SCAN_SUCCESS);
            return;
        }

        toast.error(ERROR_MESSAGES.AI_RATE_LIMIT, {
            duration: 5000,
            position: 'top-center'
        });
    }, [scanReceiptLoading, scannedData, onScanComplete]);

    return {
        scanReceiptLoading,
        handleReceiptScan,
    };
};