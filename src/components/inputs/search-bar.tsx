import { useTranslations } from "next-intl";
import { SearchBarProps } from "../../types/interfaces";
import { Search } from 'lucide-react';

const SearchBar: React.FC<SearchBarProps> = ({placeholder}) => { 
    const t = useTranslations("Accessibility");

    return (
        <form action="" className="flex gap-4">
            <label className="sr-only" htmlFor="search-bar">
                {t("searchLabel")}
            </label>
            <input id="search-bar" className="" name="search-bar" type="text" placeholder={placeholder} />
            <button type="submit">
                <Search />
            </button>
        </form>
    );
}
export default SearchBar;