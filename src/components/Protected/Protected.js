import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const ProtectedRoute = ({component: Comp, loggedIn, path, ...rest}) => {
    const logged = loggedIn
    const {auth} = rest;
    const uid = auth.uid;
    console.log('logged', logged);

    return uid ? <Comp/> : <Redirect to="/"/>
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ProtectedRoute)

