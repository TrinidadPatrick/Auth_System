
interface Props {
    errorMessage? : string
}

export const FormError = ({errorMessage} : Props) => {
    if(!errorMessage) return null

    return (
        <div className=" bg-red-200 p-2 rounded-sm flex items-center gap-x-2 text-sm text-destructive">
            <p className="text-red-500 text-xs">{errorMessage}</p>
        </div>
    )
}