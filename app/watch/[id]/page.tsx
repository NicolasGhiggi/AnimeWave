"use client";
import React, { useRef, useState, useEffect } from "react";
import { User } from "@/interfaces/User";
import { useParams } from 'next/navigation';
import { Series } from "@/interfaces/Series";
import { Badge } from "@/components/ui/badge";
import useAuthUser from "@/hooks/useAuthUser";
import { Header } from "@/components/ng/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ng/Footer";
import { Sidebar } from "@/components/ng/Sidebar";
import { NotFound } from "@/components/ng/NotFound";
import { Collection } from "@/interfaces/Collection";
import { Separator } from "@/components/ui/separator";
import { ListCollection, ItemCollection } from "@/components/ng/ListCollection";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"

export default function WatchSeries() {
    const { id } = useParams();
    const [finished, setFinished] = useState<boolean>(false);
    const [series, setSeries] = useState<Series | null>(null);
    const [favoriteIcon, setFavoriteIcon] = useState<string>("far");
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { user, loading, error } = useAuthUser();

    useEffect(() => {
        if (!id) return;

        const fetchSeries = async () => {
            let link = `/api/watch?seriesId=${id}`;
            if (user && user.id != null) {
                link += `&userId=${user.id}`;
            }

            try {
                const res = await fetch(link);

                if (!res.ok) {
                    setSeries(null);
                } else {
                    const data = await res.json();
                    setSeries(data);
                    setFavoriteIcon(data.is_favorite ? "fas" : "far");
                }
                setFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        if (!loading) {
            fetchSeries();
        }
    }, [id, user, loading, error]);

    if (!series) {
        return (
            <div className="w-full h-screen grid pl-[53px]">
                <Sidebar />
                <div className="w-full h-full">
                    <Header/>
                    <main className="w-full h-[200px] flex items-center justify-center">
                        {finished ? (
                            <NotFound />
                        ) : (
                            <div className="custom-loader"></div>
                        )}
                    </main>
                </div>
            </div>
        );
    }

    const favoriteToggle = async () => {
        if (user && series) {
            const userId = user.id;

            try {
                const response = await fetch(`/api/favorites?seriesId=${series.id}&userId=${userId}`,{ method: "POST" });

                if (response.ok) {
                    const result = await response.json();
                    setFavoriteIcon(result.success ? "fas" : "far");
                } else {
                    console.error('Error toggling favorite status');
                }
            } catch (fetchError) {
                console.error('Error fetching:', fetchError);
            }
        }
    };
    const handlePrevious = () => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); } };
    const handleNext = () => { if (currentIndex < series.video_list.length - 1) { setCurrentIndex(currentIndex + 1); } };
    const changeVideo = (index: number) => { setCurrentIndex(index); };

    const isPreviousDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === series.video_list.length - 1;


    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar />
            <div className="w-full h-full">
                <Header />
                <main className="w-full">
                    <div className="w-full">
                        <div className="w-full banner">
                            <img src={`/images/series/horizontal/${series.image}`} alt="..." className="w-full h-[400px]" />
                        </div>
                        <div className="flex w-full px-10 py-10 sm:px-10 xl:px-52">
                            <div className="flex flex-col gap-5 w-[226px]">
                                <img src={`/images/series/vertical/${series.image}`} alt={series.title} className="h-[335px] rounded-lg" />
                                <div className="flex justify-between gap-5">
                                    <AddCollectionButton user={user || null} loading={loading} series={series || null} />
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-2" onClick={favoriteToggle} disabled={loading || user == null}>
                                        <i className={`${favoriteIcon} fa-heart`} />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 px-10 w-[calc(100%-226px)]">
                                <h1 className="text-2xl font-semibold flex flex-col gap-2">
                                    {series.title}
                                    <span className="text-sm font-normal opacity-80">{series.alternative_title}</span>
                                </h1>
                                <div className="space-x-3 space-y-3">
                                    {series.categories.map((category, index) => (
                                        <Badge key={index} className="text-[12px]">{category}</Badge>
                                    ))}
                                </div>
                                <div className="flex items-center justify-start gap-10 py-1">
                                    <p className="flex items-center gap-2">
                                        <span className="text-sm">Type</span>
                                        <span className="font-bold">{series.type}</span>
                                    </p>
                                    <Separator className="h-7" orientation="vertical"/>
                                    <p className="flex items-center gap-2">
                                        <span className="text-sm">Studio</span>
                                        <span className="font-bold">{series.studio}</span>
                                    </p>
                                    <Separator className="h-7" orientation="vertical"/>
                                    <p className="flex items-center gap-2">
                                        <span className="text-sm">Year</span>
                                        <span className="font-bold">{series.release_year}</span>
                                    </p>
                                </div>
                                <p className="text-sm">
                                    {series.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Card className="mx-10 mb-10 sm:mx-10 xl:mx-52">
                        <CardHeader className="p-3">
                            <div className="w-full flex items-center justify-between">
                                <p className="font-semibold">Episode {currentIndex + 1}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <video ref={videoRef} className="w-full" controls>
                                <source src={series.video_list[currentIndex]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </CardContent>
                        <CardFooter className="p-3">
                            <div className="w-full flex flex-col gap-5">
                                <div className="flex justify-between">
                                    <Button variant="ghost" className="flex items-center gap-1" onClick={handlePrevious} disabled={isPreviousDisabled}>
                                        <i className="ri-skip-left-line text-lg"></i>
                                        Previous
                                    </Button>
                                    <Button variant="ghost" className="flex items-center gap-1" onClick={handleNext} disabled={isNextDisabled}>
                                        Next
                                        <i className="ri-skip-right-line text-lg"></i>
                                    </Button>
                                </div>
                                <div className="grid grid-cols-[repeat(auto-fill,_50px)] grid-rows-[repeat(auto-fill,_36px)] gap-2 justify-evenly">
                                    {series.video_list.map((video, index) => (
                                        <Button key={index} onClick={() => changeVideo(index)} className="w-[50px]" variant={currentIndex === index ? "default" : "outline"}>{index + 1}</Button>
                                    ))}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </main>
                <Footer />
            </div>
        </div>
    );
}

