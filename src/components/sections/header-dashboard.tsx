import { useTranslations } from "next-intl";
import Logo from "@/components/logo";
import SearchBar from "@/components/inputs/search-bar";
import ActionBar from "./action-bar";

export default function HeaderDashboard() {
    const t = useTranslations("Accessibility");
 
    return (
        <header className="header-main header-dashboard sticky top-0 right-0 grid grid-cols-4 p-4 items-center bg-background z-50">
            <div className="col-span-1">
                <Logo
                    type="default"
                    width={100}
                    height={20}
                    className="dark:invert"
                />
            </div>
            <div className="col-span-2 flex gap-4 justify-around items-center">
                <SearchBar placeholder={t("searchPlaceholder")} />
            </div>
            <div className="col-span-1 ml-auto">
                <ActionBar />
            </div>
        </header>
    );
}
