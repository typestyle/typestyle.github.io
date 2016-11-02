interface EditorPosition {
    line: number;
    ch: number;
}
interface CodeEdit {
    from: EditorPosition;
    to: EditorPosition;
    newText: string;
    /**
     * When we are editing stuff from the front end we want all code edits except our own (user typing code)
     * This helps us track that.
     */
    sourceId? : string;
}
