import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useFormik } from "formik";
import {useState} from 'react';

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { flexbox } from "@mui/system";
import { blue } from "@mui/material/colors";
import { colors } from "@mui/material";

const FormAddMenu = () => {
    const navigate = useNavigate();
    
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
        <div style={styles.paperContainer}>
            <div style={styles.headerAddMenu}>
                <div id="title-add-menu"><h4>Tạo menu</h4></div>
                <div style={styles.account}>
                    <div style={styles.accountName}>John Smith</div>
                    &ensp;
                    <img style={styles.accountLogo} alt='account-logo' src='./images/account.jpg' />
                </div>
            </div>
            <hr></hr>
            <div style={styles.AddForm}>
                <form style={styles.AddFormMenu} onSubmit={formik.handleSubmit}>
                    <h4>Thêm sản phẩm</h4>
                    <div style = {styles.image}>
                    <InputLabel id="image">Hình ảnh</InputLabel>
                    <FormControl sx={{ minWidth: 150 }}>
                        <TextField
                            required
                            fullWidth
                            id="image"
                            name="image"
                            type='file'
                            border = "hidden"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                            error={false}
                            helperText={false ? "fererjka" : " "}
                        />
                    </FormControl>
                    
                    
                    </div>
                    <div style={styles.row2}>
                        <div>
                            <InputLabel id="name">Tên sản phẩm</InputLabel>
                            <FormControl sx={{ width: 600 }}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                type='text'
                                placeholder="Nhập tên sản phẩm"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={false}
                                helperText={false ? "fererjka" : " "}
                            />
                            </FormControl>
                        </div>
                        &ensp;&ensp;
                        <div>
                            <InputLabel id="price">Giá</InputLabel>
                            <FormControl sx={{ width: 210 }}>
                                <TextField
                                    variant="outlined"
                                    required
                                    id="price"
                                    name="price"
                                    type='number'
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
                            <FormControl sx={{ width: 210 }}>
                                <Select
                                    variant="outlined"
                                    required
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    >
                                    <MenuItem value={10}>Món khai vị</MenuItem>
                                    <MenuItem value={20}>Đồ uống</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    
                    
                    </div>
                    <InputLabel id="desciption" variant="standard">Mô tả</InputLabel>
                    <TextareaAutosize
                        style={{ width: 600}}
                        minRows={5}/>
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
    },

    accountLogo: {
        height: '41px',
        borderRadius: '41px',
    },
    accountName: {
        marginTop: '10px',
    },

    account: {
        marginLeft: '82%',
        marginTop: '15px',
        display: 'flex',
    },
    row2: {
        display: 'flex',
    },
    Button: {
        display: 'flex',
        justifyContent: 'right',
        marginRight: '10px',
    },
    AddButton: {
        border: '#848484 1px solid',
        backgroundColor: '#307DD2',
        color: '#FFFFFF',
        width: '80px',
        height: '30px',
        
    },
    CancelButton:{
        border: '#848484 1px solid',
        color: '#848484',
        width: '80px',
        height: '30px',
    }
};
export default FormAddMenu;