import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

export const useScrollCard = () => {
    return useContext(ScrollContext);
}
