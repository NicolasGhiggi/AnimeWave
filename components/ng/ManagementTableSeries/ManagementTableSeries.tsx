import React from "react";
import { z } from "zod"
import { seriesSchema } from "./data/schema"
import { columns } from "./components/columns"
import {Message} from "@/components/ng/Message";
import { DataTable } from "./components/data-table"

interface ManagementTableSeriesProps {
    dataTable: any[];
}

export const ManagementTableSeries: React.FC<ManagementTableSeriesProps> = ({ dataTable }) => {
    const data = z.array(seriesSchema).parse(dataTable)

    return (
        <>
            <div className="md:hidden">
                <Message
                    title={"Access Limited on Mobile Devices"}
                    text={"The series management feature is not available on mobile devices, including tablets like the iPad. To access this section, please use a desktop or laptop computer."}
                    icon={"fas fa-phone-slash"}
                />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of series and movie!
                        </p>
                    </div>
                </div>
                <DataTable data={data} columns={columns} />
            </div>
        </>
    )
}
