import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button } from "@mui/material";
import LoadingComponent from '../components/LoadingComponent';
import DialogComponent from "../components/DialogComponent";

const Forgot = () => {
    const [loading, setLoading] = useState(true);
    const [dialog, setDialog] = useState(false);
    const [authData, setAuthData] = useState();

    useEffect(() => {
        setLoading(false);
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Địa chỉ Email không hợp lệ")
                .required("Nhập một địa chỉ Email"),
        }),
        onSubmit: values => {
            setLoading(true);
            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    setAuthData({
                        type: "success",
                        path: "/login",
                        message: "Xác thực lấy lại mật khẩu đã được gửi tới Email của bạn. Vui lòng kiểm tra."
                    });
                    setDialog(true);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found") {
                        setAuthData({
                            type: "error",
                            message: "Tài khoản Email không đúng. Vui lòng thử lại bằng Email khác!"
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
        }
    });

    return (
        loading ? <LoadingComponent /> :
            <div style={styles.paperContainer}>
                <div style={styles.loginForm}>
                    <form style={styles.loginFormLogin} onSubmit={formik.handleSubmit}>
                        <div style={styles.loginFormHeader}>
                            <img style={styles.loginFormLogo} alt='login-logo' src='./images/logo.png' />
                            <h4 style={styles.loginFormApp}>QR SCANNER</h4>
                        </div>
                        <div style={styles.loginFormTitle}>Quên mật khẩu</div>
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
                        <div style={styles.LoginButton} >
                            <Button style={styles.Button} type='submit'> Gửi mật khẩu mới </Button>
                        </div>
                    </form>
                    <DialogComponent isOpen={dialog} setDialog={setDialog} authData={authData} />
                </div>
            </div>
    );
}


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
        justifyContent: 'start',
    },

    loginFormTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ECA64E',
        marginTop: 16,
        marginBottom: 24
    },

    LoginButton: {
        display: 'flex',
        justifyContent: 'center',
    },

    Button: {
        marginTop: '40px',
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
};

export default Forgot;