import { SearchBarProps } from "../../types/interfaces";
import { Search } from 'lucide-react';

const SearchBar: React.FC<SearchBarProps> = ({placeholder}) => { 
    return (
        <form>
            <label className="screen-reader-text none" htmlFor="search-bar">
                Content search
            </label>
            <input id="search-bar" name="search-bar" type="text" placeholder={placeholder} />
            <button type="submit">
                <Search />
            </button>
        </form>
    );
}
export default SearchBar;