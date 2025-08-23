'use client'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'

const Editor = ({ defaultValue }: { defaultValue: string }) => {
    const [value, setValue] = useState(defaultValue)
    const ref = useRef(null)

    useEffect(() => {
        // Обновляем внутреннее состояние 'value' компонента Editor
        // только когда пропс 'defaultValue' меняется.
        setValue(defaultValue)
    }, [defaultValue]) // Зависимость от defaultValue

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            [
                'link'
                // 'image', 'video'
            ],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link'
        // 'image', 'video'
    ]

    return (
        <>
            <textarea
                className="hidden h-0"
                name="descriptionLong"
                value={value}
                id="hidden_textarea"
                readOnly
            ></textarea>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                ref={ref}
                className="text-gray-700 break-all"
            />
        </>
    )
}

export default Editor
