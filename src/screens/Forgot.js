import React, { Component } from 'react';
import  TextField   from "@mui/material/TextField";
import Button from '@mui/material/Button';

const styles = {
    palette: {
        primary: {
            main: '#bed000',
        },
        secondary: {
            main: '#110b36',
        },
        error: {
            main: '#B33A3A',
        },
    },

    paperContainer: {
        display:'flex',
        alignItems: 'center',
        height:'100vh',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        backgroundSize: 'cover',  
        backgroundPosition: 'center',
        backgroundImage: `url(${"./images/bg-login.png"})`,
    },

    loginForm: {
        width:'400px',
        minHeight:'400px',
        backgroundColor:'#FFFFFF',
        marginLeft:'auto',
        marginRight:'100px',        
        borderRadius:'16px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    
    loginFormLogin: {
        width:'auto',
        height:'100%',
        margin:'20px',
    },
    
    loginFormLogo :{
        width:'100px',
        minHeight:'100px',
        borderRadius:'50%',
        marginRight:'25px',
    },

    loginFormHeader :{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },

    LoginButton :{
        display:'flex',
        justifyContent:'center',
    },

    Button:{
        marginTop:'40px',
        backgroundColor:'#ECA64E',
        color:'#FFFF',
        padding: '12px 24px',
        alignItems:'center',
        borderRadius:'37px',
        position:'center',
    },

    Loginbottom: {
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
    },
    
    LinkBtn :{
        color:'#ECA64E',
    },
};
class Forgot extends Component {
    
    render() {
        return (
            <div   style={styles.paperContainer}>
                <div   style={styles.loginForm}>
                    <div style={styles.loginFormLogin}>
                        <div style={styles.loginFormHeader}>
                            <img style={styles.loginFormLogo} alt='login-logo' src='./images/bg-login.png' />
                            <h2>QR SCANNER</h2>
                        </div>  
                        <h3>Đăng nhập</h3>    
                        {/* <TextField color={touched.Password && errors.Password ? "primary" : "secondary"} required  fullWidth  id="standard-basic" label="Số điện thoại" type="number" variant="standard" /> */}
                        <TextField required fullWidth   type="number" variant="standard" label="Nhập số điện thoại" />
                        <div style={styles.LoginButton} >
                            <Button   style={styles.Button}  href="# "> Quên mật khẩu </Button>
                        </div>
                    </div>
                </div>  
                </div> 
        );
    }
}

export default Forgot;