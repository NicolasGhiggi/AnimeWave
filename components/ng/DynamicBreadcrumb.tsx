import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface DynamicBreadcrumbProps {
    currentLink: string;
    className?: string;
}

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({ currentLink, className }) => {
    const buildBreadcrumbs = (link: string) => {
        const parts = link.split('/').filter(part => part);
        const breadcrumbs = [{ name: 'Home', link: '/' }];
        let accumulatedLink = '';
        parts.forEach((part, index) => {
            accumulatedLink += `/${part}`;
            breadcrumbs.push({
                name: part.charAt(0).toUpperCase() + part.slice(1),
                link: accumulatedLink,
            });
        });
        return breadcrumbs;
    };

    const breadcrumbs = buildBreadcrumbs(currentLink);

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <BreadcrumbSeparator />}
                        {index < breadcrumbs.length - 1 ? (
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbItem>
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}