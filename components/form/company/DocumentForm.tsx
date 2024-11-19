"use client";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from '@/src/utils/uploadthing';
import { useState, useEffect } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { useFormContext } from "react-hook-form";
import { getDataRoomByCompanyId } from "@/lib/db/index";
import DocumentBox from "../elements/DocumentBox";
import { PdfFile } from "@/types/form/index.d";


interface DocumentProps {
    canEdit: boolean;
    companyId: number;
}

const DocumentForm = ({ canEdit, companyId }: DocumentProps) => {
    const { setValue } = useFormContext();
    const [pdfSrc, setPdfSrc] = useState<PdfFile[]>([]);

    const handleRemovePdf = (identifier: string | number) => {
        setPdfSrc((prev) => {
            const updatedPdfs = prev.filter((pdf) =>
                pdf.id ? pdf.id !== identifier : pdf.key !== identifier
            );
            setValue("document", { pdfs: updatedPdfs });
            return updatedPdfs;
        });
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            if (canEdit) {
                const documents = await getDataRoomByCompanyId(companyId);
                const transformedDocuments = documents ? documents.map(doc => ({
                    name: doc.documentName,
                    size: doc.documentSize,
                    key: doc.id.toString(),
                    lastModified: new Date(doc.uploadDate).getTime(),
                    serverData: doc,
                    url: doc.documentUrl,
                })) : [];
                setPdfSrc(transformedDocuments);
                setValue("document", { pdfs: transformedDocuments }); 
            } else {
                setPdfSrc([]);
            }
        };
        fetchDocuments();
    }, [canEdit, companyId, setValue]);

    return (
        <div className="text-black">
            <span className="flex">
                <h2 className="text-3xl text-gray-700">Documentations</h2>
                <p className="text-[12px] text-gray-500 ml-2 flex flex-col-reverse">(optional)</p>
            </span>
            <Label htmlFor="Documentations" className="text-gray-500">Can upload PDF files only.</Label>

            <div>
                {pdfSrc.length > 0 ? (
                    pdfSrc.map((pdf, index) => (
                        <DocumentBox
                            key={index}
                            doc={pdf}
                            canRemoved={
                                <div className="flex items-center justify-center mx-5">
                                    <CiCircleRemove
                                        className="text-3xl cursor-pointer"
                                        onClick={() => handleRemovePdf(pdf.key)}
                                    />
                                </div>
                            }
                        />

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
                            setPdfSrc(prev => {
                                const updatedPdfs = [...prev, ...uploadedFiles];
                                setValue("document", { pdfs: updatedPdfs });
                                return updatedPdfs;
                            });
                        }
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
        </div>
    );
};

export default DocumentForm;
