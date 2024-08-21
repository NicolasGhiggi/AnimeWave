"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Cookies from "js-cookie";


export default function Signup() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');

    const [alertText, setAlertText] = useState<string>('');
    const [alertStatus, setAlertStatus] = useState<boolean>(true);

    const createAccount = async () => {
        try {
            const res = await fetch(`/api/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    name: name,
                    surname: surname,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    phoneNumber: phoneNumber,
                    description: description
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Registration successful, you are about to be redirected to the login page.');
                window.location.href = "/login";
            } else {
                setAlertStatus(false);
                setAlertText(data.error || 'Something went wrong');
            }
        } catch (error) {
            setAlertStatus(false);
            setAlertText('Network error or server is down');
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createAccount();
    };

    const goToPage = () => {
        const link = Cookies.get('previousPage');
        Cookies.remove('previousPage');
        location.href = link == undefined ? '/' : link;
    }

    return (
        <div className="w-full h-screen relative py-14">
            <Button variant={"ghost"} size={"icon"} className={"absolute md:fixed top-3 left-3"} onClick={goToPage}>
                <FontAwesomeIcon icon={faArrowRightToBracket} className="w-5 h-5 rotate-180"/>
            </Button>

            <Card className="w-full mx-auto sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Create an account
                        </h1>
                        <ThemeToggle />
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="username" className="block mb-2 text-sm font-medium">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block w-full py-2"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" className="block mb-2 text-sm font-medium">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full py-2"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="surname" className="block mb-2 text-sm font-medium">Surname</Label>
                                    <Input
                                        type="text"
                                        name="surname"
                                        id="surname"
                                        className="block w-full py-2"
                                        placeholder="Surname"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full py-2"
                                    placeholder="example@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="password" className="block mb-2 text-sm font-medium">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block w-full py-2"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="block w-full py-2"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">Phone Number</Label>
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className="block w-full py-2"
                                    placeholder="123-456-7890"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description" className="block mb-2 text-sm font-medium">Description</Label>
                                <Textarea
                                    name="description"
                                    id="description"
                                    className="block w-full py-2"
                                    placeholder="Tell us something about yourself (max 30 charts)"
                                    value={description}
                                    maxLength={30}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button className="w-full">
                            Sign up
                        </Button>
                        <p className="text-sm font-light">
                            <span className="opacity-80">Already have an account?</span>
                            <Button variant="link" className="p-0 pl-1">
                                <Link href="/login">
                                    Log in
                                </Link>
                            </Button>
                        </p>
                    </form>
                </div>
            </Card>
            <div className="w-full min-h-14 p-4 flex items-center justify-end sticky bottom-0 right-4">
                <Alert className="max-w-[500px]" hidden={alertStatus}>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-md" />
                    <AlertTitle>Alert!</AlertTitle>
                    <AlertDescription defaultValue={alertText} />
                </Alert>
            </div>
        </div>
    );
}