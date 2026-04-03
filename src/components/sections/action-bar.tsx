import Button from "../buttons/button";
import Link from 'next/link';
import { signOut } from '@/root/auth';

export default function ActionBar() {
    return (
        <section className="action-bar">
            <Link href="/log-in">
                <Button
                id="log-in"
                label="Log in"
                type="button"
                />
            </Link>
            <form
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
        </section>
    );
}