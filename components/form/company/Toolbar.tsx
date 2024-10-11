"use client";

import { ToolbarProps } from "@/types/pitch";
import HeadingTool from "./tool-elements/HeadingTool";
import StarterKitTool from "./tool-elements/StarterKitTool";


export function Toolbar({ editor }: ToolbarProps) {
    if (!editor) return null;

    return (
        <div className="border border-black bg-transparent rounded-md">
            <HeadingTool editor={editor} size="lg" level={1} />
            <HeadingTool editor={editor} size="lg" level={2} />
            <HeadingTool editor={editor} size="lg" level={3} />
            <HeadingTool editor={editor} size="lg" level={4} />
            <HeadingTool editor={editor} size="lg" level={5} />
            <HeadingTool editor={editor} size="lg" level={6} />

            <StarterKitTool editor={editor} size="lg" type="bold" />
            <StarterKitTool editor={editor} size="lg" type="italic" />
            <StarterKitTool editor={editor} size="lg" type="strike" />
            <StarterKitTool editor={editor} size="lg" type="bulletList" />
            <StarterKitTool editor={editor} size="lg" type="orderedList" />
        </div>
    )
}