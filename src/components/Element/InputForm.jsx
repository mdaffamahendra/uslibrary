import Input from "./Input"
import Label from "./Label"

const InputForm = ({children, type, name}) => {
    return (
        <div>
        <Label htmlFor={name}>{children}</Label>
        <Input type={type} name={name}/>
        </div>
    )
}

export default InputForm