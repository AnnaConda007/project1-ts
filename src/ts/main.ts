import "./slider"
import modals from "./modals"
import forms from "./forms"
import changeCalkModalState from "./changeCalkModalState"
import images from "./images"
import tabs from "./tabs"
import timer from "./timer"

const calkModalState:{ [key: string]: string } = {}//?  при объявлении внутри функции, возникает ошибка 
window.addEventListener("DOMContentLoaded", function () {
    modals(),
    forms(calkModalState)
    changeCalkModalState(calkModalState)
    images()
    tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block")
    const deadline:string = "2023-02-01"
    timer(".container1", deadline)
})

 