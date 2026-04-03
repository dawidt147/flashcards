import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Button from "@/components/buttons/button";

export default function LogIn() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <form>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h1 className="text-base/7 font-semibold text-white">Log in</h1>
                    <p className="mt-1 text-sm/6 text-gray-400">Provide username and password</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm/6 font-medium text-white">Username</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:outline-indigo-500">
                                    <input id="username" type="text" name="username" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:outline-indigo-500">
                                    <input id="password" type="password" name="password" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <Button 
                        id="log-in"
                        type="submit"
                        label="Log In"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        />
                    </div>
                </div>    
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
