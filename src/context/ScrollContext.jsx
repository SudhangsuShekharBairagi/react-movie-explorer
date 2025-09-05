import { createContext, useContext, useRef } from "react";

const SrcollContext = createContext(null);

export const ScrollProvider = ({ children }) => {
    const containerRef = useRef(null);

    const scroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        // Width of one card (including margin)
        const card = container.querySelector(".card");
        const cardWidth = card ? card.offsetWidth + 16 : 200; // fallback if no card

        container.scrollBy({
            left: direction * cardWidth * 4,
            behavior: "smooth",
        });
    };

    return (
        <SrcollContext.Provider value={{ scroll, containerRef }}>
            {children}
        </SrcollContext.Provider>
    )
}

export const useScrollCard = () => {
    return useContext(SrcollContext);
}