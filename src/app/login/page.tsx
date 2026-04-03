import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LoginForm from '@/components/sections/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Header />
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
        <Footer />
    </div>
  );
}