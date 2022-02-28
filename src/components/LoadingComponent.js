import ReactLoading from 'react-loading';

const LoadingComponent = () => {
    return (
        <div style={styles.container}>
            <ReactLoading type="bars" color="#ECA64E" width={50} />
        </div>
    )
}

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 100,
        display: 'flex',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
}


export default LoadingComponent;