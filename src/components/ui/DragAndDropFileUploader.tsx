// return {}
// 'use client'
// import React, { useState, useRef } from 'react'
//
// type DragAndDropFileUploaderProps = {
//     label: string
//     onFilesReady: (files: File[]) => void
//     multiple?: boolean
//     allowedFileTypes?: string
// }
//
// const DragAndDropFileUploader = ({
//                                      label,
//                                      onFilesReady,
//                                      multiple = false,
//                                      allowedFileTypes = 'image/*',
//                                  }: DragAndDropFileUploaderProps) => {
//     const [dragActive, setDragActive] = useState(false)
//     const fileInputRef = useRef<HTMLInputElement>(null)
//
//     const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault()
//         e.stopPropagation()
//         if (e.type === 'dragover') {
//             setDragActive(true)
//         } else if (e.type === 'dragleave') {
//             setDragActive(false)
//         }
//     }
//
//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault()
//         e.stopPropagation()
//         setDragActive(false)
//         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//             onFilesReady(Array.from(e.dataTransfer.files))
//         }
//     }
//
//     const handleFileSelect = () => {
//         fileInputRef.current?.click()
//     }
//
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             onFilesReady(Array.from(e.target.files))
//         }
//     }
//
//     return (
//         <div className="flex flex-col my-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//                 {label}
//             </label>
//             <div
//                 className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
//                     dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 onDragOver={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDrop={handleDrop}
//                 onClick={handleFileSelect}
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-12 w-12 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L15 13m-4 5v-4l4-4m2 4h4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                 </svg>
//                 <p className="mt-2 text-sm text-gray-600 text-center">
//                     Перетащите файлы сюда или <span className="text-blue-600 font-medium">нажмите для загрузки</span>
//                 </p>
//             </div>
//             {/* Скрытый input для обработки выбора файлов */}
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 onChange={handleFileChange}
//                 multiple={multiple}
//                 accept={allowedFileTypes}
//             />
//         </div>
//     )
// }
//
// export default DragAndDropFileUploader
