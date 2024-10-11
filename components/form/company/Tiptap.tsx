"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Toolbar } from "./Toolbar";

export default function Tiptap({
    pitch,
    onChange,
}: {
    pitch: string;
    onChange: (richText: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({
        }), Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
        })],
        content: pitch,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[300px] border-input bg-white opacity-70 disabled:cursor-not-allowed disabled:opacity-50 my-2",
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col justify-stretch min-h-[300px]">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};