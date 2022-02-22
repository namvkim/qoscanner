import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import LoadingComponent from "../components/LoadingComponent";
import DialogComponent from "../components/DialogComponent";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [authData, setAuthData] = useState();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Địa chỉ Email không hợp lệ")
                .required("Nhập một địa chỉ Email"),
            password: Yup.string()
                .min(8, "Sử dụng 8 ký tự trở lên")
                .required("Nhập mật khẩu"),
        }),
        onSubmit: values => {
            setLoading(true);
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found") {
                        setAuthData({
                            type: "error",
                            message: "Tài khoản Email không đúng. Vui lòng thử lại bằng Email khác!"
                        });
                    } else if (error.code === "auth/wrong-password") {
                        setAuthData({
                            type: "error",
                            message: "Mật khẩu của bạn không đúng!"
                        });
                    } else if (error.code === "auth/too-many-requests") {
                        setAuthData({
                            type: "error",
                            message: "Vui lòng thử lại sau vài phút!"
                        });
                    } else if (error.code === "auth/network-request-failed") {
                        setAuthData({
                            type: "error",
                            message: "Vui lòng kiểm tra mạng Internet!"
                        });
                    } else {
                        setAuthData({
                            type: "error",
                            message: "Lỗi hệ thống!"
                        });
                    }
                    setDialog(true);
                    setLoading(false);
                });
        },
    });

    return (
        <div style={styles.paperContainer}>
            {loading && <LoadingComponent />}
            <div style={styles.loginForm}>
                <form style={styles.loginFormLogin} onSubmit={formik.handleSubmit}>
                    <div style={styles.loginFormHeader}>
                        <img style={styles.loginFormLogo} alt='login-logo' src='./images/logo.png' />
                        <h4 style={styles.loginFormApp}>QR SCANNER</h4>
                    </div>
                    <div style={styles.loginFormTitle}>Đăng nhập</div>
                    <TextField
                        variant="standard"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email && formik.touched.email}
                        helperText={formik.errors.email && formik.touched.email && formik.errors.email}
                        sx={{ marginBottom: 1 }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        id="password"
                        label="Mật khẩu"
                        name="password"
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password && formik.touched.password}
                        helperText={formik.errors.password && formik.touched.password && formik.errors.password}
                        sx={{ marginBottom: 1 }}
                    />
                    <div style={styles.loginFormCheck}>
                        <FormControlLabel control={<Checkbox />} label="Ghi nhớ tôi" />
                        <Link to="/forgot" style={styles.LinkBtn}>Quên mật khẩu?</Link>
                    </div>
                    <div style={styles.LoginButton} >
                        <Button style={styles.Button} type="submit"> Đăng nhập </Button>
                    </div>
                    <div style={styles.Loginbottom} >
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to="/signup" style={styles.LinkBtn}>Đăng ký</Link>
                    </div>
                </form>
                <DialogComponent isOpen={dialog} setDialog={setDialog} authData={authData} />
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
        backgroundColor: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: '15%',
        borderRadius: '16px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },

    loginFormLogin: {
        width: 400,
        margin: '20px 40px',
    },

    loginFormLogo: {
        width: '20px',
        minHeight: '20px',
        marginRight: 16
    },

    loginFormApp: {
        color: 'grey'
    },

    loginFormHeader: {
        display: 'flex',
        alignItems: 'center',
    },

    loginFormTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ECA64E',
        marginTop: 16,
        marginBottom: 24
    },

    loginFormCheck: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
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
        fontSize: 12,
        fontWeight: 500,
        color: 'grey'
    },

    LinkBtn: {
        color: '#ECA64E',
    },
};
export default Login;