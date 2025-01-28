const Input = (props) => {
    const {type, name} = props
    return (
        <input
            type={type}
            id={name}
            name={name}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    )
}

export default Input