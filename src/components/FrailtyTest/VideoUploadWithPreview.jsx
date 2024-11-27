import React, { useCallback } from 'react'
import { IoMdCloudUpload } from 'react-icons/io';
import { useDropzone } from "react-dropzone";

const VideoUploadWithPreview = ({
    setSelectedFile,
    setVideoPreview,
    selectedFile,
    videoPreview,
    test,
    videos,
}) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            setVideoPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
        accept: { "video/*": [] },
    });
    return (
        <>
            {/* Video Upload Dropzone */}
            <div
                {...getRootProps()}
                className={`mt-6 p-8 border-2 border-dashed rounded-lg ${isDragActive ? "border-green-500 bg-green-100" : "border-gray-300"
                    }`}
            >
                <input {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                        <p>Drop the video here...</p>
                    ) : (
                        <>
                            <IoMdCloudUpload size={48} className="mx-auto text-pastelPurple" />
                            <p className="mt-4 text-gray-600">Drag & drop your video here, or click to select</p>
                            {selectedFile && <p className="mt-2 text-gray-600">Selected File: {selectedFile.name}</p>}
                        </>
                    )}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User's Uploaded Video */}
                {videoPreview && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg text-primary mb-2">Uploaded Video</h3>
                        <div className="p-4 rounded-lg shadow-soft">
                            <video
                                src={videoPreview}
                                controls
                                className="w-full h-64 max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
                            ></video>
                        </div>
                    </div>
                )}

                {/* Model Video */}
                {test !== "Choose Test" && selectedFile && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg text-primary mb-2">{test} Model Video</h3>
                        <div className="p-4 rounded-lg shadow-soft">
                            <video
                                src={videos[test].video}
                                controls
                                className="w-full h-64 max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
                            ></video>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default VideoUploadWithPreview
