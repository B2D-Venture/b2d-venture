"use client";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from '@/src/utils/uploadthing';
import { useState, useEffect } from 'react';
import { FaRegFileLines, FaEye } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { useFormContext } from "react-hook-form";
import { getDataRoomByCompanyId } from "@/lib/db/index";

interface PdfFile {
    name: string;
    size: number;
    key: string;
    lastModified: number;
    serverData: any;
    url: string;
}

const getDocument = async () => {
    return await getDataRoomByCompanyId(30);
};

const Document = ({ canEdit }: { canEdit: boolean }) => {
    const { setValue } = useFormContext();

    const [pdfSrc, setPdfSrc] = useState<PdfFile[]>([]);

    const handleRemovePdf = (key: string) => {
        setPdfSrc((prev) => prev.filter(pdf => pdf.key !== key));
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            if (canEdit) {
                const documents = await getDocument();
                setPdfSrc(documents.map(doc => ({
                    name: doc.documentName,
                    size: 0,
                    key: doc.id.toString(),
                    lastModified: new Date(doc.uploadDate).getTime(),
                    serverData: doc,
                    url: doc.documentUrl,
                })));
            } else {
                setPdfSrc([]);
            }
        };
        fetchDocuments();
    }, [canEdit]);

    return (
        <div>
            <span className="flex">
                <h2 className="text-3xl text-gray-700">Documentations</h2>
                <p className="text-[12px] text-gray-500 ml-2 flex flex-col-reverse">(optional)</p>
            </span>
            <Label htmlFor="Documentations" className="text-gray-500">Can upload PDF files only.</Label>

            <div>
                {pdfSrc.length > 0 ? (
                    pdfSrc.map((pdf) => (
                        <div key={pdf.key} className="flex bg-[#eeee] border-2 border-dotted border-black rounded-lg my-2">
                            <div className="text-2xl w-16 h-14 flex items-center justify-center">
                                <FaRegFileLines />
                            </div>
                            <div className="flex-1 my-2">
                                <p className="font-semibold">{pdf.name}</p>
                                {pdf.size > 0 && <p className="text-gray-500 text-sm">{(pdf.size / 1024).toFixed(2)} KB</p>}
                            </div>
                            <a
                                href={`${pdf.url}`}
                                target="_blank"
                                className="text-xl hover:underline flex items-center justify-center mx-6"
                            >
                                <FaEye />
                            </a>
                            <div className="flex items-center justify-center mx-5">
                                <CiCircleRemove
                                    className="text-3xl cursor-pointer"
                                    onClick={() => handleRemovePdf(pdf.key)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No PDF files uploaded</p>
                )}
            </div>

            <div className="flex justify-start">
                <UploadDropzone
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                            const uploadedFiles = res.map(file => ({
                                name: file.name,
                                size: file.size,
                                key: file.key,
                                lastModified: file.lastModified ?? Date.now(), // Provide a default value if undefined
                                serverData: file.serverData,
                                url: file.url,
                            }));
                            setPdfSrc(prev => [...prev, ...uploadedFiles]);
                            setValue("document", { pdfs: uploadedFiles });
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log("error", error);
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
        </div>
    );
};

export default Document;
