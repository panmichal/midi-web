function debounce<T extends Function>(cb: T, wait = 200) {
    let h = 0;
    const callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return (callable as any) as T;
}

export default debounce;
