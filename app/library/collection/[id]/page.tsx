"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import { Button } from '@/components/ui/button';
import { Message } from '@/components/ng/Message';
import { Collection } from '@/interfaces/Collection';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContainer } from '@/components/ng/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function CollectionDetails() {
    const { id } = useParams();
    const { user, loading: authLoading, error: authError } = useAuthUser();
    const [loadingCollection, setLoadingCollection] = useState<boolean>(false);
    const [errorCollection, setErrorCollection] = useState<boolean>(false);
    const [collection, setCollection] = useState<Collection | null>(null);

    useEffect(() => {
        if (!authLoading && (authError || !user)) {
            location.href = '/';
        }
    }, [authLoading, authError, user]);
    useEffect(() => {
        if (!user?.id || !id) return;

        const getCollectionInfo = async () => {
            setLoadingCollection(true);
            setErrorCollection(false);

            try {
                const res = await fetch(`/api/collection/series?collectionId=${id}&userId=${user.id}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error);
                }
                const data = await res.json();
                setCollection(data);
            } catch (error) {
                console.error('Failed to fetch collection data:', error);
                setErrorCollection(true);
            } finally {
                setLoadingCollection(false);
            }
        };

        getCollectionInfo();
    }, [id, user]);

    if (authLoading || loadingCollection) {
        return (
            <div className="absolute w-full h-full flex items-center justify-center">
                <div className="custom-loader"></div>
            </div>
        );
    }
    if (!collection || errorCollection) {
        return (
            <div>
                <Message
                    title={"Oops! Nothing Found"}
                    icon={"ri-emotion-sad-line"}
                    text={`We couldn't find the requested collection. If the problem persists, please contact our support for assistance.`}
                />
                <Button variant="outline" className="flex items-center gap-2 mx-auto mt-3" onClick={() => location.href = '/library'}>
                    <FontAwesomeIcon icon={faArrowRightToBracket} className="size-5 rotate-180" />
                    <span className="font-semibold">Go back</span>
                </Button>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 p-2 sm:p-2 md:p-4 xl:p-6 2xl:p-8">
            <div className="w-full rounded-lg border border-accent p-4 shadow">
                <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center w-full gap-2 overflow-hidden">
                        <div className="size-10 rounded-full" style={{ backgroundColor: collection.color }} />
                        <h1 className="text-xl font-medium truncate whitespace-nowrap">{collection.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button variant="outline" size="icon" onClick={() => location.href = '/library'}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className="size-5 rotate-180" />
                        </Button>
                    </div>
                </div>
                <Separator className="my-4 bg-accent" />
                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 px-4">
                    <div className="md:col-span-4 flex flex-col justify-center">
                        <p className="font-medium">{collection.description}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="flex gap-3 text-sm">
                            <span className="font-medium">Last update:</span>
                            <span className="font-semibold">{collection.last_update}</span>
                        </p>
                        <p className="flex gap-3 text-sm">
                            <span className="font-medium">N. series:</span>
                            <span className="font-semibold">{collection.num_series}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full mt-7">
                {collection.seriesList && collection.seriesList.length > 0 ? (
                    <CardContainer title={"List of Series"}>
                        {collection.seriesList.map((info) => (
                            <Card key={info.id} series_info={info} />
                        ))}
                    </CardContainer>
                ) : (
                    <Message
                        title={"No series found"}
                        icon={"ri-emotion-sad-line"}
                        text={"Please add at least one series before you can view it in this collection."}
                    />
                )}
            </div>
        </div>
    );
}
