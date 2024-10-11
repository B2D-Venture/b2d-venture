import React from 'react'
import { Toggle } from "@/components/ui/toggle";
import { HeadingToolProps } from "@/types/pitch";
import {
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
} from "lucide-react"

const HeadingTool = ({ editor, size, level }: HeadingToolProps ) => {
    if (!editor) return null;

    return (
        <Toggle
            size={size}
            pressed={editor.isActive("heading")}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
            {level === 1 && <Heading1 className="h-4 w-4" />}
            {level === 2 && <Heading2 className="h-4 w-4" />}
            {level === 3 && <Heading3 className="h-4 w-4" />}
            {level === 4 && <Heading4 className="h-4 w-4" />}
            {level === 5 && <Heading5 className="h-4 w-4" />}
            {level === 6 && <Heading6 className="h-4 w-4" />}
        </Toggle>
    )
}

export default HeadingTool