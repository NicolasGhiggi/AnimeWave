"use client"
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { Header } from "@/components/ng/Header";
import { Series } from "@/interfaces/Series";
import useAuthUser from "@/hooks/useAuthUser";
import { Card, CardContainer } from "@/components/ng/Card";
import { Message } from "@/components/ng/Message";
import {Footer} from "@/components/ng/Footer";

export default function History() {
    const { user, loading, error } = useAuthUser();
    const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
    const [errorHistory, setErrorHistory] = useState<boolean>(false);
    const [seriesHistory, setSeriesHistory] = useState<Series[] | null>(null);

    useEffect(() => {
        if (!loading && user) {
            setLoadingHistory(true);
            const fetchSeriesHistory = async () => {
                try {
                    const response = await fetch(`/api/history?userId=${user.id}`);
                    if (response.ok) {
                        const data: Series[] = await response.json();
                        setSeriesHistory(data.length > 0 ? data : null);
                    } else {
                        setErrorHistory(true);
                    }
                } catch (fetchError) {
                    console.error('Error fetching series history:', fetchError);
                    setErrorHistory(true);
                }
                setLoadingHistory(false);
            };

            fetchSeriesHistory();
        }
    }, [user, loading, error]);

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <Header/>
                <main className="w-full pt-[30px]">
                    {loading ? (
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <div className="custom-loader"></div>
                        </div>
                    ) : user == null || error ? (
                        <Message
                            title={"Oops! Nothing Found"}
                            icon={"ri-emotion-sad-line"}
                            text={`Please log in to your account to view your watch history.`}
                        />
                    ) : (
                        <div>
                            {loadingHistory ? (
                                <div className="w-full h-[200px] flex items-center justify-center">
                                    <div className="custom-loader"></div>
                                </div>
                            ) : seriesHistory == null || errorHistory ? (
                                <Message
                                    title={"Oops! Nothing Found"}
                                    icon={"ri-emotion-sad-line"}
                                    text={
                                        `You haven't watched any series yet. 
                                         Start exploring and enjoy your favorite shows!`
                                    }
                                />
                            ) : (
                                <CardContainer title={"History"}>
                                    {seriesHistory.map((info) => (
                                        <Card key={info.id} series_info={info} />
                                    ))}
                                </CardContainer>
                            )}
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}