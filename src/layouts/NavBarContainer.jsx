import { connect } from 'react-redux';
import NavBar from './NavBar'
import { loginUser }from '../user/ui/loginbutton/LoginButtonActions'
import { logoutUser } from '../user/ui/logoutbutton/LogoutButtonActions'

const mapStateToProps = (state) => {
  return {
    userData: state.user.data,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    onLoginUserClick: (event) => {
      event.preventDefault();
      dispatch(loginUser());
    },
    onLogoutUserClick: (event) => {
      event.preventDefault();
      dispatch(logoutUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

