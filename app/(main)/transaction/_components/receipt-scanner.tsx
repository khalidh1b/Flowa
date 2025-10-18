"use client";

import { scanReceipt } from '@/app/actions/transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { Camera, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner';

interface ReceiptScannerProps {
    onScanComplete: (data: any) => void;
}

const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onScanComplete }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReceipt);

    const handleReceiptScan = async (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }

        const base64String = await new Promise<string>((resolve, reject) => {
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

        const mimeType = file.type;

        await scanReceiptFn(base64String, mimeType);
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
        };
    }, [scanReceiptLoading, scannedData, onScanComplete]);

    return (
        <div>
            <Input
                type='file' 
                ref={fileInputRef} 
                className='hidden' 
                accept='image/*' 
                capture="environment"
                onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    handleReceiptScan(file);
                }
                e.target.value = ''; 
                }} 
            />
            <Button type="button" variant="outline" className='w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white' onClick={() => fileInputRef.current?.click()} > {scanReceiptLoading ? <>
                <Loader2 className='mr-2 animate-spin' />
                <span> Scanning Receipt... </span>
            </> : <>
                <Camera className='mr-2' />
                <span> Scan Receipt with AI </span>
            </>} </Button>
        </div>
    )
}

export default ReceiptScanner;