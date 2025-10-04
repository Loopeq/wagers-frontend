export function useLocalStorage() {
    const setItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(e);
        }
    }

    const getItem = (key) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    const removeItem = (key) => {
        localStorage.removeItem(key);
    }

    return {
        setItem,
        getItem,
        removeItem,
    }
}
