import {DevtoolsProvider} from "@providers/devtools";
import {Refine} from "@refinedev/core";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";
import {notificationProvider, RefineSnackbarProvider} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import {Metadata} from "next";
import {cookies} from "next/headers";
import React, {Suspense} from "react";

import {AppIcon} from "@components/app-icon";
import {ColorModeContextProvider} from "@contexts/color-mode";
import {dataProvider} from "@providers/data-provider";

export const metadata: Metadata = {
    title: "Refine",
    description: "Generated by create refine app",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme");
    const defaultMode = theme?.value === "dark" ? "dark" : "light";

    return (
        <html lang="en">
        <body>
        <Suspense>
            <RefineKbarProvider>
                <ColorModeContextProvider defaultMode={defaultMode}>
                    <RefineSnackbarProvider>
                        <DevtoolsProvider>
                            <Refine
                                routerProvider={routerProvider}
                                dataProvider={dataProvider}
                                notificationProvider={notificationProvider}
                                resources={[
                                    {
                                        name: "fees",
                                        list: "/fee",
                                        create: "/fee/create",
                                        edit: "/fee/edit/:id",
                                        show: "/fee/show/:id",
                                        meta: {
                                            canDelete: true
                                        },
                                    },
                                    {
                                        name: "customers",
                                        list: "/customer",
                                        create: "/customer/create",
                                        edit: "/customer/edit/:id",
                                        show: "/customer/show/:id",
                                        meta: {
                                            canDelete: true
                                        },
                                    },
                                    {
                                        name: "blog_posts",
                                        list: "/blog-posts",
                                        create: "/blog-posts/create",
                                        edit: "/blog-posts/edit/:id",
                                        show: "/blog-posts/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: "categories",
                                        list: "/categories",
                                        create: "/categories/create",
                                        edit: "/categories/edit/:id",
                                        show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "socCuu-JdwMCr-QqJLaU",
                                    title: {text: "Refine Project", icon: <AppIcon/>},
                                }}
                            >
                                {children}
                                <RefineKbar/>
                            </Refine>
                        </DevtoolsProvider>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </Suspense>
        </body>
        </html>
    );
}
