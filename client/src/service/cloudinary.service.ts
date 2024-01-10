import axios from "axios";

    const upfileClodinary = async (valueImgFile: File) => {
        const formData = new FormData();
        formData.append("file", valueImgFile);
        formData.append("upload_preset", "dinoEnglish");
        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dlb1ac5xw/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (error: unknown) {
            throw new Error(error);
        }
    };


export {
    upfileClodinary
}