import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import * as Yup from "yup";

import { TextField, Button } from "@mui/material";
import LoadingComponent from "../components/LoadingComponent";
import DialogComponent from "../components/DialogComponent";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [authData, setAuthData] = useState();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: '',
            resname: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Ít nhất 2 kí tự")
                .max(30, "Tối đa 30 kí tự")
                .required("Nhập tên của bạn"),
            email: Yup.string()
                .email("Địa chỉ Email không hợp lệ")
                .required("Chọn một địa chỉ Email"),
            password: Yup.string()
                .min(8, "Sử dụng 8 ký tự trở lên")
                .required("Nhập mật khẩu"),
            repassword: Yup.string()
                .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
                .required("Nhập lại mật khẩu"),
            resname: Yup.string()
                .required("Nhập tên cửa hàng"),
            address: Yup.string()
                .required("Nhập địa chỉ cửa hàng"),
        }),
        onSubmit: values => {
            setLoading(true);
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then(() => {
                    setAuthData({
                        type: "success",
                        path: "/",
                        message: "Đăng ký tài khoản thành công. Hãy tạo Menu và mã QR cho cửa hàng của bạn."
                    });
                    setDialog(true);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        setAuthData({
                            type: "error",
                            message: "Email này đã được sử dụng. Vui lòng đăng ký bằng một Email khác!"
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
        <div style={styles.paperContainer}>
            {loading && <LoadingComponent />}
            <div style={styles.loginForm}>
                <form style={styles.loginFormLogin} onSubmit={formik.handleSubmit}>
                    <div style={styles.loginFormHeader}>
                        <img style={styles.loginFormLogo} alt='login-logo' src='./images/logo.png' />
                        <h4 style={styles.loginFormApp}>QR SCANNER</h4>
                    </div>
                    <div style={styles.loginFormTitle}>Đăng ký tài khoản</div>
                    <TextField
                        variant="standard"
                        fullWidth
                        id="name"
                        label="Họ và tên"
                        name="name"
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name && formik.touched.name}
                        helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                        sx={{ marginBottom: 1 }}
                    />
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
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password && formik.touched.password}
                        helperText={formik.errors.password && formik.touched.password && formik.errors.password}
                        sx={{ marginBottom: 1 }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        id="repassword"
                        label="Nhập lại mật khẩu"
                        name="repassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.repassword}
                        error={formik.errors.repassword && formik.touched.repassword}
                        helperText={formik.errors.repassword && formik.touched.repassword && formik.errors.repassword}
                        sx={{ marginBottom: 1 }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        id="resname"
                        label="Tên cửa hàng"
                        name="resname"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.resname}
                        error={formik.errors.resname && formik.touched.resname}
                        helperText={formik.errors.resname && formik.touched.resname && formik.errors.resname}
                        sx={{ marginBottom: 1 }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        id="address"
                        label="Địa chỉ"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        error={formik.errors.address && formik.touched.address}
                        helperText={formik.errors.address && formik.touched.address && formik.errors.address}
                        sx={{ marginBottom: 1 }}
                    />
                    <div style={styles.LoginButton} >
                        <Button style={styles.Button} type='submit'> Đăng ký </Button>
                    </div>
                    <div style={styles.Loginbottom}>
                        <span>Bạn đã có tài khoản?</span>
                        <Link to="/login" style={styles.LinkBtn}>Đăng nhập</Link>
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
export default SignUp;