import { useContext } from "react";
import { SearchContextInternal } from "./SearchContext";

export function useSearch() {
    return useContext(SearchContextInternal);
}
