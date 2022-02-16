import React, { Component } from 'react';
import  TextField   from "@mui/material/TextField";
import Button from '../components/button';

const styles = {
    paperContainer: {
        minHeight: 1024,
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundImage: `url(${"./images/bg-login.png"})`,
    },

    TextFieldStyle: {
        width: '430px',
    },

    Margin :{
        margin:'20px',
    }
};
class Forgot extends Component {
    
    render() {
        return (
            <div className='login-container' style={styles.paperContainer}>
                <div className='login-form'>
                    <div className='login-form-header'>
                        <img className='login-logo' alt='login-logo' src='./images/bg-login.png' />
                        <h2>QR SCANNER</h2>
                    </div>
                    <h3>Quên mật khẩu</h3>
                    
                    <TextField  required style={styles.TextFieldStyle}   id="standard-basic" label="Nhập số điện thoại" type="number" variant="standard" />
                    <br/>
                    <div className="btn-center" style={styles.Margin}>
                        <Button title="Quên mật khẩu" />
                    </div>
                </div>  
                </div> 
        );
    }
}

export default Forgot;