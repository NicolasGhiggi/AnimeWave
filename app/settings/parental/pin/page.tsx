"use client"
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { SettingsHeader } from "@/components/ng/SettingsHeader";
import { DynamicBreadcrumb } from "@/components/ng/DynamicBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

export default function ParentalControlPIN() {
    const [currentLink, setCurrentLink] = useState<string>('');
    useEffect(() => setCurrentLink(location.pathname), []);

    const [pin, setPin] = React.useState("")

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <SettingsHeader />
                <main className="w-full p-10">
                    <DynamicBreadcrumb currentLink={currentLink} className="mb-10" />

                    <Card className="p-6">
                        <CardContent className="p-0">

                            <div className="w-full flex items-center justify-center">
                                <InputOTP maxLength={12} value={pin} onChange={value => setPin(value)}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                        <InputOTPSlot index={6} />
                                        <InputOTPSlot index={7} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={8} />
                                        <InputOTPSlot index={9} />
                                        <InputOTPSlot index={10} />
                                        <InputOTPSlot index={11} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                        </CardContent>
                    </Card>

                </main>
            </div>
        </div>
    );
}