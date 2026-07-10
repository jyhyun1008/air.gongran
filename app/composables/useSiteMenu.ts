const SCROLL_POINT = 115;

export const useSiteMenu = () => {
    const isScrolled = useState("menu-scrolled", () => false);
    const isMenuOpen = useState("menu-open", () => false);

    const onScroll = () => {
        isScrolled.value = window.scrollY >= SCROLL_POINT;
    };

    const toggleMenu = (open?: boolean) => {
        isMenuOpen.value = open ?? !isMenuOpen.value;
    };

    onMounted(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    });
    onBeforeUnmount(() => {
        window.removeEventListener("scroll", onScroll);
    });

    return { isScrolled, isMenuOpen, toggleMenu };
};
