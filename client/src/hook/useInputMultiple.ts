import { useEffect, useState } from "react";
import { ImgageFiles } from "../type";



const useInputMultiple = () => {
  const [arrImgView, setArrImgView] = useState<ImgageFiles[]>([]);
  const [errorImg, setError] = useState("");
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) {
      setError("Bạn chưa chọn ảnh");
      return;
    }
    const fileView = e.currentTarget.files;
    const filesArray = Array.from(fileView);
    const newImageUrls: ImgageFiles[] = [];
    filesArray.forEach((image, index: number) => {
      newImageUrls.push({ id: index, error: true, url: URL.createObjectURL(image), file: image })
    });
    setArrImgView(newImageUrls)
  };

  useEffect(() => {
    const newImageUrls: ImgageFiles[] = [];
    arrImgView.forEach((image: ImgageFiles, index: number) => {
      if (!allowedTypes.includes(image.file.type)) {
        newImageUrls.push({ id: index, error: true, url: URL.createObjectURL(image.file), file: image.file })
        setError("Chỉ sử dụng ảnh kiểu JPEG, PNG, GIF");
      } else {
        newImageUrls.push({ id: index, error: false, url: URL.createObjectURL(image.file), file: image.file })
      }
    });
    if (arrImgView.length > 4) {
      setError("Chỉ được chon 5 ảnh");
    }
    setArrImgView(newImageUrls);
    return () => {
      arrImgView.forEach((image: any) => URL.revokeObjectURL(image));
      setError("")
    };

  }, [arrImgView.length]);
  return {
    arrImgView,
    onChange,
    errorImg,
    setArrImgView,
  };
};
export default useInputMultiple;
