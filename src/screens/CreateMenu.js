import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const CreateMenu = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                CreateMenu
            </>
    )
}

export default CreateMenu;