import { scanReceipt } from '@/app/actions/transaction';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface UseReceiptScannerProps {
    onScanComplete: (data: any) => void;
}

interface ScannedData {
    [key: string]: any;
}

export const useReceiptScanner = ({ onScanComplete }: UseReceiptScannerProps) => {
    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReceipt);

    const validateFile = (file: File): boolean => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return false;
        }
        return true;
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result == null) {
                    reject(new Error('Failed to read file: result is null'));
                    return;
                }
                if (typeof result === 'string') {
                    resolve(result.split(",")[1]);
                } else {
                    reject(new Error('Failed to read file: unexpected result type'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    };

    const handleReceiptScan = async (file: File): Promise<void> => {
        if (!validateFile(file)) {
            return;
        }

        try {
            const base64String = await convertFileToBase64(file);
            const mimeType = file.type;
            await scanReceiptFn(base64String, mimeType);
        } catch (error) {
            toast.error("Failed to process the receipt image");
            console.error('Receipt scan error:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect scanned data', scannedData);
        const hasDataBeenProcessed = scannedData !== undefined && scannedData !== null;

        if (scannedData && !scanReceiptLoading && Object.keys(scannedData).length > 0) {
            onScanComplete(scannedData);
            toast.success("Receipt scanned successfully");
        } else if (!scanReceiptLoading && hasDataBeenProcessed) {
            toast.error(
                `I apologize! I was unable to produce a response for your request. 
                Quick Note: This application uses a free-tier AI model, which occasionally fails 
                to return data due to rate limits or system load. Please try again🙏`, 
                {
                    duration: 8000,
                    position: 'top-center'
                }
            );
        }
    }, [scanReceiptLoading, scannedData, onScanComplete]);

    return {
        scanReceiptLoading,
        handleReceiptScan,
    };
};
