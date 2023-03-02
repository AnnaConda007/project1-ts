import checkNumInputs from "./checkNumInputs"


const forms = (state:{ [key: string]: string }) => {// state:{ [key: string]: string }) указывает, что это объект с конкретными свойсвами 
    const allForms:NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
    const allInputs:NodeListOf<HTMLInputElement> = document.querySelectorAll("input");


    const message:{loading: string, success: string, failure: string}= {
        loading: "Загрузка....",
        success: "Спасибо, мы с вами свяжемся",
        failure: "Что-то пошло не так..",
    };


    checkNumInputs(`input[name="user_phone"]`)
    
    const postData = async (url:string, data:FormData) => {
        document.querySelector("status").innerHTML = message.loading;
       /*?? */ const resultFetch = await fetch(url, {// интерфейс этой переменной :fetch
            method: "POST",
            body: data,
        });
        closeModal() 
        return await resultFetch.text();
    };

    const clearAllInputs = () => {
        allInputs.forEach((input) => {
            input.value = "";
        });
    };

    allForms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const statusMessageSection:HTMLElement = document.createElement("div");
            statusMessageSection.classList.add("status");
            form.appendChild(statusMessageSection);

            const formData:FormData = new FormData(form);  
            if (form.getAttribute("data-calk") === "end") {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }

            postData("assets/server.php", formData) /* вызываем функцию postData() внутри которой делаем запрос fetch. Браузер ждет пока запрос будет отправлен по указанному адресу и придет ответ об отправке.*/
                .then((resultFetch) => {
                    /* и когда браузер получит ответ - выполняется промис заданный запросом fetch, на данной строке  функция в then получает результат выполнения промиса(resolve)*/
                    console.log(resultFetch);
                    statusMessageSection.innerHTML = message.success;
                }) // мы можем обратиться к resultFetch, которая лежит в области видимости postData(), так как вернули ее в конце вызова postData()
                .catch(() => {
                    statusMessageSection.innerHTML = message.failure;
                }) /* catch отлавливает ошибку в промисе и задает действия при обнаружении ошибки.
                Это тоже самое, что записать в промисе значение reject и обратится к нему через .then*/
                .finally(() => {
                    //независимо от результата, как только запрос выполнится, то есть браузер получит ответ - что данные ушли (мы получим ответ от сервера), выполнится setTimeout
                    clearAllInputs();
                    setTimeout(() => {
                        statusMessageSection.remove();
                    }, 5000);
                    let modalCalkWindow:HTMLElement = document.querySelector(".popup_calc_end")
                    modalCalkWindow.style.display = 'none'
                    document.body.classList.remove('modal-open')
                    for (let key in state) {
                        delete state[key]
                    }


                });
        });
    });
};

export default forms;
