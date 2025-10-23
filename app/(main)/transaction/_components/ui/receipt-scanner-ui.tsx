import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Loader2 } from 'lucide-react';
import React, { useRef } from 'react';

interface ReceiptScannerUIProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
}

export const ReceiptScannerUI: React.FC<ReceiptScannerUIProps> = ({ 
    onFileSelect, 
    isLoading 
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = '';
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <Input
                type='file' 
                ref={fileInputRef} 
                className='hidden' 
                accept='image/*' 
                capture="environment"
                onChange={handleFileChange} 
            />
            <Button 
                type="button" 
                variant="outline" 
                className='w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white' 
                onClick={handleButtonClick}
            >
                {isLoading ? (
                    <>
                        <Loader2 className='mr-2 animate-spin' />
                        <span> Scanning Receipt... </span>
                    </>
                ) : (
                    <>
                        <Camera className='mr-2' />
                        <span> Scan Receipt with AI </span>
                    </>
                )}
            </Button>
        </div>
    );
};
