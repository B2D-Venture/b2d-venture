import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxMessageProps {
    title: string
    description: string
    checked: boolean
    onCheckedChange: (value: boolean) => void
}


const CheckboxMessage = ({
    title,
    description,
    checked,
    onCheckedChange,
}:
    CheckboxMessageProps
) => {
    return (
        <div className="items-top flex space-x-2 m-2">
            <Checkbox id="terms1" 
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {title}
                </label>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default CheckboxMessage