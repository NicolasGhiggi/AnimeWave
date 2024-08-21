"use client"
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import {ThemeToggle} from "@/components/theme-toggle";
import Cookies from "js-cookie";
import crypto from 'crypto';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<any>(false);

    const getUserData = async () => {
        try {
            const tempPassword = crypto.createHash('sha256').update(password).digest('hex');
            const res = await fetch(`/api/user?email=${encodeURIComponent(email)}&password=${encodeURIComponent(tempPassword)}`);
            const data = await res.json();

            if (res.ok) {
                goToPage();
            } else {
                console.error('Error in API call:', data.error);
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getUserData();
    };

    const goToPage = () => {
        const link = Cookies.get('previousPage');
        Cookies.remove('previousPage');
        location.href = link == undefined ? '/' : link;
    }

    return (
        <div className="w-full h-screen relative flex items-center justify-center">

            <Button variant={"ghost"} size={"icon"} className={"absolute top-3 left-3"} onClick={goToPage}>
                <FontAwesomeIcon icon={faArrowRightToBracket} className="w-5 h-5 rotate-180" />
            </Button>

            <Card className="w-full sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Log in to your account
                        </h1>
                        <ThemeToggle/>
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</Label>
                            <Input type="email"
                                   name="email"
                                   id="email"
                                   className="block w-full py-5"
                                   placeholder="example@mail.com"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <Label htmlFor="password" className="block mb-2 text-sm font-medium">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full py-5"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Checkbox id="remember"
                                              aria-describedby="remember"
                                              onCheckedChange={(e) => setRemember(e) }
                                              className="rounded"  />
                                </div>
                                <div className="ml-3 text-sm">
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                            </div>
                            <Button variant={"link"} asChild>
                                <Link href={"#"}>Forgot password?</Link>
                            </Button>
                        </div>
                        <Button className={"w-full"}>
                            Log in
                        </Button>
                        <p className="text-sm font-light">
                            <span className="opacity-80">Don’t have an account yet?</span>
                            <Button variant={"link"} className={"p-0 pl-1"}>
                                <Link href={"/signup"}>
                                    Sign up
                                </Link>
                            </Button>
                        </p>
                    </form>
                </div>
            </Card>
        </div>
    );
}