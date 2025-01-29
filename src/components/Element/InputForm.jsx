import Input from "./Input"
import Label from "./Label"

const InputForm = ({children, type, name, max, min}) => {
    return (
        <div>
        <Label htmlFor={name}>{children}</Label>
        <Input type={type} name={name} max={max} min={min}/>
        </div>
    )
}

export default InputForm