import { CircularProgress } from "@mui/material";

const LoadingComponent = () => {
    return (
        <div style={styles.container}>
            <CircularProgress color="warning" />
        </div>
    )
}

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default LoadingComponent;