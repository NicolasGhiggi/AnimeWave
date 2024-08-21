"use client"
import { Series } from "../data/schema";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Series>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("title")}
                </span>
                </div>
            )
        },
    },
    {
        accessorKey: "alternative_title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Alternative Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("alternative_title")}
                </span>
                </div>
            )
        },
    },
    {
        accessorKey: "studio",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Studio" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("studio")}
                </span>
                </div>
            )
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("type")}
                </span>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
