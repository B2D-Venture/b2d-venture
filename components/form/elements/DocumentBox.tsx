import React from 'react'
import { FaRegFileLines, FaEye } from "react-icons/fa6";

interface DocumentProps {
    id?: number;
    name: string;
    size: number;
    key: string;
    lastModified: number;
    serverData: any;
    url: string;
}

interface DocumentBoxProps {
    doc: DocumentProps;
    canRemoved?: React.ReactNode;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ doc, canRemoved }) => {
    return (
        <div key={doc.key} className="flex bg-[#eeee] border-2 border-dotted border-black rounded-lg my-2">
            <div className="text-2xl w-16 h-14 flex items-center justify-center">
                <FaRegFileLines />
            </div>
            <div className="flex-1 my-2">
                <p className="font-semibold">{doc.name}</p>
                {doc.size > 0 && <p className="text-gray-500 text-sm">{(doc.size / 1024).toFixed(2)} KB</p>}
            </div>
            <a
                href={`${doc.url}`}
                target="_blank"
                className="text-xl hover:underline flex items-center justify-center mx-6"
            >
                <FaEye />
            </a>
            {canRemoved && <div className="flex items-center justify-center mx-5">{canRemoved}</div>}
        </div>
    )
}

export default DocumentBox