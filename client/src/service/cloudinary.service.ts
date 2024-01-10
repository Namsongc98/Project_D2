import axios from "axios";

const upfileClodinary = async (valueImgFile: File) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const formData = new FormData();
  formData.append("file", valueImgFile);
  formData.append("upload_preset", "dinoEnglish");
  try {
    const response = await axios.post(cloudName, formData);
    return response.data.secure_url;
  } catch (error: unknown) {
    if (typeof error === "string") throw new Error(error);
  }
};

export { upfileClodinary };
