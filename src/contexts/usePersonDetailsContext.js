import { useContext } from "react";
import { PersonContext } from "./PersonDetailsContext";

export const usePersonDetails = () => useContext(PersonContext);
