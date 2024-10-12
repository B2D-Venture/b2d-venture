import { Editor } from "@tiptap/core";

export type ToolbarProps = {
    editor: Editor | null;
};

export type HeadingToolProps = {
    editor: Editor | null;
    size: "default" | "sm" | "lg" | null | undefined;
    level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type StarterKitToolProps = {
    editor: Editor | null;
    size: "default" | "sm" | "lg" | null | undefined;
    type: "bold" | "italic" | "strike" | "bulletList" | "orderedList" | "undo" | "redo";
};

