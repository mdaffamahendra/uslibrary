const checkUserExists = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("pustakawan")) || [];
    const existingUser = storedUsers.find(
        (user) =>
           user.email === newUser.email
    );

    if (existingUser) {
        return {
            status: true,
            message: "email sudah terdaftar.",
        };
    }

    return {
        status: false,
        message: "",
    };
};
const checkPassword = (data) => {
    const { email, password } = data;
    const storedUsers = JSON.parse(localStorage.getItem("pustakawan")) || [];
    const user = storedUsers.find(
        (user) =>
           user.email === email
    );
    if (user) {
        if (user.password === password) {
            return {
                status: true,
                message: ''
            };
        } else {
            return {
                status: false,
                message: 'Password anda salah'
            };
        }
    } 

    return {
        status: false,
        message: 'Email belum terdaftar'
    }
};

export {checkUserExists, checkPassword}