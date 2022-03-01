import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import FormAddMenu from "../components/FormAddMenu";
import ShowMenu from "../components/ShowMenu";

const CreateMenu = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? <LoadingComponent /> :
            <>
                <FormAddMenu />
                <ShowMenu />
            </>
    )
}

export default CreateMenu;