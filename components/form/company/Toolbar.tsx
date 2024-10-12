"use client";
import { Toggle } from "@/components/ui/toggle";
import { ToolbarProps } from "@/types/pitch";
import {
    Heading,
    Bold,
    Italic,
    Strikethrough,
    AlignCenter,
    AlignLeft,
    AlignRight,
    List,
    ListOrdered,
    Image,
    Redo,
    Undo,
    Youtube,
} from "lucide-react";
import React, { useCallback } from 'react'

export default function ToolBar({ editor }: ToolbarProps) {
    if (!editor) return null;

    const addImage = useCallback(() => {
        const url = window.prompt('URL')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    const addYoutube = useCallback(() => {
        const url = window.prompt('URL');
        if (!url) return;

        let width;
        let height;

        do {
            width = window.prompt('Width (max 700)');
            if (width) {
                const widthValue = parseInt(width, 10);
                if (widthValue > 700) {
                    alert('Width must be 700 or less. Please enter again.');
                }
            }
        } while (width && parseInt(width, 10) > 700);

        do {
            height = window.prompt('Height (max 400)');
            if (height) {
                const heightValue = parseInt(height, 10);
                if (heightValue > 400) {
                    alert('Height must be 400 or less. Please enter again.');
                }
            }
        } while (height && parseInt(height, 10) > 400);

        const finalWidth = width ? Math.max(320, parseInt(width, 10)) : 700;
        const finalHeight = height ? Math.max(180, parseInt(height, 10)) : 400;

        editor.commands.setYoutubeVideo({
            src: url,
            width: finalWidth,
            height: finalHeight,
        });
    }, [editor]);


    const Options = [
        {
            icon: <Heading className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <Image className="size-4" />,
            onClick: () => addImage(),
            preesed: editor.isActive("image"),
        },
        {
            icon: <Youtube className="size-4" />,
            onClick: () => addYoutube(),
            preesed: editor.isActive("youtube"),
        },
        {
            icon: <Undo className="size-4" />,
            onClick: () => editor.chain().focus().undo().run(),
            preesed: false,
        },
        {
            icon: <Redo className="size-4" />,
            onClick: () => editor.chain().focus().redo().run(),
            preesed: false,
        },
    ];

    return (
        <div className="px-2 py-1 rounded-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                {Options.map((option, i) => (
                    <Toggle
                        key={i}
                        size="lg"
                        pressed={option.preesed}
                        onPressedChange={option.onClick}
                    >
                        {option.icon}
                    </Toggle>
                ))}
            </div>
        </div>
    );
}