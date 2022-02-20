import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Forgot = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            console.log(values);
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
                    <h3>Quên mật khẩu</h3>
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
                    <div style={styles.LoginButton} >
                        <Button style={styles.Button} type='submit'> Quên mật khẩu </Button>
                    </div>
                </form>
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
        width: '450px',
        minHeight: '400px',
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