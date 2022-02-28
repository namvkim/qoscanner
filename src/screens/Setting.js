import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const Setting = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                Setting
            </>
    )
}

export default Setting;