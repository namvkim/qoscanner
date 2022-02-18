import  TextField   from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Forgot =()=>  {
        return (
            <div   style={styles.paperContainer}>
                <div   style={styles.loginForm}>
                    <div style={styles.loginFormLogin}>
                        <div style={styles.loginFormHeader}>
                            <img style={styles.loginFormLogo} alt='login-logo' src='./images/bg-login.png' />
                            <h2>QR SCANNER</h2>
                        </div>  
                        <h3>Quên mật khẩu</h3>    
                        <TextField required fullWidth   type="email" variant="standard" label="Nhập email" />
                        <div style={styles.LoginButton} >
                            <Button   style={styles.Button}  href="# "> Quên mật khẩu </Button>
                        </div>
                    </div>
                </div>  
                </div> 
        );
}


const styles = {
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
        width:'450px',
        minHeight:'400px',
        backgroundColor:'#FFFFFF',
        marginLeft:'auto',
        marginRight:'15%',        
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
};

export default Forgot;