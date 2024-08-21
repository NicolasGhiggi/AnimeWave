"use client"
import React, { useEffect, useState } from "react";
import useAuthUser from "@/hooks/useAuthUser";
import { Header } from "@/components/ng/Header";
import { Footer } from "@/components/ng/Footer";
import { Sidebar } from "@/components/ng/Sidebar";
import { ManagementTableSeries } from "@/components/ng/ManagementTableSeries/ManagementTableSeries";

export default function Management() {
    const { user, loading, error } = useAuthUser();
    const [data, setData] = useState<any[]>([]);
    const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
    const [errorFetch, setErrorFetch] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/management');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                setErrorFetch('An error occurred while fetching the data.');
            } finally {
                setLoadingFetch(false);
            }
        }
        fetchData();
    }, []);


    if (!loading && (!user || error || !user.is_admin)) location.href = '/';

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar />
            <div className="w-full h-full">
                <Header />
                <main className="w-full md:pt-[30px]">
                    {loadingFetch || loading ? (
                        <div className="w-full h-72 flex items-center justify-center">
                            <div className="custom-loader"></div>
                        </div>
                    ) : errorFetch || error ? (
                        <p>{errorFetch}</p>
                    ) : (
                        <ManagementTableSeries dataTable={data} />
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}


