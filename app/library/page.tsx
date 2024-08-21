"use client"
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/ng/Sidebar";
import { Header } from "@/components/ng/Header";
import useAuthUser from "@/hooks/useAuthUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/ng/Message";
import { Textarea } from "@/components/ui/textarea";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collection as ICollection } from "@/interfaces/Collection";
import { Collection, CollectionContainer } from "@/components/ng/Collection";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Footer} from "@/components/ng/Footer";

export default function Library() {
    const { user, loading, error } = useAuthUser();
    const [collections, setCollections] = useState<ICollection[] | null>(null);
    const [loadingCollections, setLoadingCollections] = useState<boolean>(false);
    const [errorCollections, setErrorCollections] = useState<boolean>(false);
    const [newCollectionData, setNewCollectionData] = useState<ICollection>({ title: "", color: "", description: "" });
    const colorList: string[] = ["#e73e29", "#ff9999", "#ee7110", "#ffbf84", "#33ee33", "#99ff99", "#3f9f4a", "#8ed290", "#27938e", "#7ad1cd", "#1e84d0", "#86c8f7", "#9a61c7", "#d4aff6", "#cc53b4", "#f7aae7"];

    useEffect(() => {
        const fetchCollections = async () => {
            if (user) {
                setLoadingCollections(true);
                try {
                    const response = await fetch(`/api/collection?userId=${encodeURIComponent(user.id)}`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to fetch collections');
                    }
                    const data = await response.json();
                    setCollections(data);
                    setLoadingCollections(false);
                } catch (error) {
                    console.error('Error fetching collections:', error);
                    setLoadingCollections(false);
                    setErrorCollections(true);
                }
            }
        };
        fetchCollections();
    }, [user]);

    const createNewCollection = async () => {
        console.table({...newCollectionData, userId: user?.id});
        if (user) {
            try {
                const res = await fetch("/api/collection", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...newCollectionData, userId: user.id }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    alert(`Error: ${data.error}`);
                } else {
                    const data = await res.json();
                    alert(data.message);
                    location.reload();
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An unexpected error occurred");
            }
        } else {
            alert("User not authenticated");
        }
    }
    const cancelNewCollection = () => setNewCollectionData({ title: "", color: "", description: "" });
    const setNewCollectionField = (field: keyof ICollection, value: string) => setNewCollectionData(prevState => ({...prevState, [field]: value}));

    return (
        <div className="w-full h-screen grid pl-[53px]">
            <Sidebar/>
            <div className="w-full h-full">
                <Header/>
                <main className="w-full pt-[30px]">
                    {loading || loadingCollections ? (
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <div className="custom-loader"></div>
                        </div>
                    ) : user == null || error ? (
                        <Message
                            title={"Oops! Nothing Found"}
                            icon={"ri-emotion-sad-line"}
                            text={`Please log in to your account to view your library.`}
                        />
                    ) : errorCollections ? (
                        <Message
                            title={"Oops! Something went wrong"}
                            icon={"ri-emotion-sad-line"}
                            text={"An unexpected error occurred. Please check your internet connection and try reloading the page. If the problem persists, contact support or try again later."}
                        />
                    ) : (
                        <>
                            <div className="flex items-center gap-3 px-10">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size={"icon"} className="text-xl font-bold size-11">
                                            <FontAwesomeIcon icon={faFolderPlus}/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="custom-scrollbar max-h-screen overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Create new collection</DialogTitle>
                                            <DialogDescription>
                                                Create a new collection where you can insert your series.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="flex flex-col gap-8 py-5">

                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="title" className="font-medium">Title</Label>
                                                <Input type="text" name="title" id="title" className="col-span-5"
                                                       placeholder="Title" value={newCollectionData.title}
                                                       onChange={(e) => setNewCollectionField("title", e.target.value)}
                                                       required/>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="color" className="font-medium">Color</Label>
                                                <div className="grid grid-cols-8 gap-1">
                                                    {colorList.map((color, index) => (
                                                        <label key={index}
                                                               className="flex items-center justify-center cursor-pointer">
                                                            <div className="p-1 rounded-lg transition hover:bg-accent">
                                                                <input type="checkbox" className="hidden" value={color}
                                                                       checked={newCollectionData.color === color}
                                                                       onChange={() => setNewCollectionField("color", color)}/>
                                                                <div
                                                                    className="size-9 rounded-sm flex items-center justify-center text-black font-black"
                                                                    style={{backgroundColor: color}}>{newCollectionData.color === color &&
                                                                    <i className={`ri-check-line`}></i>}
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="description" className="font-medium">Description</Label>
                                                <Textarea name="description" id="description" className="col-span-5"
                                                          placeholder="Description"
                                                          value={newCollectionData.description}
                                                          onChange={(e) => setNewCollectionField("description", e.target.value)}/>
                                            </div>

                                        </div>

                                        <DialogFooter className="flex flex-row items-center justify-end gap-3">
                                            <DialogClose>
                                                <Button type="button" variant={"outline"}
                                                        onClick={cancelNewCollection}>Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" onClick={createNewCollection}>Create</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            { collections && collections.length > 0 ? (
                                <CollectionContainer>
                                    {collections.map((collection, index) => (
                                        <Collection collection={collection} key={index}/>
                                    ))}
                                </CollectionContainer>
                            ) : (
                                <Message
                                    title={"Oops! Nothing Found"}
                                    icon={"ri-emotion-sad-line"}
                                    text={"To view collections, you need to create one first. Click the button with the folder and plus icon above to create a new collection."}
                                />
                            )}
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}