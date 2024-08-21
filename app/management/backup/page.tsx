"use client"
import React from "react";
import {Header} from "@/components/ng/Header";
import {Footer} from "@/components/ng/Footer";
import {Sidebar} from "@/components/ng/Sidebar";

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Payment[]> {
    const data: Payment[] = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            id: Math.random().toString(36).substr(2, 8),
            amount: Math.floor(Math.random() * (1000 - 10 + 1)) + 10,
            status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)],
            email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        } as Payment);
    }
    return data;
}

export default async function Management() {
    const data = await getData()

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <Header/>
                <main className="w-full md:pt-[30px]">

                    <DataTable columns={columns} data={data} />

                </main>
                <Footer/>
            </div>
        </div>
    );
}


