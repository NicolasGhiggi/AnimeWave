import React from 'react';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { format } from 'date-fns'; 

interface DynamicTableProps {
    content: any[];
    hidden?: string[];
    actions?: (item: any) => React.ReactNode;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ content, hidden = [], actions }) => {
    const columnNames = content.length > 0 ? Object.keys(content[0]).filter(column => !hidden.includes(column)) : [];

    const renderCellValue = (value: any): React.ReactNode => {
        if (value instanceof Date) {
            return format(value, 'dd-MM-yyyy');
        }
        return value;
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columnNames.map((columnName, index) => (
                        <TableHead key={index}>
                            {columnName}
                        </TableHead>
                    ))}
                    {actions && <TableHead className="text-right">Action</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {content.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columnNames.map((columnName, colIndex) => (
                            <TableCell key={colIndex}>
                                {renderCellValue(item[columnName])}
                            </TableCell>
                        ))}
                        {actions && (
                            <TableCell className="text-right">
                                {actions(item)}
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={columnNames.length}>Total</TableCell>
                    <TableCell className="text-right">{content.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default DynamicTable;