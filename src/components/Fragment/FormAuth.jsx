import Button from "../Element/Button";
import InputForm from "../Element/InputForm";
import { Link } from "react-router-dom";

const FormAuth = (props) => {
  const { failed, handle, type, max } = props;
  return (
    <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
      <h2 className="text-xl md:text-3xl font-semibold text-center mb-6 text-indigo-600">
        {type}
      </h2>
      <form className="space-y-4" onSubmit={handle}>
        {failed && (
          <p className="text-center text-sm text-red-600 mt-2">{failed}</p>
        )}
        {type === "Sign Up" && (
        <InputForm type={"text"} name={"username"} max={"18"}>
          Username
        </InputForm>
        )}
        <InputForm type={"email"} name={"email"}>
          Email
        </InputForm>
        <InputForm type={"password"} name={"password"} max={max} min={"8"}>
          Password
        </InputForm>
        <Button type={"submit"}>{type}</Button>
      </form>
      {type === "Sign Up" ? (
        <p className="text-center text-sm text-gray-600 mt-2">
          Sudah memiliki akun?{" "}
          <Link
            to="/sign-in"
            className="text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Masuk Sekarang
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600 mt-2">
          Belum memiliki akun?{" "}
          <Link
            to="/sign-up"
            className="text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Daftar Sekarang
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormAuth;
