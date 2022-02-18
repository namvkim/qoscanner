import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Login = () => {

    return (
        <div style={styles.paperContainer}>
            <div style={styles.loginForm}>
                <div style={styles.loginFormLogin}>
                    <div style={styles.loginFormHeader}>
                        <img style={styles.loginFormLogo} alt='login-logo' src='./images/bg-login.png' />
                        <h2>QR SCANNER</h2>
                    </div>
                    <h3>Đăng nhập</h3>
                    <TextField style={styles.field} required fullWidth name="email"
                        type="email" variant="standard" label="Email" />
                    <TextField required fullWidth sx={{ mt: 2 }} type="password" variant="standard" label="Mật khẩu" />
                    <div style={styles.loginFormCheck}>
                        <FormControlLabel control={<Checkbox />} label="Ghi nhớ tôi" />
                        <a href="/forgot" style={styles.LinkBtn}>Quên mật khẩu?</a>
                    </div>
                    <div style={styles.LoginButton} >
                        <Button style={styles.Button} type="submit"   > Đăng nhập </Button>
                    </div>
                    <div style={styles.Loginbottom}>
                        <span>Bạn chưa có tài khoản?</span>
                        <a style={styles.LinkBtn} href="/signup">Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    );
};


const styles = {

    paperContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${"./images/bg-login.png"})`,
    },

    loginForm: {
        width: '450px',
        minHeight: '500px',
        backgroundColor: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: '15%',
        borderRadius: '16px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },

    loginFormLogin: {
        width: 'auto',
        height: '100%',
        margin: '20px',
    },

    loginFormLogo: {
        width: '100px',
        minHeight: '100px',
        borderRadius: '50%',
        marginRight: '25px',
    },

    loginFormHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },

    loginFormCheck: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },

    LoginButton: {
        display: 'flex',
        justifyContent: 'center',
    },

    Button: {
        marginTop: '25px',
        backgroundColor: '#ECA64E',
        color: '#FFFF',
        padding: '12px 24px',
        alignItems: 'center',
        borderRadius: '37px',
        position: 'center',
    },

    Loginbottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    LinkBtn: {
        color: '#ECA64E',
    },
};
export default Login;