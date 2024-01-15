import { useEffect, useState } from "react";

const useInputMultiple = () => {
  const [valueArrImg, setValueArrImg] = useState([] as any);
  const [arrImgView, setArrImgView] = useState([] as any);
  const [errorImg, setError] = useState("");
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      setError("Bạn chưa chọn ảnh");
      return;
    }
    const fileView = e.currentTarget.files;
    console.log(fileView);
    setValueArrImg([...fileView]);

    // setArrImgView(newImageUrls);

    // setAvatarView(URL.createObjectURL(fileView));
    // if (!allowedTypes.includes(fileView?.type)) {
    //   setError("Chỉ sử dụng ảnh kiểu JPEG, PNG, GIF");
    // }
  };

  useEffect(() => {
    const newImageUrls: any = [];
    valueArrImg.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setArrImgView(newImageUrls);
    console.log("valueArrImg", valueArrImg);
    console.log("arrImgView", arrImgView);
    return () => {
      arrImgView.forEach((image: any) => URL.revokeObjectURL(image));
    };
  }, [valueArrImg]);

  return {
    arrImgView,
    onChange,
    errorImg,
  };
};
export default useInputMultiple;
