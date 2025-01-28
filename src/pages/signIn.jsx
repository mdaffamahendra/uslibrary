import {checkUserExists, checkPassword } from "../services/auth.service";
import ImageAuth from "../components/Fragment/ImageAuth";
import FormAuth from "../components/Fragment/FormAuth";
import AuthLayout from "../components/Layout/AuthLayout";
import { useState } from "react";

const SignInPage = () => {
    const [failed, setFailed] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
    
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
    
        const password = checkPassword(data);
        console.log(password)
        
        if (password.status) {
            localStorage.setItem("userLoginEmail", JSON.stringify(data.email));
            window.location.href = '/library';
        } else {
            setFailed(password.message);
        }
    }
    return (
        <AuthLayout>
            <ImageAuth />
            <FormAuth failed={failed} handle={handleSignIn} type={"Sign In"}/>
        </AuthLayout>
    );
};

export default SignInPage;
