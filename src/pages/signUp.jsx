import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ImageAuth from "../components/Fragment/ImageAuth";
import FormAuth from "../components/Fragment/FormAuth";
import AuthLayout from "../components/Layout/AuthLayout";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { checkUserExists } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpPustakawan } from "../redux/slice/PustakawanSlice";

const SignUpPage = () => {

    const pustakawan = useSelector((state) => state.pustakawan.data);
    const [failed, setFailed] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function generateId() {
        const currentYear = new Date().getFullYear();
        const randomDigits = Math.floor(1000 + Math.random() * 9000); 
        return `${currentYear}${randomDigits}`; 
    }

    const randomId = generateId();

    const handleSignUp = (e) => {
        e.preventDefault();


        const data = {
            idPustakawan: randomId,
            username: e.target.elements.username.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            borrowedBooks: [],
            eventParticipations: [],
        }

        const result = checkUserExists(data);
        if (!result.status) {
            dispatch(signUpPustakawan(data));
            Swal.fire({
                title: "Anda berhasil daftar!",
                icon: "success",
                draggable: true
              });
            navigate("/sign-in");
            
        } else {
            setFailed(result.message);
        }
    }
    return (
        <AuthLayout>
            <ImageAuth />
            <FormAuth failed={failed} handle={handleSignUp} type={"Sign Up"}/>
        </AuthLayout>
    );
};

export default SignUpPage;
