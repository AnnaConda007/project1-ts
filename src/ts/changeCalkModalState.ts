 import checkNumInputs from "./checkNumInputs"

const changeCalkModalState = (state:{[key: string]: string | number }) => {
    const windowFormTabs:NodeListOf<HTMLElement> = window.document.querySelectorAll(".balcon_icons_img")
    const windowWidth:NodeListOf<HTMLElement> = window.document.querySelectorAll("#width")
    const windowHeight:NodeListOf<HTMLElement> = window.document.querySelectorAll("#height")
    const windowType:NodeListOf<HTMLElement> = window.document.querySelectorAll("#view_type")
    const windowCheckbox:NodeListOf<HTMLElement> = window.document.querySelectorAll(".checkbox")



     

    checkNumInputs("#width")
    checkNumInputs("#height")


    function addDataInObject(event:string, activeElement:NodeListOf<HTMLElement> | NodeListOf<HTMLFormElement>, propInObject:string) {
        activeElement.forEach((item, i) => {    
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case "SPAN":
                        state[propInObject] = i   
                        break;
                    case "INPUT":
                        if (item.getAttribute("type") === "radio") {
                            state[propInObject] = item.value // ??
                        } else {
                            state[propInObject] = item.value// ??
                        }
                        break;
                    case "SELECT":
                        state[propInObject] = item.value // ?
                        break;
                }
                console.log(state)
            });
        });
    }


    addDataInObject("click", windowFormTabs, "formWindow")
    addDataInObject("input", windowWidth, "width")
    addDataInObject("input", windowHeight, "height")
    addDataInObject("change", windowType, "typeWindow")
    addDataInObject("change", windowCheckbox, "radio")

}

export default changeCalkModalState
