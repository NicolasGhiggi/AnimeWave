"use client"
import React, { useEffect, useState } from "react";
import { Series } from "@/interfaces/Series";
import { Episode } from "@/interfaces/Episode";
import { Header } from "@/components/ng/Header";
import { Footer } from "@/components/ng/Footer";
import { Sidebar } from "@/components/ng/Sidebar";
import { Carousel } from "@/components/ng/Carousel";
import { Cover, CoverContainer } from "@/components/ng/Cover";

const series: Series[] = [
    {
        id: 1,
        total_episodes: 37,
        video_list: [""],
        title: "Death Note",
        image: "death_note.jpg",
        categories: ["Mystery", "Psychological", "Shounen", "Supernatural", "Thriller"]
    },
    {
        id: 2,
        total_episodes: 12,
        video_list: [""],
        title: "Tokyo Ghoul",
        image: "tokyo_ghoul.jpg",
        categories: ["Action", "Drama", "Fantasy", "Gore", "Horror", "Mystery", "Psychological", "Seinen", "Supernatural"]
    },
    {
        id: 3,
        total_episodes: 25,
        video_list: [""],
        title: "Sword Art Online",
        image: "sword_art_online.jpg",
        categories: ["Action", "Adventure", "Fantasy", "Game", "Romance"]
    },
    {
        id: 4,
        total_episodes: 11,
        video_list: [""],
        title: "Mushoku Tensei: Jobless Reincarnation",
        image: "mushoku_tensei.jpg",
        categories: ["Adventure", "Drama", "Ecchi", "Fantasy", "Isekai", "Reincarnation"]
    },
    {
        id: 5,
        total_episodes: 25,
        video_list: [""],
        title: "Code Geass: Lelouch of the Rebellion",
        image: "code_geass_lelouch_of_the_rebellion.jpg",
        categories: ["Action", "Drama", "Mecha", "Military", "School", "Sci-fi", "Super Power", "Thriller"]
    }
];

export default function Home() {
    const [carouselSeries, setCarouselSeries] = useState<Series[]|null>(null)
    const [latestEpisodesReleased, setLatestEpisodesReleased] = useState<Episode[]|null>(null);
    const [latestSeriesReleased, setLatestSeriesReleased] = useState<Series[]|null>(null);
    // const [popularSeries, setPopularSeries] = useState<Series[]|null>(null);
    // const [recommendedSeries, setRecommendedSeries] = useState<Series[]|null>(null);
    // const [topSeries, setTopSeries] = useState<Series[]|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true);
        const fetchSeries = async () => {
            try {
                const response = await fetch('/api/series/carousel');
                if (!response.ok) throw new Error('Network response was not ok');
                setCarouselSeries(await response.json());
            } catch (error) {
                console.error('Fetch error:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSeries();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchSeries = async () => {
            try {
                const response = await fetch('/api/episode');
                if (!response.ok) throw new Error('Network response was not ok');
                setLatestEpisodesReleased(await response.json());
            } catch (error) {
                console.error('Fetch error:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSeries();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchSeries = async () => {
            try {
                const response = await fetch('/api/series/latest');
                if (!response.ok) throw new Error('Network response was not ok');
                setLatestSeriesReleased(await response.json());
            } catch (error) {
                console.error('Fetch error:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSeries();
    }, []);


    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <Header/>
                <main className="w-full md:pt-[30px]">
                    {loading ? (
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (
                        <>
                            <Carousel slides={carouselSeries || []} autoSlide />
                            <CoverContainer title={"Latest episodes"}>
                                {latestEpisodesReleased?.map((item, index) => (
                                    <Cover key={index} info={item}/>
                                ))}
                            </CoverContainer>
                            <CoverContainer title={"Latest series"}>
                                {latestSeriesReleased?.map((item, index) => (
                                    <Cover key={index} info={item}/>
                                ))}
                            </CoverContainer>
                        </>
                    )}
                </main>
                <Footer/>
            </div>
        </div>
    );
}
