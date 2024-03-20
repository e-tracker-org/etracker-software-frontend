import request from 'umi-request';
import { API_URL, USER_TOKEN } from '../config/config';

// Function to upload an image
export async function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await request(`${API_URL}/images/upload-image`, {
            method: 'post',
            data: formData,
            headers: {
                Authorization: USER_TOKEN,
            },
            requestType: 'form',
        });
        return response;
    } catch (error) {
        // Handle any errors that occur during the upload process
        console.error('Error uploading image:', error);
        throw new Error('Error uploading image');
    }
}
