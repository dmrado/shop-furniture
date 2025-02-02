'use client'
import { useState } from 'react'
import { nodeMailerInstantOrder } from '@/actions/NodeMailerInstantOrder'
import Success from '@/components/site/Success'
import Agreement from '@/components/site/Agreement'
import GoogleCaptcha from '@/components/site/GoogleCaptcha'

export const InputField = ({ label, type, value, onChange, required = true }) => {
    const [ isFocused, setIsFocused ] = useState(false)
    // todo: make autocomplete
    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={'tel'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`peer w-full h-12 px-4 pt-4 border-2 rounded-lg bg-transparent outline-none transition-all
                    ${isFocused ? 'border-indigo-600' : 'border-gray-300'}
                    ${value ? 'pt-4' : ''}
                    focus:pt-4 focus:border-indigo-600`}
            />
            <label
                className={`absolute left-4 transition-all pointer-events-none
                    ${value || isFocused ? 'text-xs top-1' : 'text-base top-3'}
                    ${isFocused ? 'text-indigo-600' : 'text-gray-500'}`}
            >
                {label}
            </label>
        </div>
    )
}

export const InstantOrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
    // fixme ???
    const [ captchaToken, setCaptchaToken ] = useState<string>('')

    // для Disclosure согласия на обработку перс данных
    // хранит состояние самого чекбокса
    const [ agreed, setAgreed ] = useState<boolean>(false)

    // для показа сообщения пользователю об успехе отправки заказа перед закрытиекм модального окна 2 сек
    const [ success, setSuccess ] = useState<boolean>(false)

    // в момент отправки меняет надпись на кнопке
    const [ isClosing, setIsClosing ] = useState<boolean>(false)

    // обработчик основной формы отправки мгновенного заказа
    // todo заменить отправку captchaValue на проверку в nodeMailerInstantOrder-е на наш функционал
    //todo сделать валидацию полей формы как положено и  сохранение в джойновую модель юзер и адрес
    const handleSubmit = async () => {
        setIsClosing(true)
        const userId = 1

        if (!captchaToken) {
            alert('Пожалуйста, подтвердите, что вы не робот')
            return
        }

        if (!agreed) {
            alert('Необходимо согласие на обработку персональных данных')
            return
        }

        const success = await nodeMailerInstantOrder({ name, phone, captchaValue: captchaToken })
        if (success) {
            setSuccess(true)
            alert('Заявка успешно отправлена, ожидайте звонка для оформления заказа!')
        }
        setIsClosing(false)
        //  todo пользователь хочет купить товар мгновенно, он отмечает checked, ему заводится строка в модели user, далее админ заводит полные данные во время звонка. На страницах order и profile должен быть свой функционал "отметить согласие", для этого везде использовать useEffect? на это й форме user с упрощенной регистрацией покупает без подтверждения регистрации
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-8 text-gray-700">
                        Мгновенное оформление заказа
                    </h2>

                    <form className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Имя"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <InputField
                                label="Телефон"
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input hidden value={captchaToken}/>
                        </div>

                        {/* Accordion section */}
                        <Agreement
                            setAgreed={setAgreed}
                            agreed={agreed}
                        />
                        {/* Buttons section */}
                        <div
                            className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                            <div className="flex justify-center">
                                <GoogleCaptcha onTokenChange={(token) => {
                                    setCaptchaToken(token)
                                }}/>
                            </div>

                            {success && <Success/>}

                            <button
                                type="button"
                                onClick={() => {
                                    onClose()
                                    setAgreed(false)
                                }}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                            >
                                Отмена
                            </button>

                            <button
                                type="submit"
                                disabled={!agreed}
                                onClick={handleSubmit}
                                className={`
                                    w-full sm:w-auto px-6 py-2.5 rounded-lg transition-all duration-200
                                    ${agreed
            ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }
                                `}
                            >
                                {isClosing ? 'Отправка...' : 'Отправить'}
                            </button>
                            {/*    todo  {isClosing ? 'Отправка...' : 'Отправить'} не корректно работает отправился в родительский компонент делать кнопку Отправить активной*/}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
