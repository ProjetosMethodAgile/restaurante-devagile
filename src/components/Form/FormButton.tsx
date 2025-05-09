import { ButtonProps } from "./FormsType/FormType";

export default function FormButton({children}:ButtonProps){
    return(
        <div>
            <button>{children}</button>
            <p>{children}</p>
        </div>
    )
}