const timer = (id: string, deadline: string) => {
    const addZero = (number: number): string => {
        return number <= 9 ? '0' + number : number.toString(); }

    const getTime = (endTime: string)=> {
        const time = Date.parse(endTime) - Date.parse(new Date().toString()) // из дедлайна вычитается настоящее время, оазница сохраняется в переменную
        const seconds: number = Math.floor((time / 1000) % 60) // все секунды поделили на 60(минут) и сохранили остаток
        const minutes: number = Math.floor((time / 1000) / 60) % 60 // все секунды сначала поделили на 60(часы), а потом еще раз на 60(минут) и сохранили остаток от деления
        const hours: number = Math.floor(((time / 1000) / 60 / 60) % 24) //все часы поделили на 24 и оставили остаток
        const days: number = Math.floor((time / 1000) / 60 / 60 / 24)

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds,
        }
    } 

    const setClock = (selector: string, endTime: string) => {
        const timer:HTMLElement  = document.querySelector(selector)  
        const days:HTMLElement  = timer.querySelector('#days') 
        const hours:HTMLElement = timer.querySelector('#hours') 
        const minutes:HTMLElement  = timer.querySelector('#minutes') 
        const seconds:HTMLElement = timer.querySelector('#seconds') 
        const timeInterval = setInterval(updateClock, 1000)

        function updateClock() { 
            const time= getTime(endTime)
          days.textContent  = addZero(time.days)
            hours.textContent = addZero(time.hours)
            minutes.textContent = addZero(time.minutes)
            seconds.textContent = addZero(time.seconds)

            if (time.total <= 0) {
                days.textContent = '00'
                hours.textContent = '00'
                minutes.textContent = '00'
                seconds.textContent = '00'
                clearInterval(timeInterval)
            }
        }
    }

    setClock(id, deadline)
}

export default timer
