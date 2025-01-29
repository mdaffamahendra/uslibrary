const Input = (props) => {
    const {type, name, max = "98", min= "1"} = props
    return (
        <input
            type={type}
            id={name}
            name={name}
            required
            maxLength={max}
            minLength={min}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    )
}

export default Input