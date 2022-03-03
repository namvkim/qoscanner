import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import FormAddMenu from "../components/FormAddMenu";
import ShowMenu from "../components/ShowMenu";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const CreateMenu = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { classes } = props;

    return (
        loading ? <LoadingComponent /> :
            <div className={classes.Container}>
                <FormAddMenu />
                <ShowMenu />
            </div>
    )
}

const styles = theme => ({
    Container: {
        height:'calc(100vh - 48px)',
    }
});

CreateMenu.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(CreateMenu);