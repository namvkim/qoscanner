import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const Customer = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                Customer
            </>
    )
}

export default Customer;