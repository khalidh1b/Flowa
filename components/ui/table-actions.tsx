"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

interface TableActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    editLabel?: string;
    deleteLabel?: string;
    className?: string;
}

export const TableActions: React.FC<TableActionsProps> = ({
    onEdit,
    onDelete,
    editLabel = "Edit",
    deleteLabel = "Delete",
    className = ""
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className={`h-8 w-8 p-0 ${className}`}>
                <MoreHorizontal className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>{editLabel}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive' onClick={onDelete}>
                {deleteLabel}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
