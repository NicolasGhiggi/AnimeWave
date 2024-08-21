import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ListItem } from "@/components/ng/ListItem";

interface NavigationMenuComponents {
    title: string;
    href: string;
    description: string;
}

const generalsLink: NavigationMenuComponents[] = [
    {
        title: "Interface language",
        href: "/",
        description: "Select the language in which you want to view the site.",
    },
    {
        title: "Jet lag",
        href: "/",
        description: "Set your time zone to correctly sync episode release times.",
    }
]
const accountsLink: NavigationMenuComponents[] = [
    {
        title: "Personal info",
        href: "/settings/account/info",
        description:
            "Change your personal information.",
    },
    {
        title: "Notification preferences",
        href: "",
        description:
            "Turn on or off email or push notifications for new episodes, updates, or promotions.",
    }
]
const parentalControlsLink : NavigationMenuComponents[] = [
    {
        title: "Security PIN",
        href: "/settings/parental/pin",
        description: "Set a PIN to access the settings, ensuring that only authorized individuals can modify your account configurations.",
    }
]
const safetysLink: NavigationMenuComponents[] = [
    {
        title: "Two-factor authentication",
        href: "/",
        description: "Enable two-factor authentication for added security.",
    },
    {
        title: "Activity history",
        href: "/",
        description: "View a log of recent activity on your account.",
    }
]
const otherLink: NavigationMenuComponents[] = [
    {
        title: "Feedback and support",
        href: "/",
        description: "Access options to send feedback or request support.",
    },
    {
        title: "Privacy and cookies",
        href: "/",
        description: "Manage your privacy and cookie preferences.",
    },
    {
        title: "Terms and conditions",
        href: "/",
        description: "View the site's terms of service and conditions of use.",
    },
]

export const SettingsHeader = () => {
    return (
        <header className="w-full sticky top-0 flex items-center backdrop-blur p-2 z-20 gap-2">
        <ThemeToggle />
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>General</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {generalsLink.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {accountsLink.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Parental Control</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {parentalControlsLink.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Safety</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {safetysLink.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Other</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {otherLink.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </header>
    );
}