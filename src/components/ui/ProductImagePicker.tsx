import { handleProductImageUpload } from '@/actions/handleProductImageUpload'
// import { Ima } from '@/db/models/file.model'
import { ImageDTO } from '@/db/models/image.model'
import { useState } from 'react'

const uploadProductImage = async (file: File, productName: string) => {
    if (!file) throw new Error('No file provided for upload')
    const formData = new FormData()
    formData.append('file', file)

    return await handleProductImageUpload(formData, productName)
}
type Props = {
    productName: string
    label: string
    value: ImageDTO[]
    onFilesReady: (value: ImageDTO[]) => void
    multiple?: boolean
    disabled?: boolean
}

const FILE_SIZE_LIMIT = 20 // in Mb, default value

const ProductImagePicker = (props: Props) => {
    const {
        productName,
        value,
        label,
        disabled = false,
        multiple = false,
        onFilesReady
    } = props
    console.log('ProductImagePicker', value)
    const [ isSubmitting, setSubmitting ] = useState(false)

    const validateFile = async (file: File) => {
        if (file.size > FILE_SIZE_LIMIT * (1024 ** 2)) {
            alert('Размер файла превышает допустимый лимит')
            return false
        }
        if (!IMAGE_TYPES.includes(file.type)) {
            alert('Размер файла превышает допустимый лимит')
            return false
        }
        return true
    }

    const onChange = async (event: any) => {
        const files = event?.target?.files
        if (!files || !files.length) {
            console.warn('No files selected')
            return
        }

        for (const file of files) {
            if (!await validateFile(file)) {
                console.warn('File validation failed', file)
                return
            }
        }

        setSubmitting(true)

        const fileDtos: ImageDTO[] = []
        try {
            for (let i = 0; i < files.length; i++) {
                const fileDto = await uploadProductImage(files[i], productName)
                fileDtos.push(fileDto)
            }
        } catch (error) {
            alert(error instanceof Error && error.message ? error.message : 'Не удалось загрузить файл')
        } finally {
            setSubmitting(false)
        }

        if (multiple) {
            onFilesReady([ ...(value ? value : []), ...fileDtos ])
        } else {
            onFilesReady(fileDtos)
        }
    }

    const handleClearClick = async (fileId: number) => {
        const files = value?.filter(file => file.id !== fileId)
        if (!files) {
            return
        }
        onFilesReady(files)
    }

    if (isSubmitting) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>
                <label htmlFor="component-simple" >{label}</label>
                <div id="component-simple" >
                    {value.map((fileDto) =>
                        <div key={fileDto.id}>
                            <a href={`/img/${fileDto.path}`}/>
                            {fileDto.path} : <button
                                type='button'
                                disabled={disabled}
                                onClick={() => handleClearClick(fileDto.id)}>
                                        Очистить
                            </button>
                        </div>
                    )}
                </div>
                <input
                    name="file_ids"
                    value={value.map(fileDto => fileDto.id).join(',')}
                    hidden/>
                <input id="file"
                    name="file"
                    accept={IMAGE_TYPES.join(',')}
                    type="file"
                    onChange={onChange}
                    multiple={multiple}
                />
            </div>
        </div>)
}

export default ProductImagePicker

const IMAGE_TYPES = [
    'image/png',
    'image/heic',
    'image/jpeg',
    'image/gif',
    'image/tiff'
]
