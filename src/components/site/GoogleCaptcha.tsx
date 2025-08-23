import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
    onTokenChange: (token: string) => void
}
const GoogleCaptcha = ({ onTokenChange }: Props) => {
    const onChange = (token: string | null) => {
        if (!token) {
            console.warn('No token provided')
            return
        }
        onTokenChange(token)
    }
    if (!process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT_KEY) {
        throw new Error('RECAPTCHA_CLIENT_KEY is not defined')
    }
    return (
        <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT_KEY}
            onChange={onChange}
        />
    )
}

export default GoogleCaptcha
