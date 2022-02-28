import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const CreateQRCode = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                CreateQRCode
            </>
    )
}

export default CreateQRCode;