interface AddCollectionButtonProps {
    user: User|null;
    loading: boolean;
    series: Series|null;
}

const AddCollectionButton: React.FC<AddCollectionButtonProps> = ({ user, loading, series }) => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loadingCollection, setLoadingCollection] = useState<boolean>(false);
    const [errorCollection, setErrorCollection] = useState<boolean>(false);

    useEffect(() => {
        const fetchCollections = async () => {
            setLoadingCollection(true)
            if (user && series) {
                try {
                    const response = await fetch(`/api/collection?userId=${encodeURIComponent(user.id)}&seriesId=${encodeURIComponent(series.id)}`);
                    if (!response.ok) {
                        setErrorCollection(true);
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to fetch collections');
                    }
                    const data = await response.json();
                    setCollections(data);
                } catch (error) {
                    console.error('Error fetching collections:', error);
                    setErrorCollection(true);
                }
            }
            setLoadingCollection(false);
        };
        fetchCollections();
    }, [user, series]);

    const handleToggle = async (index: number) => {
        const collection = collections[index];
        const updatedCollections = [...collections];
        const op = collection.has_series ? -1 : 1;

        if(!series) {
            return;
        }

        try {
            if (collection.has_series) {
                await fetch('/api/collection/series', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ collectionId: collection.id, seriesId: series.id })
                });
            } else {
                await fetch('/api/collection/series', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ collectionId: collection.id, seriesId: series.id })
                });
            }

            updatedCollections[index] = {...collection, has_series: !collection.has_series, num_series: (collection.num_series || 0) + op};
            setCollections(updatedCollections);
        } catch (error) {
            console.error('Errore durante l\'aggiornamento della collezione:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full p-2" disabled={loading || !user}>
                    <i className="fas fa-plus" />
                </Button>
            </DialogTrigger>
            {/*className="sm:max-w-md"*/}
            <DialogContent  className="sm:max-w-[45%] max-h-screen p-0">
                <DialogHeader  className=" sm:rounded-t-lg overflow-hidden">
                    <div className="w-full h-36 relative">
                        <img src={`/images/series/horizontal/${series?.image}`} alt="..." className="absolute top-0 left-0 w-full h-full"/>
                        <div className="add-collection-series-title absolute rounded-lg max-w-[calc(100%-32px)] h-[calc(100%-32px)] top-0 left-0 m-4 px-5 py-3 flex flex-col items-start justify-around">
                            <h1 className="text-xl font-semibold max-w-full truncate">{series?.title}</h1>
                            <div className="flex items-center justify-start gap-3 lg:gap-5 text-[13px] max-w-full truncate">
                                <p className="flex items-center gap-2">
                                    <span>Type</span><span className="font-bold text-[14px]">{series?.type}</span>
                                </p>
                                •
                                <p className="flex items-center gap-2">
                                    <span>Studio</span><span className="font-bold text-[14px]">{series?.studio}</span>
                                </p>
                                •
                                <p className="flex items-center gap-2">
                                    <span>Year</span><span className="font-bold text-[14px]">{series?.release_year}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <div className="max-h-96 px-6">
                    {loadingCollection ? (
                        <div className="w-full h-[70px] flex items-center justify-center">
                            <div className="custom-loader"></div>
                        </div>
                    ) : errorCollection ? (
                        <div className="text-center text-red-500">
                            <p>Oops! We encountered a problem with the connection. Please try again later.</p>
                        </div>
                    ) : collections && collections.length === 0 ? (
                        <div className="text-center opacity-80">
                            <p>Your library is currently empty. Start adding collections to manage your favorite series.</p>
                        </div>
                    ) : (
                        <ListCollection>
                            {collections.map((collection, index) => (
                                <div onClick={() => handleToggle(index)} key={index}>
                                    <ItemCollection collection={collection} checked={collection.has_series || false} />
                                </div>
                            ))}
                        </ListCollection>
                    )}
                </div>
                <DialogFooter className="p-6">
                    <DialogClose>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}