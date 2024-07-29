"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing"
import  { ourFileRouter } from "@/app/api/uploadthing/core"; 

interface fileUploadProps {
    onChange: (url?: string ) => void
    endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({
    onChange,
    endpoint
}: fileUploadProps) => {
    return(
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`,
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                          }
                    })
            }}
        />
    )
}