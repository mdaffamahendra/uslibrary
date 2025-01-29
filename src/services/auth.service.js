const checkUserExists = (newUser) => {
  const storedUsers = JSON.parse(localStorage.getItem("pustakawan")) || [];

  // Cek apakah email sudah terdaftar
  const existingUser = storedUsers.find((user) => user.email === newUser.email);

  if (existingUser) {
    return {
      status: true,
      message: "Email sudah terdaftar.",
    };
  }

  // Validasi email harus menggunakan @gmail.com
  if (!newUser.email.endsWith("@gmail.com")) {
    return {
      status: true,
      message: "Email harus menggunakan domain @gmail.com.",
    };
  }

  // Validasi username maksimal 18 karakter
  if (newUser.username.length > 18) {
    return {
      status: true,
      message: "Username maksimal 18 karakter.",
    };
  }

  // Validasi password maksimal 8 karakter
  if (newUser.password.length !== 8) {
    return {
      status: true,
      message: "Password harus 8 karakter",
    };
  }

  // Jika semua validasi lolos
  return {
    status: false,
    message: "", // Tidak ada pesan kesalahan
  };
};

const checkPassword = (data) => {
  const { email, password } = data;
  const storedUsers = JSON.parse(localStorage.getItem("pustakawan")) || [];
  const user = storedUsers.find((user) => user.email === email);
  if (user) {
    if (user.password === password) {
      return {
        status: true,
        message: "",
      };
    } else {
      return {
        status: false,
        message: "Password anda salah",
      };
    }
  }

  return {
    status: false,
    message: "Email belum terdaftar",
  };
};

export { checkUserExists, checkPassword };
