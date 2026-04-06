'use client';

import Button from "../buttons/button";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

export default function ActionBar() {
    const { data: session } = useSession();
    if ( session ) {
        return (
            <section className="action-bar flex gap-2">
                <Link href="/dashboard">
                    <Button
                    id="dashboard"
                    label="Dashboard"
                    type="button"
                    className="bg-secondary hover:bg-secondary/90 focus:bg-secondary/90"
                    />
                </Link>
                <Button
                    id="sign-out"
                    label="Sign Out"
                    type="button"
                    className="bg-primary hover:bg-primary/90 focus:bg-primary/90"
                    onClick={() => signOut()}
                />
            </section>
        );
    }

    return (
        <section className="action-bar flex gap-2">
            <Link href="/sign-up">
                <Button
                id="log-in"
                label="Sign up"
                type="button"
                className="bg-secondary hover:bg-secondary/90 focus:bg-secondary/90"
                />
            </Link>
            <Link href="/login">
                <Button
                id="log-in"
                label="Log in"
                type="button"
                className="bg-primary hover:bg-primary/90 focus:bg-primary/90"
                />
            </Link>
        </section>
    );
}