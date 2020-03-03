export function getPermutations<T>(list: T[]): T[][] {
    if (list.length == 0) return [[]];

    const result = [];

    for (let i = 0; i < list.length; i++) {
        const copy = [...list];
        const head = copy.splice(i, 1);
        const rest = getPermutations(copy);
        for (let j = 0; j < rest.length; j++) {
            const next = head.concat(rest[j]);
            result.push(next);
        }
    }

    return result;
}
