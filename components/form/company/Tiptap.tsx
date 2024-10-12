"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from '@tiptap/extension-youtube'


export default function Tiptap({
    pitch,
    onChange,
}: {
    pitch: string;
    onChange: (richText: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Heading.configure({
                levels: [1],
                HTMLAttributes: {
                    class: "font-bold text-2xl",
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            }),
            Image,
            ImageResize,
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
        ],
        content: pitch,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[300px] border-input bg-white disabled:cursor-not-allowed disabled:opacity-50 my-2 py-2 px-3",
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col justify-stretch min-h-[300px]">
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};