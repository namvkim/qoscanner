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
import { Alert, autocompleteClasses } from "@mui/material";
import {storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MenuDataService from "../services/menu.service";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import Select from '@mui/material/Select';
import * as Yup from "yup";

const FormAddMenu = ({ id, setMenuId }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imgURL, setImgURL] = useState(null);
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    

    const categories = [
        {
          value: 'USD',
          label: 'Món khai vị',
        },
        {
          value: 'EUR',
          label: 'Món tráng miệng',
        },
        {
          value: 'BTC',
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
            image: '',
            name: '',
            price: '',
            category: '',
            description: '',
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
      const storageRef = ref(storage, 'pictures/' + values.image);
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
                setMessage({ error: false, msg: "Updated successfully!" });
              } else {
                MenuDataService.addMenus(newMenu);
                setMessage({ error: false, msg: "New Menu added successfully!" });
              }
            } catch (err) {
              setMessage({ error: true, msg: err.message });
            }
            
          });
        }
      );
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImgURL("");
            signInWithEmailAndPassword(auth, values.image, values.name, values.price, values.category, values.description)
                .then((userCredential) => {
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    });
    const editHandler = async () => {
      setMessage("");
      try {
        const docSnap = await MenuDataService.getMenu(id);
        console.log("The record is :", docSnap.data());
        setName(docSnap.data().name);
        setPrice(docSnap.data().price);
        setCategory(docSnap.data().category);
        setDescription(docSnap.data().description);
        setImage(docSnap.data().imgURL);  
      } catch (err) {
        setMessage({ error: true, msg: err.message });
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
                <div id="title-add-menu"  style={styles.headerAddTitle}>
                    Tạo menu
                </div>
                
                <div style={styles.headerInfo}>
                    <div>John Smith</div>
                    <ArrowDropDownSharpIcon/>
                  
                    &ensp;
                    <img style={styles.accountLogo} alt='account-logo' src='./images/account.jpg' />
                </div>
            </div>
          
            <div style={styles.AddForm}>
              {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
            {message?.msg}
            </Alert>
          )}
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
            </div>
           
        </>

    );
};

const styles = {
    headerAddMenu: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        backgroundColor: '#fff',   
    },
 
    headerAddTitle: {
        fontSize: '22px',
        fontWeight: '500',
        lineHeight: '22px',
        padding: '0 0 0 15px',
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: '40px'
    },
    headerIcon: {
        marginLeft: '10px',
    },
    accountLogo: {
        height: '41px',
        borderRadius: '41px',
    },
    AddForm: {
        backgroundColor: '#E5E5E5',
        border: '1px solid rgba(0,0 ,0 , 0.01)'

    },
    AddFormMenu: {
      backgroundColor: 'white',
      margin: '15px',
      
    
    },
    AddHeading: {
        backgroundColor: '#f6f8f8',
        padding: '15px 20px',
        fontSize: '18px',
        fontWeight:'bold',
    },
    
    AddFormHeading: {
      padding: ' 10px 65px', 
      
    },
    AddFormDescrip: {
      padding: '10px 65px', 
    },
    AddFormName: {
      width: '30%',
      marginRight: '20px',
     
    },
    AddFormPrice: {
      width: '15%',
      marginRight: '20px',
     
    },
    AddFormCategory: {
      width: '21%',
      marginRight: '20px',
    },
    AddFormDes: {
      width: '46.2%',
      marginRight: '20px',
      fontSize: '16px',
      fontWeight: '400',
    },
    AddFormImage: {
      width: '21%',
    },
    Button: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 10px',
    },
    AddButton: {      
        backgroundColor: '#307DD2',
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

