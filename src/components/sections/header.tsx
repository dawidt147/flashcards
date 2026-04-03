import Logo from "@/components/logo";
import SearchBar from "@/components/inputs/search-bar";
import Menu from "./menu";
import ActionBar from "./action-bar";

export default function Header() {
    return (
        <header className="header-main flex justify-center items-center gap-4">
            <Logo
                type="default"
                width={100}
                height={20}
                className="dark:invert"
            />
            <Menu />
            <SearchBar placeholder="Search..." />
            <ActionBar />
        </header>
    );
}
