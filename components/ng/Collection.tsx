import React, { useState } from "react";
// import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collection as ICollection } from "@/interfaces/Collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";

interface CollectionProps {
    collection: ICollection;
}
export const Collection: React.FC<CollectionProps> = ({ collection }) => {
    return (
        <div onClick={() => location.href = `/library/collection/${collection.id}`}
            className="collection w-full h-[150px] px-4 py-3 shadow-md border border-accent rounded-lg relative overflow-hidden cursor-pointer">
            <div className={`collection-color absolute top-0 left-0 -z-10 h-full`}
                 style={{backgroundColor: collection.color}}/>
            <div className="flex items-center justify-between">
                <h1 className="px-2 py-1 text-lg font-medium rounded-lg bg-background">{collection.title}</h1>
                <div className="flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                    <ModifyButton collection={collection}/>
                    <DeleteButton id={collection.id} title={collection.title}/>
                </div>
            </div>
            <p className="absolute bottom-3 right-4 flex items-center gap-1 font-medium text-sm rounded-lg">
                <FontAwesomeIcon icon={faPlay}/>{collection.num_series || 0}
            </p>
        </div>
    );
};


interface ModifyButtonProps {
    collection: ICollection;
}
const ModifyButton: React.FC<ModifyButtonProps> = ({collection}) => {
    const [updatedCollection, setUpdatedCollection] = useState(collection);
    const colorList: string[] = ["#e73e29", "#ff9999", "#ee7110", "#ffbf84", "#33ee33", "#99ff99", "#3f9f4a", "#8ed290", "#27938e", "#7ad1cd", "#1e84d0", "#86c8f7", "#9a61c7", "#d4aff6", "#cc53b4", "#f7aae7"];


    const action = async () => {
        try {
            const response = await fetch('/api/collection', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedCollection)
            });

            const result = await response.json();
            if (result.success) {
                alert('Collection updated successfully');
                location.reload();
            } else {
                alert('Error updating collection: ' + result.error);
            }
        } catch (error) {
            alert('Error updating collection: ' + error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="text-md">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </DialogTrigger>
            <DialogContent className="custom-scrollbar max-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update collection</DialogTitle>
                    <DialogDescription>
                        Update a collection where you can insert your series.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-5">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="title" className="font-medium">Title</Label>
                        <Input type="text" name="title" id="title" className="col-span-5"
                               placeholder="Title" value={updatedCollection.title}
                               onChange={(e) => setUpdatedCollection({ ...updatedCollection, title: e.target.value })}
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
                                               checked={updatedCollection.color === color}
                                               onChange={() => setUpdatedCollection({ ...updatedCollection, color })} />
                                        <div
                                            className="size-9 rounded-sm flex items-center justify-center text-black font-black"
                                            style={{backgroundColor: color}}>{updatedCollection.color === color &&
                                            <i className={`ri-check-line`} />}
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
                                  value={updatedCollection.description}
                                  onChange={(e) => setUpdatedCollection({ ...updatedCollection, description: e.target.value })} />
                    </div>
                </div>
                <DialogFooter className="flex flex-row items-center justify-end gap-3">
                    <DialogClose>
                        <Button type="button" variant={"outline"} onClick={() => setUpdatedCollection(collection)}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={action}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

interface DeleteButtonProps {
    id: number|undefined;
    title: string|undefined;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ id, title }) => {
    const [userPwd, setUserPwd] = useState<string>('');

    const action = async () => {
        if (userPwd.trim() === '') {
            alert('Password cannot be empty.');
            return;
        }

        try {
            const res = await fetch(`/api/collection`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password: userPwd }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to delete collection.');
            }

            alert(data.success);
            location.reload();

        } catch (error) {
            console.error('Error:', error);
            alert(error || 'An unexpected error occurred.');
            setUserPwd('');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="text-md"><FontAwesomeIcon icon={faTrash} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Collection {`"${title}"`}</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this collection?</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="password" className="sr-only">
                            Password
                        </Label>
                        <Input id="password" type="password" placeholder="Password" value={userPwd}
                            onChange={(e) => setUserPwd(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="flex flex-row items-center justify-end gap-3">
                    <DialogClose asChild><Button type="button" variant="outline">Close</Button></DialogClose>
                    <Button type="button" onClick={action}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


interface CollectionContainerProps {
    children?: React.ReactNode;
}
export const CollectionContainer: React.FC<CollectionContainerProps> = ({ children }) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10">
            { children }
        </div>
    );
}
