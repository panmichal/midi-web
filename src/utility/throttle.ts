function throttle<T extends (...args: any[]) => any>(
  cb: T,
  interval = 200
): (...args: Parameters<T>) => void {
  let ready = true;
  let callable = (...args: any) => {
    if (!ready) {
      return;
    }
    ready = false;
    cb(...args);
    setTimeout(() => (ready = true), interval);
  };
  return callable;
}

export default throttle;
