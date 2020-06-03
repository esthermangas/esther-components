export const pick = (initial: any, options: object) => {
    for(const [k, v] of Object.entries(options)) {
        if (v) {
            return k;
        }
    }

    return initial;
};