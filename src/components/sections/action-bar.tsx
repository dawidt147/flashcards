'use client';

import Button from "../buttons/button";
import Link from 'next/link';
import {
    Plus,
    Folder,
    SquareDashedBottom
} from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import Image from "next/image";
import { redirect } from 'next/navigation'
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";
import { RefObject } from "react";
import { useTranslations } from "next-intl";

export default function ActionBar() {
	const { data: session } = useSession();
	const [opened, setOpened] = useState("none");
	const t = useTranslations("ActionBar");
	const common = useTranslations("Common");
	const accessibility = useTranslations("Accessibility");
	const ref:RefObject<HTMLDivElement> = useClickAway((e) => {
		const el = e.target;
		const isTrigger = (el as HTMLElement).classList.contains('dropdown-trigger');
		const isChildOfTrigger = (el as HTMLElement).closest('.dropdown-trigger');

		if (el instanceof Element && !isTrigger && !isChildOfTrigger) {
			setOpened("none");
		}
	});

	function toggle(dropdown: string) {
		setOpened(opened !== "none" ? "none" : dropdown);
	}

    if ( session ) {
		//const userImageSrc = session.user?.image ?? '/user-placeholder.webp';
		const userImageSrc = '/assets/user-placeholder.webp';
        return (
            <section className="action-bar flex gap-2">
                <div className="button-with-dropdown relative">
                    <Button
						onClick={() => toggle("add")}
                        id="add-content-dropdown-trigger"
                        label=""
                        type="button"
                        className="dropdown-trigger bg-secondary hover:bg-secondary/90 focus:bg-secondary/90">
                        <Plus />
                    </Button>
					{opened === "add" && (
						<div id="add-content-dropdown-content" className="dropdown absolute" ref={ref}>
							<div className="dropdown-section">
								<ul>
									<li>
										<Button
											onClick={() => redirect("/dashboard/create-set")}
											id="add-new-course-flashcards"
											label=""
											type="button"
											className="">
											<SquareDashedBottom />
											{t("flashcards")}
										</Button>
									</li>
									<li>
										<Button
											onClick={() => redirect("/xd")} // Display modal with folder name to create
											id="add-content-dropdown-trigger"
											label=""
											type="button"
											className="">
											<Folder />
											{t("folder")}
										</Button>
									</li>
								</ul>
							</div>
                    	</div>
					)}
                </div>
                <div className="button-with-dropdown relative">
                    <Button
						onClick={() => toggle("account")}
                        id="my-account-dropdown-trigger"
                        label=""
                        type="button"
                        className="dropdown-trigger">
                        <Image
							className="user-image"
							src={userImageSrc}
							alt={accessibility("userImageAlt")}
							width="20"
							height="20"
          				/>
                    </Button>
					{opened === "account" && (
						<div id="user-settings-dropdown-content" className="dropdown absolute" ref={ref}>
							<div className="dropdown-section">
								<div className="grid">
									<div>
										<Image
											className="user-image"
											src={userImageSrc}
											alt={accessibility("userImageAlt")}
											width="20"
											height="20"
										/>
									</div>
									<div>
										<div>{session.user?.name}</div>
										<div>{session.user?.email}</div>
									</div>
								</div>
							</div>
							<div className="dropdown-section">
								<ul>
									<li>
										<Button
											onClick={() => redirect("/#")} // Light / Dark mode
											id="add-content-dropdown-trigger"
											label=""
											type="button"
											className="">
											<SquareDashedBottom />
											{t("lightMode")}
										</Button>										
									</li>
									<li>
										<Button
											onClick={() => redirect("/dashboard/settings/")} // User settings page
											id="add-content-dropdown-trigger"
											label=""
											type="button"
											className="">
											<Folder />
											{t("settings")}
										</Button>											
									</li>
								</ul>
							</div>
							<div className="dropdown-section">
								<Button
									id="sign-out"
									label={t("signOut")}
									type="button"
									className=""
									onClick={() => signOut()}
								/>
							</div>
                    	</div>
					)}
                </div>
            </section>
        );
    }

    return (
        <section className="action-bar flex gap-2">
            <Link href="/sign-up">
                <Button
                id="log-in"
                label={common("signUp")}
                type="button"
                className="bg-secondary hover:bg-secondary/90 focus:bg-secondary/90"
                />
            </Link>
            <Link href="/login">
                <Button
                id="log-in"
                label={common("logIn")}
                type="button"
                className="bg-primary hover:bg-primary/90 focus:bg-primary/90"
                />
            </Link>
        </section>
    );
}