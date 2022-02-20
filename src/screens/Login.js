import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useFormik } from "formik";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            signInWithEmailAndPassword(auth, values.email, values.password)
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
            <div style={styles.loginForm}>
                <form style={styles.loginFormLogin} onSubmit={formik.handleSubmit}>
                    <div style={styles.loginFormHeader}>
                        <img style={styles.loginFormLogo} alt='login-logo' src='./images/bg-login.png' />
                        <h2>QR SCANNER</h2>
                    </div>
                    <h3>Đăng nhập</h3>
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={false}
                        helperText={false ? "fererjka" : " "}
                    />
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="password"
                        label="Mật khẩu"
                        name="password"
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={false}
                        helperText={false ? "fererjka" : " "}
                    />
                    <div style={styles.loginFormCheck}>
                        <FormControlLabel control={<Checkbox />} label="Ghi nhớ tôi" />
                        <Link to="/forgot" style={styles.LinkBtn}>Quên mật khẩu?</Link>
                    </div>
                    <div style={styles.LoginButton} >
                        <Button style={styles.Button} type="submit"> Đăng nhập </Button>
                    </div>
                    <div style={styles.Loginbottom}>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to="/signup" style={styles.LinkBtn}>Đăng ký</Link>
                    </div>
                </form>
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
    },

    LoginButton: {
        display: 'flex',
        justifyContent: 'center',
    },

    Button: {
        marginTop: '25px',
        marginBottom: '10px',
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