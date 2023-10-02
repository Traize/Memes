import { img, texts } from "./form.js"

export const canvas = document.querySelector('.canvas')
export const context = canvas.getContext('2d')
export let startX, startY = 0

let selectedText = null
let isDragging = false

let yOffset, xOffset


function getOffset() {
    let canvasOffsets = canvas.getBoundingClientRect();
    xOffset = canvasOffsets.left
    yOffset = canvasOffsets.top
}
window.onscroll = getOffset

// Отрисовка изображения
export function updateCanvas(img) {
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0)
}

// проверка находится ли мышь в блоке объекта
function mouseInObject(x, y, text) {
    let textLeft = text.x
    let textRight = text.x + text.width
    let textTop = text.y
    let textBottom = text.y + text.height

    if (x >= textLeft && x <= textRight && y >= textTop && y <= textBottom) {
        return true
    } else return false
}

// выделение при нажатие определенного блока
export function mouseDown(e) {
    e.preventDefault()
    startX = parseInt(e.clientX - xOffset)
    startY = parseInt(e.clientY - yOffset)
    let index = 0
    for (let text of texts) {
        if (mouseInObject(startX, startY, text)) {
            isDragging = true
            selectedText = index
            return
        }
        index++
    }
}

// перемещение блока
export function mouseMove(e) {
    if (!isDragging) {
        return
    }
    else {
        e.preventDefault()
        let mouseX = parseInt(e.clientX - xOffset)
        let mouseY = parseInt(e.clientY - yOffset)

        let dx = mouseX - startX
        let dy = mouseY - startY
        startX = mouseX
        startY = mouseY

        let currentItem = texts[selectedText]
        currentItem.x += dx
        currentItem.y += dy
        draw()
    }
}

export function mouseUp(e) {
    if (!isDragging) {
        return
    }
    e.preventDefault()
    isDragging = false
}


export function mouseOut(e) {
    if (!isDragging) {
        return
    }
    e.preventDefault()
    isDragging = false
}

// Перерисовка объектов из массива
export function draw() {
    if (!img) return
    updateCanvas(img)
    for (let i = 0; i < texts.length; i++) {
        let text = texts[i];
        context.textBaseline = "top"
        context.font = text.font
        context.fillStyle = text.fillColor
        context.strokeStyle = text.strokeColor
        context.fillText(text.text, text.x, text.y);
        context.strokeText(text.text, text.x, text.y)
    }
}


canvas.onmousedown = mouseDown
canvas.onmousemove = mouseMove
canvas.onmouseup = mouseUp
canvas.onmouseout = mouseOut
