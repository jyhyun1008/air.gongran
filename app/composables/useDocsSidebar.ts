// mobile-only sidebar toggle for the docs layout; shared state so the
// toggler button and the sidebar itself (siblings, not parent/child) agree.
export const useDocsSidebar = () => {
    const isOpen = useState("docs-sidebar-open", () => false);
    const route = useRoute();

    watch(
        () => route.path,
        () => {
            isOpen.value = false;
        }
    );

    const toggle = (open?: boolean) => {
        isOpen.value = open ?? !isOpen.value;
    };

    return { isOpen, toggle };
};
