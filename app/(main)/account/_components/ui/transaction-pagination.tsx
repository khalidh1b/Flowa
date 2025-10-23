"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination';
import React from 'react';

interface TransactionPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const TransactionPagination: React.FC<TransactionPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 0) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageSelect = (page: number) => {
        onPageChange(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem 
                    className={`cursor-pointer select-none ${currentPage === 1 ? "opacity-0 cursor-default" : ""}`}
                >
                    <PaginationPrevious onClick={handlePrevious} />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = currentPage === pageNumber;
                    
                    return (
                        <PaginationItem 
                            key={index} 
                            className={`cursor-pointer select-none ${isActive ? "bg-gray-200 rounded-xl" : ""}`}
                        >
                            <PaginationLink onClick={() => handlePageSelect(pageNumber)}>
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                
                <PaginationItem 
                    className={`cursor-pointer select-none ${currentPage === totalPages ? "opacity-0 cursor-default" : ""}`}
                >
                    <PaginationNext onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
