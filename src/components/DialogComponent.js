import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, Alert, Button } from '@mui/material';

const DialogComponent = (props) => {
    const navigate = useNavigate();
    const { isOpen, authData, setDialog } = props;

    const onClose = () => {
        setDialog(false);
        if (authData?.type === "success") {
            navigate(authData?.path)
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose()}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogContent>
                <Alert variant="standard" severity={authData?.type}>
                    {authData?.message}
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" autoFocus onClick={() => onClose()}> Đóng </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent;