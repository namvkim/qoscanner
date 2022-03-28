import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import MenuDataService from "../services/menu.service";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Stack,
  Select,
} from "@mui/material";

import { useFormik } from "formik";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as Yup from "yup";
import DialogComponent from "./DialogComponent";

const FormAddMenu = ({ id, setMenuId }) => {
  const [image, setImage] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState();
  const [categories, setCategories] = useState([]);
  const resCollectionRef = collection(db, "restaurant");
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    const idRestaurant = auth.currentUser.uid;
    onSnapshot(
      collection(resCollectionRef, idRestaurant, "category"),
      (snapshot) => {
        let result = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        result.sort((a, b) => b.createAt - a.createAt);
        setCategories(result);
      }
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      image: "",
      name: "",
      price: "",
      category: "",
      description: "",
      status: true,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên món ăn"),
      price: Yup.number().required("Nhập giá món ăn"),
      category: Yup.string().required("Chọn danh mục món ăn"),
      description: Yup.string().required("Nhập mô tả sản phẩm"),
    }),

    onSubmit: (values) => {
      const timestamp = new Date();

      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "images/" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newMenu = {
              status: true,
              name: values.name,
              price: values.price,
              category: values.category,
              description: values.description,
              image: downloadURL,
              createAt: timestamp,
            };

            try {
              if (id !== undefined && id !== "") {
                MenuDataService.updateMenu(id, newMenu);
                setMenuId("");
                setMessage({
                  type: "success",
                  message: "Cập nhật món ăn thành công!",
                });
                formik.values.image = "";
                formik.values.name = "";
                formik.values.price = "";
                formik.values.category = "";
                formik.values.description = "";
                setDialog(true);
              } else {
                MenuDataService.addMenus(newMenu);
                setMessage({
                  type: "success",
                  message: "Thêm món ăn thành công!",
                });
                formik.values.image = "";
                formik.values.name = "";
                formik.values.price = "";
                formik.values.category = "";
                formik.values.description = "";
                setDialog(true);
              }
            } catch (err) {
              setMessage({
                type: "error",
                message: err.message,
              });
              console.log(err);
              setDialog(true);
            }
          });
        }
      );
    },
  });

  const cancelData = async () => {
    formik.values.id = "";
    formik.values.name = "";
    formik.values.price = "";
    formik.values.category = "";
    formik.values.description = "";
    setLoading(!loading);
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await MenuDataService.getMenu(id);
      console.log("The record is :", docSnap.data());
      formik.values.id = docSnap.data().id;
      formik.values.name = docSnap.data().name;
      formik.values.price = docSnap.data().price;
      formik.values.category = docSnap.data().category;
      formik.values.description = docSnap.data().description;
    } catch (err) {
      setMessage({
        type: "error",
        message: err.message,
      });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div style={styles.headerAddMenu}>
        <div style={styles.headerTitle}>Tạo món</div>
        <Stack direction="row" spacing={2} alignItems="center">
          <div>John Smith</div>
          <Avatar alt="avatar restaurant" src="./images/account.jpg" />
        </Stack>
      </div>
      <form onSubmit={formik.handleSubmit} style={styles.AddFormMenu}>
        <div style={styles.AddFormHeading}>
          <TextField
            label="Nhập tên sản phẩm"
            variant="outlined"
            size="small"
            style={styles.AddFormName}
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name && formik.touched.name}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="Giá sản phẩm"
            variant="outlined"
            size="small"
            style={styles.AddFormPrice}
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            error={formik.errors.price && formik.touched.price}
            helperText={formik.touched.price && formik.errors.price}
          />

          <FormControl size="small" style={styles.AddFormCategory}>
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Danh mục"
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              error={formik.errors.category && formik.touched.category}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map((option) => (
                <MenuItem value={option.id}>{option.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={styles.AddFormDescrip}>
          <TextField
            aria-label="minimum height"
            minRows={3}
            placeholder="Mô tả sản phẩm"
            style={styles.AddFormDes}
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description && formik.touched.description}
            helperText={formik.touched.description && formik.errors.description}
          />

          <TextField
            size="small"
            type="file"
            style={styles.AddFormImage}
            id="image"
            name="image"
            onChange={handleChange}
            value={formik.values.image.name}
            error={formik.errors.image && formik.touched.image}
            helperText={formik.touched.image && formik.errors.image}
          />
        </div>

        <div style={styles.Button}>
          <Button style={styles.CancelButton} onClick={() => cancelData()}>
            Hủy
          </Button>
          &ensp;&ensp;
          <Button style={styles.AddButton} type="submit">
            {formik.values.id === "" ? "Thêm" : "Cập nhật"}
          </Button>
        </div>
      </form>
      <DialogComponent
        isOpen={dialog}
        setDialog={setDialog}
        authData={message}
      />
    </>
  );
};

const styles = {
  headerAddMenu: {
    height: "64px",
    display: "flex",
    padding: "0 15px",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: "21px",
    fontWeight: "500",
    color: "#000000",
    lineHeight: "22px",
  },

  AddFormMenu: {
    padding: "15px",
    backgroundColor: "#FFFFFF",
    margin: "16px 15px",
  },
  AddHeading: {
    backgroundColor: "#f6f8f8",
    padding: "15px 20px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  AddFormHeading: {
    padding: " 10px 200px ",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  AddFormDescrip: {
    padding: "10px 200px",
    display: "flex",
    justifyContent: "center",
  },
  AddFormName: {
    width: "40%",
    marginRight: "20px",
  },
  AddFormPrice: {
    width: "23%",
    marginRight: "20px",
  },
  AddFormCategory: {
    width: "35%",
  },
  AddFormDes: {
    width: "64.5%",
    marginRight: "20px",
    fontSize: "16px",
    fontWeight: "400",
  },
  AddFormImage: {
    width: "34.2%",
  },
  Button: {
    display: "flex",
    justifyContent: "right",
    padding: "10px 160px 10px 0px",
  },
  AddButton: {
    backgroundColor: "#28a745",
    color: "#FFFFFF",
    width: "120px",
    height: "42px",
    marginRight: "40px",
  },
  CancelButton: {
    border: "#848484 1px solid",
    color: "#848484",
    width: "120px",
    height: "42px",
  },
};
export default FormAddMenu;
