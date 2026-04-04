import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SignUpForm from "@/components/sections/sign-up-form";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-8">
        <div className="container mx-auto flex w-full max-w-3xl flex-col items-center sm:items-start">
          <div className="flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <Suspense>
              <SignUpForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
