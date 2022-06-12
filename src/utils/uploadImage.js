import axios from "axios";

const uploadImage = (e) => {
  const file = e.target.files[0];
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "pxgvk1hf");
  const res = axios.post(`${process.env.REACT_APP_CLOUDINARY_URL}`, data);
  return res;
};
export default uploadImage;
