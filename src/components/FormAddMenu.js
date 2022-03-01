import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useFormik } from "formik";
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Alert } from "@mui/material";
import {storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProductDataService from "../services/product.service";

const FormAddMenu = ({ id, setProductId }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const [category, setCategory] = React.useState('');

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
    const handleChange = (e) => {
        setCategory(e.target.value);
        if(e.target.files[0]) { 
            setImage(e.target.files[0]);
          }
    };
    const formik = useFormik({
        initialValues: {
            image: '',
            name: '',
            price: '',
            category: '',
            desciption: '',
        },

        onSubmit: values => {
            signInWithEmailAndPassword(auth, values.image, values.name, values.price, values.category, values.desciption)
                .then((userCredential) => {
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (name === "" || price === "" || category === "" || image === null || description === null) {
          setMessage({ error: true, msg: "All fields are mandatory!" });
          return;
        }
      
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
                const newProduct = {
                  name:name,
                  price: price,
                  category: category,
                  descrition: description,
                  image: downloadURL,
                };
                console.log(newProduct);
                try {
                  if (id !== undefined && id !== "") {
                    ProductDataService.updateProduct(id, newProduct);
                    setProductId("");
                    setMessage({ error: false, msg: "Updated successfully!" });
                  } else {
                    ProductDataService.addProducts(newProduct);
                    setMessage({ error: false, msg: "New Product added successfully!" });
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
      };
      
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ProductDataService.getProduct(id);
      console.log("The record is :", docSnap.data());
      setName(docSnap.data().name);
      setPrice(docSnap.data().price);
      setCategory(docSnap.data().category);
      setDescription(docSnap.data().desciption);
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
        <div style={styles.paperContainer}>
            
            <div style={styles.headerAddMenu}>
                <div id="title-add-menu"  style={styles.headerAddTitle}>
                    Tạo menu
                </div>
                <div style={styles.headerInfo}>
                    <div>John Smith</div>
                    <i class="fas fa-angle-down" style={styles.headerIcon} > </i>
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
                <form style={styles.AddFormMenu} onSubmit={formik.handleSubmit}>
                    <div style={styles.AddHeading}>Thêm sản phẩm</div>
                    <div style={styles.AddRow2}>
                        <div >
                            <InputLabel id="name" style={styles.tensp}>Tên sản phẩm</InputLabel>
                            
                            <FormControl sx={{ width:  600, marginTop: 1}}>
                                <TextField
                                    required
                                    size="small"
                                    name="name"
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </FormControl>
                        </div>
                        &ensp;&ensp;
                        <div>
                            <InputLabel id="price">Giá</InputLabel>
                            <FormControl sx={{ width:  210, marginTop: 1 }}>
                                <TextField
                                    variant="outlined"
                                    required
                                    id="price"
                                    name="price"
                                    type='number'
                                    size="small"
                                    placeholder="Nhập giá sản phẩm"
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    error={false}
                                    helperText={false ? "fererjka" : " "}
                                />
                            </FormControl>
                        </div>
                        &ensp;&ensp;
                        <div>
                            <InputLabel htmlFor="uncontrolled-native">Danh mục</InputLabel>
                            <FormControl sx={{ width: 210, marginTop: 1 }}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    value={category}
                                    onChange={handleChange}
                                    size="small"
                                    name="category"
                                    SelectProps={{
                                        native: true,
                                    }}
                                   
                                    variant="outlined"
                                    >
                                    {categories.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </FormControl>
                        </div>
                    </div>
                    <div style={styles.AddRow3}>
                        <div>
                            <InputLabel id="desciption" >Mô tả sản phẩm</InputLabel>
                            <TextareaAutosize
                                style={{ width:  600, marginTop: "7px" }}
                                minRows={5} 
                                name="description"
                                
                                />&ensp;&ensp;
                        </div>
                        <div>
                            <InputLabel id="image">Hình ảnh</InputLabel>
                            <FormControl sx={{ width:  300, border: "white" , marginTop: 1}}>
                                <TextField
                                    required
                                    fullWidth
                                    id="image"
                                    name="image"
                                    type='file'
                                    onChange={formik.handleChange}
                                    value={formik.values.image}
                                    error={false}
                                    helperText={false ? "fererjka" : " "}
                                />
                            </FormControl></div>

                    </div>

                    <div style={styles.Button} >
                        <Button style={styles.CancelButton} type="submit"> Hủy </Button>
                        &ensp;&ensp;
                        <Button style={styles.AddButton} type="submit"> Thêm </Button>
                    </div>
                </form>
            </div>
            <hr></hr>
        </div>

    );
};

const styles = {
    paperContainer: {
        backgroundColor: '#FFFFFF',
        marginLeft: 'auto',
        marginLeft: '25%',
    },

    headerAddMenu: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        
    },
    headerAddTitle: {
        fontSize: '22px',
        fontWeight: '500',
        lineHeight: '30px',

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

    AddHeading: {
        backgroundColor: '#f6f8f8',
        padding: '15px 20px',
        fontSize: '18px',
        fontWeight:'bold',
    },
    
   

    AddRow2: {
        display: 'flex',
        padding: '20px 20px 0 20px',
       
    },


    AddRow3: {
        display: 'flex',
        padding: '15px 20px',
        
      
    },
    Button: {
        display: 'flex',
        justifyContent: 'right',
        marginTop: '10px',
        
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


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function FormAddMenu() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           label="Size"
//           id="outlined-size-small"
//           defaultValue="Small"
//           size="small"
//         />
//         <TextField label="Size" id="outlined-size-normal" defaultValue="Normal" />
//       </div>
//       <div>
//         <TextField
//           label="Size"
//           id="filled-size-small"
//           defaultValue="Small"
//           variant="filled"
//           size="small"
//         />
//         <TextField
//           label="Size"
//           id="filled-size-normal"
//           defaultValue="Normal"
//           variant="filled"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Size"
//           id="standard-size-small"
//           defaultValue="Small"
//           size="small"
//           variant="standard"
//         />
//         <TextField
//           label="Size"
//           id="standard-size-normal"
//           defaultValue="Normal"
//           variant="standard"
//         />
//       </div>
//     </Box>
//   );
// }