import ReCAPTCHA from 'react-google-recaptcha'

const GOOGLE_RECAPTCHA_CLIENT_KEY = '6LeLOkgpAAAAAMP0GZre1UiAWepWg52rKPXPWXiZ'

type Props = {
    onTokenChange: (token: string) => void
}
const GoogleCaptcha = ({ onTokenChange }: Props) => {
    const onChange = (token: string|null) => {
        if (!token) {
            console.warn('No token provided')
            return
        }
        onTokenChange(token)
    }

    return (
        <ReCAPTCHA
            sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
            onChange={onChange}
        />
    )
}

export default GoogleCaptcha
