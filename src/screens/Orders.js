import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const Orders = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                Orders
            </>
    )
}

export default Orders;