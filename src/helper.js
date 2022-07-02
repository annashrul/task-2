import { message } from "antd";
import "antd/dist/antd.css";

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getPropsUpload = (fileList, callback) => {
  return {
    name: "file",
    multiple: false,
    onRemove: (file) => {
      callback([]);
    },
    beforeUpload: (file) => {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        callback([file]);
        return false;
      } else {
        message.error(`Silahkan Upload Gambar Sesuai Dengan Ketentuan`);
        return false;
      }
    },
    fileList,
  };
};
