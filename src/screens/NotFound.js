import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import LoadingComponent from '../components/LoadingComponent';

export default function NotFound() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <div style={styles.container}>
                <img src='./images/404.png' style={styles.image} alt="backgroud" />
                <div style={styles.title}>404</div>
                <div style={styles.sub}>Hmm... Không tìm thấy trang này.</div>
                <Button variant="contained" color='warning' onClick={() => navigate('/')}>Trang chủ</Button>
            </div>
    );
}

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 128,
        color: '#ECA64E',
        fontWeight: 'bold',
    },
    sub: {
        fontSize: 24,
        color: '#353b48',
        fontWeight: 'bold',
        marginBottom: 128
    },
    image: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -1
    }
}
