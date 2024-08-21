"use client"
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { SettingsHeader } from "@/components/ng/SettingsHeader";
import { DynamicBreadcrumb } from "@/components/ng/DynamicBreadcrumb";

export default function AccountPersonalInfo() {
    const [currentLink, setCurrentLink] = useState<string>('');


    useEffect(() => setCurrentLink(location.pathname), []);


    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <SettingsHeader />
                <main className="w-full p-10">
                    <DynamicBreadcrumb currentLink={currentLink} className="mb-10"/>


                </main>
            </div>
        </div>
    );
}