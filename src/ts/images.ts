const images = () => {
    const div:HTMLElement = document.createElement("div")
    const wrapSection:HTMLElement = document.querySelector(".works")
    const img:HTMLElement = document.createElement("img")

    div.classList.add("popup")
    wrapSection.appendChild(div)
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
    div.style.display = "none"
    div.appendChild(img)

    wrapSection.addEventListener("click", (e) => {
        e.preventDefault()
        const target=  e.target as HTMLElement
        if (target && target.classList.contains("preview")) {
            div.style.display = "flex"
            const parentNode:HTMLElement = target.parentNode as HTMLElement
            let linkToImg:string=""
            if(parentNode.hasAttribute("href")){
linkToImg = parentNode.getAttribute("href")
            }
            img.setAttribute("src", linkToImg)
        }
        if (target && target.matches("div.popup")) { //div.popup добавляется на 6 строке
            div.style.display = "none"
        }
    })


}


export default images


 