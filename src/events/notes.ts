export function addUniqueNote(currentNotes: string[], note: string): string[] {
    if (currentNotes.includes(note)) {
        return currentNotes;
    }

    return [...currentNotes, note];
}
