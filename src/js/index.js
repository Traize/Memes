import { clearAllText, download, addText, addImage } from "./form.js"

export const uploader = document.querySelector('.upload')
export const textForm = document.querySelector('.add-text')
export const downloadBtn = document.querySelector('.download')
export const clear = document.querySelector('.clear')

uploader.onchange = () => addImage()

// Отправка данных с формы
textForm.onsubmit = (e) => {
    e.preventDefault()
    addText()
}

// Очищает весь текст
clear.onclick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    clearAllText()
}

// Кнопка загрузки
downloadBtn.onclick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    download()
}
