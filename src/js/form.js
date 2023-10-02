import { uploader, clear, textForm, downloadBtn } from './index.js'
import { canvas, context, startX, startY, draw, updateCanvas } from './canvas.js'


export let texts = []

// Img loader
export let img
export function addImage() {
    if (uploader.files.length > 0) {
        // Создаем строку с URL указывающим на объект
        const imgURL = URL.createObjectURL(uploader.files[0])
        img = new Image()
        img.src = imgURL

        img.onload = function () {
            clearAllText()
            draw()
            downloadBtn.classList.remove('none')
        }
    }
    // Если файл не загружен очищает блок
    else {
        canvas.width = canvas.width
        clear.classList.add('none')
        downloadBtn.classList.add('none')
    }
}

export function clearAllText() {
    if (!img) {
        return
    }
    texts = []
    updateCanvas(img)
    clear.classList.add('none')
}

export function download() {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL()
    link.click();
}

// Добавление текста на канвас
export function addText() {

    const text = textForm.querySelector('.text')
    const fz = textForm.querySelector('.fz-option')
    const fs = textForm.querySelector('.fs-family')
    const stroke = textForm.querySelector('#borderColor')
    const fill = textForm.querySelector('#textColor')

    // Проверки на путсые значения
    if (!text.value || !fz.value || !fs.value || !stroke.value || !fill.value) {
        return alert('Одно из полей пустое')
    } else if (!uploader.files.length) {
        return alert('Нет изображения')
    }

    let y = texts.length * 20 + 20
    // кастомизация текста
    context.textBaseline = "top"
    context.strokeStyle = stroke.value
    context.fillStyle = fill.value
    context.font = `${Math.abs(fz.value)}px ${fs.value} serif`
    context.strokeText(text.value, startX, startY)
    context.fillText(text.value, startX, startY)

    // создание объекта с значением текста и его начальными координатами
    let textObj = {
        text: text.value,
        x: 20,
        y: y,
        font: context.font,
        fillColor: context.fillStyle,
        strokeColor: context.strokeStyle,
    }
    // вычисление ширины и высоты блока с текстом
    textObj.width = context.measureText(textObj.text).width;
    textObj.height = parseInt(Math.abs(fz.value));
    texts.push(textObj)
    draw()
    clear.classList.remove('none')
}