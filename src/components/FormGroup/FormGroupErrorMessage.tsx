export default function FormGroupErrorMessage({ text }: { text: string | undefined }) {
    return (
        <span className='error-message'>{text}</span>
    )
}