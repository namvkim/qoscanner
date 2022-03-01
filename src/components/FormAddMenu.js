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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Alert, autocompleteClasses } from "@mui/material";
import {storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProductDataService from "../services/product.service";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

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
            <div style={styles.headerHeading}>
                  Thêm Món
            </div>
            <div style={styles.AddForm}>
              <form onSubmit={formik.handleSubmit}>
                  <div style={styles.AddFormHeading}>
                    <TextField id="outlined-basic" label="Nhập tên sản phẩm" variant="outlined"  style={styles.AddFormName} />
                    <TextField id="outlined-basic" label="Giá sản phẩm" variant="outlined" style={styles.AddFormPrice} />
                    <TextField
                      id="outlined-select-category"
                      select
                      label="Danh mục sản phẩm"
                      value={category}
                      onChange={handleChange}
                      style={styles.AddFormCategory}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div> 
                  <div style={styles.AddFormDescrip}>
                    <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Mô tả sản phẩm"
                    style={styles.AddFormDes}
                    />

                    <TextField
                      name="upload-photo"
                      type="file"
                      style={styles.AddFormImage}
                    />
                  </div>

                    <div style={styles.Button} >
                        <Button style={styles.CancelButton} type="submit"> Hủy </Button>
                        &ensp;&ensp;
                        <Button style={styles.AddButton} type="submit"> Thêm </Button>
                    </div>
                </form>
            </div>
            <div style={{borderBottom: "2px solid #e8e8e8", marginTop: "20px"}}></div>
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
    headerHeading: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 30px',
      backgroundColor: '#F6F8F8',
      fontSize: '18px',
      fontWeight: '550',
      border: '1px solid #e8e8e8', 
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

    AddHeading: {
        backgroundColor: '#f6f8f8',
        padding: '15px 20px',
        fontSize: '18px',
        fontWeight:'bold',
    },
    AddFormHeading: {
      padding: '25px', 
      
    },
    AddFormDescrip: {
      padding: '25px', 
    },
    AddFormName: {
      width: '35%',
      marginRight: '20px',
     
    },
    AddFormPrice: {
      width: '20%',
      marginRight: '20px',
     
    },
    AddFormCategory: {
      width: '20%',
      marginRight: '20px',
    },
    AddFormDes: {
      width: '46%',
      marginRight: '20px',
      fontSize: '16px',
      fontWeight: '400',
    },
    AddFormImage: {
      width: '30.5%',
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