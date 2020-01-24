function throttle<T extends Function>(cb: T, interval = 200) {
    let ready = true;
    let callable = (...args: any) => {
        if (!ready) {
            return;
        }
        ready = false;
        cb(...args);
        setTimeout(() => ready = true, interval)
    };
    return <T>(<any>callable);
}

export default throttle;  