import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const Voucher = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                Voucher
            </>
    )
}

export default Voucher;