import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useFormik } from "formik";
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import {storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MenuDataService from "../services/menu.service";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import * as Yup from "yup";
import DialogComponent from "./DialogComponent";

const FormAddMenu = ({ id, setMenuId }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [dialog, setDialog] = useState(false);  
    
    const [message, setMessage] = useState();

    const categories = [
        {
          value: 'Món khai vị',
          label: 'Món khai vị',
        },
        {
          value: 'Món tráng miệng',
          label: 'Món tráng miệng',
        },
        {
          value: 'Món dùng',
          label: 'Món dùng',
        },
       
      ];
      const handleChange = e => {
        if(e.target.files[0]) { 
          setImage(e.target.files[0]);
        }
      }
    // const handleChange = (e) => {
    //     setCategory(e.target.value);
      
    // };
    const formik = useFormik({
        initialValues: {
            id:'',
            image: '',
            name: '',
            price: '',
            category: '',
            description: '',
            status: true,
        },

        validationSchema: Yup.object({
          name: Yup.string()
            .required("Nhập tên món ăn"),
          price: Yup.number()
            .required("Nhập giá món ăn"), 
          category: Yup.string()
            .required("Chọn danh mục món ăn"),
          description: Yup.string()
           
            .required("Nhập mô tả sản phẩm"),
      }),

      onSubmit: values => {
        console.log(values);
                   // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            const newMenu = {
              status: true,
              name:values.name,
              price:values.price,
              category:values.category,
              description: values.description,
              image: downloadURL,
            };
            console.log(newMenu);
            try {
              if (id !== undefined && id !== "") {
                MenuDataService.updateMenu(id, newMenu);
                setMenuId("");
                setMessage({ 
                  type: "success",
                  path: "/CreateMenu",
                  message: "Updated successfully!" 
                });
                setDialog(true);
              } else {
                MenuDataService.addMenus(newMenu);
                setMessage({ 
                  type: "success",
                  path: "/CreateMenu",
                  message: "New Menu added successfully!" 
                });
                setDialog(true);
              }
            } catch (err) {
              setMessage({ 
                type: "error",
                message: err.message });
              setDialog(true);
            }
            
          });
        }
      );
        
         
        }
    });
    
    const editHandler = async () => {
      setMessage("");
      try {
        const docSnap = await MenuDataService.getMenu(id);
        console.log("The record is :", docSnap.data());
        console.log(docSnap.data().image);
        formik.values.id = docSnap.data().id;
        formik.values.name = docSnap.data().name;
        formik.values.price = docSnap.data().price;
        formik.values.category = docSnap.data().category;
        formik.values.description = docSnap.data().description;
        formik.values.image.name = docSnap.data().image;
        
      } catch (err) {
        setMessage({ 
          type: "error", 
          message: err.message });
      }
    };
  
    useEffect(() => {
      console.log("The id here is : ",id);
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
                      helperText={  formik.touched.name && formik.errors.name}
                     
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
                      helperText={ formik.touched.price  && formik.errors.price}
                    
                    />
              
                    <FormControl size="small"  style={styles.AddFormCategory}>
                      <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Danh mục"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        error={formik.errors.category && formik.touched.category}
                        helperText={  formik.touched.category && formik.errors.category}
                       
                      >
                       {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
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
                        helperText={   formik.touched.description && formik.errors.description}
                        
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
                        helperText={  formik.touched.image && formik.errors.image}
                       
                    />
                  </div>

                    <div style={styles.Button} >
                        <Button style={styles.CancelButton} type="submit"> Hủy </Button>
                        &ensp;&ensp;
                        <Button style={styles.AddButton} type="submit"> Thêm </Button>
                    </div>
            </form>
            <DialogComponent isOpen={dialog} setDialog={setDialog} authData={message} />
           
        </>

    );
};

const styles = {
    headerAddMenu: {
      height:'64px',
      display: 'flex',
      padding: '0 15px',
      backgroundColor:'#FFFFFF',
      alignItems:'center',
      justifyContent:'space-between',
    },
    headerTitle: {
        fontSize:'21px',
        fontWeight:'500',
        color:'#000000',
        lineHeight: '22px'
    },
  
    AddFormMenu: { 
      padding: '15px',
      backgroundColor:'#FFFFFF',
      margin:'16px 15px',
    },
    AddHeading: {
        backgroundColor: '#f6f8f8',
        padding: '15px 20px',
        fontSize: '18px',
        fontWeight:'bold',
    },
    
    AddFormHeading: {
      padding: ' 10px 200px ', 
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      
    },
    AddFormDescrip: {
      padding: '10px 200px', 
      display: 'flex',
      justifyContent: 'center',
    },
    AddFormName: {
      width: '40%',
      marginRight: '20px',
     
    },
    AddFormPrice: {
      width: '25%',
      marginRight: '20px',
     
    },
    AddFormCategory: {
      width: '35%',
      
    },
    AddFormDes: {
      width: '64.5%',
      marginRight: '20px',
      fontSize: '16px',
      fontWeight: '400',
    },
    AddFormImage: {
      width: '34.2%',
    },
    Button: {
        display: 'flex',
        justifyContent: 'right',
        padding: '10px 160px 10px 0px',
    },
    AddButton: {      
        backgroundColor: '#28a745',
        color: '#FFFFFF',
        width: '120px',
        height: '42px',
        marginRight: '40px',
    },
    CancelButton: {
        border: '#848484 1px solid',
        color: '#848484',
        width: '120px',
        height: '42px',
    }
};
export default FormAddMenu;

