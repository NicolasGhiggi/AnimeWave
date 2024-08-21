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
    const [loadingFavorite, setLoadingFavorite] = useState<boolean>(false);
    const [errorFavorite, setErrorFavorite] = useState<boolean>(false);
    const [seriesFavorite, setSeriesFavorite] = useState<Series[] | null>(null);

    useEffect(() => {
        if (!loading && user) {
            setLoadingFavorite(true);
            const fetchSeriesFavorite = async () => {
                try {
                    const response = await fetch(`/api/favorites?userId=${user.id}`);
                    if (response.ok) {
                        const data: Series[] = await response.json();
                        setSeriesFavorite(data.length > 0 ? data : null);
                    } else {
                        setErrorFavorite(true);
                    }
                } catch (fetchError) {
                    console.error('Error fetching series history:', fetchError);
                    setErrorFavorite(true);
                }
                setLoadingFavorite(false);
            };

            fetchSeriesFavorite();
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
                            text={`Please log in to your account to view your favorite series.`}
                        />
                    ) : (
                        <div>
                            {loadingFavorite ? (
                                <div className="w-full h-[200px] flex items-center justify-center">
                                    <div className="custom-loader"></div>
                                </div>
                            ) : seriesFavorite == null || errorFavorite ? (
                                <Message
                                    title={"Oops! Nothing Found"}
                                    icon={"ri-emotion-sad-line"}
                                    text={
                                        `You haven't favorite series yet. 
                                        Start exploring and enjoy your favorite shows!`
                                    }
                                />
                            ) : (
                                <CardContainer title={"Favorite series"}>
                                    {seriesFavorite.map((info) => (
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