import { useMemo } from 'react';

export function useMergedTags<OPTIONS extends {tags?: string[]}>(tags: string[], ...options: OPTIONS[]) {
    const allTags = tags.slice();
    options.forEach(o => {
        if (!o.tags) {
            return;
        }
        allTags.push(...o.tags);
    });
    const unique = Array.from(new Set(allTags))
    // Retain an array if a set of items is the same
    return useMemo(() => unique, [...unique]);
}