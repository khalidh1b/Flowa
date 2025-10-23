import { useReceiptScanner } from '@/hooks/use-receipt-scanner';
import { ReceiptScannerUI } from './ui/receipt-scanner-ui';

interface ReceiptScannerProps {
    onScanComplete: (data: any) => void;
};

const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onScanComplete }) => {
    const { scanReceiptLoading, handleReceiptScan } = useReceiptScanner({
        onScanComplete,
    });

    return (
        <ReceiptScannerUI 
            onFileSelect={handleReceiptScan}
            isLoading={scanReceiptLoading}
        />
    );
};

export default ReceiptScanner;