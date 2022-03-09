
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import FormAddMenu from "../components/FormAddMenu";
import ShowMenu from "../components/ShowMenu";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const CreateMenu = (props) => {
    
    const [loading, setLoading] = useState(true);
    const [menuId, setMenuId] = useState("");
    const { classes } = props;
    
    const getMenuIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setMenuId(id);
      };

    useEffect(() => {
        setLoading(false);
    }, []);

    

    return (
        loading ? <LoadingComponent /> :
            <div className={classes.Container}>
                <FormAddMenu id={menuId} setMenuId= {setMenuId} />
                <ShowMenu  getMenuId = {getMenuIdHandler} />
            </div>
    )
}

const styles = theme => ({
    Container: {
        height:'100vh',
    }
});

CreateMenu.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(CreateMenu);