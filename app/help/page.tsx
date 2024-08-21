"use client"
import React from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { Header } from "@/components/ng/Header";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {Footer} from "@/components/ng/Footer";

export default function Help() {
    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <Header/>
                <main className="w-11/12 mx-auto pt-[30px] sm:w-11/12 md:w-3/4 xl:w-2/3">
                    <section id="intro" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">Welcome to the AnimeWave Help Page</h2>
                            <p className="text-lg">Here you can find answers to frequently asked questions, detailed guides, and support to help you use our streaming site.</p>
                        </Card>
                    </section>

                    <section id="getting-started" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">How to Get Started</h2>
                            <p className="text-lg mb-4">If you are new to AnimeWave, follow these steps to get started:</p>
                            <ul className="list-none pl-5 flex flex-col gap-2">
                                <li>
                                    <Link href="/signup" className="text-blue-600 dark:text-blue-400 dark:text-blue-400 hover:underline">Registration</Link> for an account.
                                </li>
                                <li>
                                    <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Log In</Link> to your account.
                                </li>
                                <li>
                                    <Link href="/filter" className="text-blue-600 dark:text-blue-400 hover:underline">Browse Series</Link> and find your favorite anime.
                                </li>
                                <li>
                                    <Link href="/watch/7" className="text-blue-600 dark:text-blue-400 hover:underline">Watch</Link> your anime streams.
                                </li>
                            </ul>
                        </Card>
                    </section>

                    <section id="account" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">Creating and Managing Your Account</h2>
                            <h3 className="text-2xl font-semibold mt-4">Sign Up</h3>
                            <p className="mb-4">To sign up, follow these steps:</p>
                            <ol className="list-decimal pl-5 mb-4 flex flex-col gap-2">
                                <li>
                                    Visit the <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Registration</Link> page.
                                </li>
                                <li>Enter the required information and submit the form.</li>
                                <li>Verify your email and confirm your registration.</li>
                            </ol>

                            <h3 className="text-2xl font-semibold mt-6">Log In</h3>
                            <p className="mb-4">To log in to your account:</p>
                            <ol className="list-decimal pl-5 mb-4 flex flex-col gap-2">
                                <li>
                                    Go to the <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link> page.
                                </li>
                                <li>Enter your username and password.</li>
                                <li>Click "Log In".</li>
                            </ol>

                            <h3 className="text-2xl font-semibold mt-6">Manage Profile Information</h3>
                            <p>You can update your personal information from the <Link href="/settings/profile" className="text-blue-600 dark:text-blue-400 hover:underline">Profile</Link> page.
                            </p>
                        </Card>
                    </section>

                    <section id="streaming" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">How to Use the Streaming Service</h2>

                            <h3 className="text-2xl font-semibold mt-4">Browse and Search for Series</h3>
                            <p className="mb-4">To find your favorite series:</p>
                            <ol className="list-decimal pl-5 mb-4 flex flex-col gap-2">
                                <li>
                                    Visit the <Link href="/series" className="text-blue-600 dark:text-blue-400 hover:underline">Series</Link> page.
                                </li>
                                <li>Use the search bar to find a specific series.</li>
                                <li>Filter by genre, release year, or type of series{/*production studio*/}.</li>
                            </ol>

                            <h3 className="text-2xl font-semibold mt-6">Watch Your Anime</h3>
                            <p className="mb-4">To watch a series:</p>
                            <ol className="list-decimal pl-5 mb-4 flex flex-col gap-2">
                                <li>Select a series from your favorites list or search on the series page.</li>
                                <li>Click "Watch" and select the episode you want to view.</li>
                                <li>Use the player controls to pause, resume, or change video quality.</li>
                            </ol>
                        </Card>
                    </section>

                    <section id="troubleshooting" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">Common Issues and Troubleshooting</h2>

                            <h3 className="text-2xl font-semibold mt-4">Login Issues</h3>
                            <p className="mb-4">If you are having trouble logging into your account:</p>
                            <ul className="list-none pl-5 mb-4 flex flex-col gap-2">
                                <li>Ensure you are using the correct email address and password.</li>
                                <li>Try resetting your password if you have forgotten your credentials.</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mt-6">Streaming Issues</h3>
                            <p className="mb-4">If you are experiencing issues with the video:</p>
                            <ul className="list-none pl-5 flex flex-col gap-2">
                                <li>Check your internet connection.</li>
                                <li>Ensure you have the latest version of your browser or app.</li>
                                <li>Try reloading the page or changing the video quality.</li>
                            </ul>
                        </Card>
                    </section>

                    <section id="contact" className="mb-12">
                        <Card className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">Contact Support</h2>
                            <p className="mb-4">If you have further questions or issues:</p>
                            <ul className="list-none pl-5 flex flex-col gap-2">
                                <li>
                                    Visit our <Link href="/support" className="text-blue-600 dark:text-blue-400 hover:underline">support page</Link> to submit a request.
                                </li>
                                <li>
                                    Email us at <Link href="mailto:support@animewave.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@animewave.com</Link>.
                                </li>
                                <li>
                                    Call our support number: <span className="text-blue-600 dark:text-blue-400">123-456-7890</span>.
                                </li>
                            </ul>
                        </Card>
                    </section>

                </main>
                <Footer />
            </div>
        </div>
    );
}