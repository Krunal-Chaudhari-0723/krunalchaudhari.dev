import { useEffect } from "react";

// Feeds the cursor position to the hovered .card so its spotlight and border glow follow the mouse
export default function useCardSpotlight() {
    useEffect(() => {
        const handlePointerMove = (e) => {
            const card = e.target.closest?.(".card");
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        };

        document.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => document.removeEventListener("pointermove", handlePointerMove);
    }, []);
}
