import React, { Component } from 'react';
import  TextField   from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '../components/button';

const styles = {
    paperContainer: {
        minHeight:'1024px',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundImage: `url(${"./images/bg-login.png"})`,
    },

    TextFieldStyle: {
        width: '430px',
    }
};
class Login extends Component {
    
    render() {
        return (
            <div className='login-container' style={styles.paperContainer}>
                <div className='login-form'>
                    <div className='login-form-header'>
                        <img className='login-logo' alt='login-logo' src='./images/bg-login.png' />
                        <h2>QR SCANNER</h2>
                    </div>
                    <h3>Đăng nhập</h3>
                    <TextField  required style={styles.TextFieldStyle}   id="standard-basic" label="Số điện thoại" type="number" variant="standard" />
                    <br />
                    <TextField required style={styles.TextFieldStyle}   id="standard-basic" label="Mật khẩu" type="password" variant="standard" />
                    <div className='login-form-bottom'>
                        <FormControlLabel control={<Checkbox  />} label="Ghi nhớ tôi" />
                        <FormControlLabel sx={{color:'#ECA64E' }} control={<Link />} label="Quên mật khẩu?" >  
                            </FormControlLabel>
                    </div>
                    <div className="btn-center">
                        <Button title="Đăng nhập"/>
                    </div>
                    <div className='login-form-bottom'>
                        <p>Bạn chưa có tài khoản ? <FormControlLabel sx={{ m:1 , color:'#ECA64E' }} control={<Link />} label=" Đăng ký?" >
                            </FormControlLabel></p>
                    </div>
                </div>  
                </div> 
        );
    }
}

export default Login;