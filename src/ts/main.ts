import "./slider"
import modals from "./modals"
import forms from "./forms"
import changeCalkModalState from "./changeCalkModalState"
import images from "./images"

const calkModalState:{ [key: string]: string } = {}//?  при объявлении внутри функции, возникает ошибка 
window.addEventListener("DOMContentLoaded", function () {
    modals(),
    forms(calkModalState)
    changeCalkModalState(calkModalState)
    images()
})

 