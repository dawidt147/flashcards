import { SearchBarProps } from "../../types/interfaces";
import { Search } from 'lucide-react';

const SearchBar: React.FC<SearchBarProps> = ({placeholder}) => { 
    return (
        <form action="" className="flex gap-4">
            <label className="sr-only" htmlFor="search-bar">
                Content search
            </label>
            <input id="search-bar" className="" name="search-bar" type="text" placeholder={placeholder} />
            <button type="submit">
                <Search />
            </button>
        </form>
    );
}
export default SearchBar;