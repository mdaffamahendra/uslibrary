import { useSelector } from "react-redux";

const useLogin = () => {
    const email = JSON.parse(localStorage.getItem("userLoginEmail"));
    if(!email) return false;

    const pustakawan = useSelector(state => state.pustakawan.data);
    const pustakawanLogin = pustakawan.find(user => user.email === email);
    if(pustakawanLogin){
        return pustakawanLogin
    } else {
        return false;
    }

    
}

export default useLogin;