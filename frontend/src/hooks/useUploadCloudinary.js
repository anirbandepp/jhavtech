import axios from 'axios';
import { useState } from 'react';

function useUploadCloudinary() {

    // *** State for employees data, loading, and error
    const [imageURL, setImageURL] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);

    // *** Upload Image Handler
    const uploadImageHook = async (file) => {
        try {
            setImageUploading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
            formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

            const { data } = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
            setImageURL(data?.secure_url);
            setImageUploadError(null);
        } catch (err) {
            console.log(err);
            setImageUploadError(err?.message);
            setImageURL('');
        } finally {
            setImageUploading(false);
        }
    };

    return { imageURL, imageUploading, imageUploadError, uploadImageHook };
}

export default useUploadCloudinary;