const checkNumInputs = (selector:string) => {
    const numInpits:NodeListOf<HTMLInputElement>  = document.querySelectorAll(selector)

    numInpits.forEach((input) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/, "");
        });
    });
}

export default checkNumInputs




