"use client"
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { SettingsHeader } from "@/components/ng/SettingsHeader";
import { DynamicBreadcrumb } from "@/components/ng/DynamicBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";


export default function Settings() {
    const [currentLink, setCurrentLink] = useState<string>('');
    useEffect(() => setCurrentLink(location.pathname), []);

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <SettingsHeader />
                <main className="w-full p-10">

                    <DynamicBreadcrumb currentLink={currentLink} className="mb-10" />

                    <Card className="p-6">
                        <CardContent className="p-0">
                            Ciao
                        </CardContent>
                    </Card>

                </main>
            </div>
        </div>
    );
}