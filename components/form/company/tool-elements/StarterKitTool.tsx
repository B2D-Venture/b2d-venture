import React from 'react'
import { Toggle } from "@/components/ui/toggle";
import { StarterKitToolProps } from "@/types/pitch";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
} from "lucide-react"

const StarterKitTool = ({ editor, size, type }: StarterKitToolProps ) => {
    if (!editor) return null;

    const handleToggle = () => {
        editor.chain().focus();
        if (type === "bold") editor.chain().toggleBold().run();
        else if (type === "italic") editor.chain().toggleItalic().run();
        else if (type === "strike") editor.chain().toggleStrike().run();
        else if (type === "bulletList") editor.chain().toggleBulletList().run();
        else if (type === "orderedList") editor.chain().toggleOrderedList().run();
    };

    return (
        <Toggle
            size={size}
            pressed={editor.isActive(type)}
            onPressedChange={handleToggle}
        >
            {type === "bold" && <Bold className="h-4 w-4" />}
            {type === "italic" && <Italic className="h-4 w-4" />}
            {type === "strike" && <Strikethrough className="h-4 w-4" />}
            {type === "bulletList" && <List className="h-4 w-4" />}
            {type === "orderedList" && <ListOrdered className="h-4 w-4" />}
        </Toggle>
    )
}

export default StarterKitTool