"use client";
import React, {useEffect, useState} from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { Header } from "@/components/ng/Header";
import MultiSelect from "@/components/ng/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Series } from "@/interfaces/Series";
import { CardContainer, Card as NGCard } from "@/components/ng/Card";
import { Message } from "@/components/ng/Message";
import {Footer} from "@/components/ng/Footer";

interface Option {
    value: string;
    label: string;
}

export default function Filter() {
    const [years, setYears] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    const [optionsGenres, setOptionsGenres] = useState<Option[]>([]);
    const [optionsTypes, setOptionsTypes] = useState<Option[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [notfound, setNotfound] = useState<boolean>(false);
    const [series, setSeries] = useState<Series[]>([]);

    const handleYearsChange = (selectedValues: string[]) => { setYears(selectedValues); };
    const handleGenresChange = (selectedValues: string[]) => { setGenres(selectedValues); };
    const handleTypesChange = (selectedValues: string[]) => { setTypes(selectedValues); };

    const currentYear = new Date().getFullYear();
    const optionsYears = Array.from({ length: currentYear - 1968 + 1 }, (_, i) => { return { value: (currentYear - i).toString(), label: (currentYear - i).toString() }; });

    useEffect(() => {
        const getOptions = async () => {
            try {
                const response = await fetch('/api/filter', { method: "POST" });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                setOptionsGenres(result.genres);
                setOptionsTypes(result.types);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getOptions();
    }, []);
    const handleSearch = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/filter?years=${years.join(',')}&genres=${genres.join(',')}&types=${types.join(',')}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSeries(result);

            console.log('Data received:', result);

            if (Array.isArray(result) && result.length === 0) {
                setNotfound(true);
            } else {
                setNotfound(false);
            }

        } catch (error) {
            setNotfound(true);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar />
            <div className="w-full h-full">
                <Header />
                <main className="w-full pt-[30px]">
                    <Card className="w-full md:w-[750px] mx-auto">
                        <CardHeader>
                            <h1>Filter series</h1>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5 py-2 px-5">
                                <div className="w-[180px]">
                                    <MultiSelect name={"year"} options={optionsYears} selectedValues={years} onChange={handleYearsChange} />
                                </div>
                                <div className="w-[180px]">
                                    <MultiSelect name={"genre"} options={optionsGenres} selectedValues={genres} onChange={handleGenresChange} />
                                </div>
                                <div className="w-[180px]">
                                    <MultiSelect name={"type"} options={optionsTypes} selectedValues={types} onChange={handleTypesChange} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-center">
                            <Button className="flex gap-2" onClick={handleSearch} disabled={loading}>
                                {loading ? 'Searching...' : <><i className="ri-search-2-line"></i>Search</>}
                            </Button>
                        </CardFooter>
                    </Card>
                    <div className="mt-10 p-1">
                        { !notfound && series.length == 0 ? (
                            <Message
                                title={"Filter Your Series"}
                                text={
                                    `Adjust your filters to find the series you’re interested in. 
                                    You can search by year, genre, or type.`
                                }
                            />
                        ) : notfound ? (
                            <Message
                                title={"Oops! Nothing Found"}
                                icon={"ri-emotion-sad-line"}
                                text={
                                    `We couldn't find any series matching your search. 
                                    Try adjusting your filters or search criteria.`
                                }
                            />
                        ) : (
                            <CardContainer>
                                {series.map((info) => (
                                    <NGCard key={info.id} series_info={info} />
                                ))}
                            </CardContainer>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
