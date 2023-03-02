const modals = (): void => {
  // void указывает, что функция никогда не будет ничего возвращать, если поппробавать вернуть значение, ts  сразу выдаст ошибку

  //??  HTMLElement это интерфейс, то есть специально созданный "псевдотип", описание которого
  // предусматривает методы и свойства всех html  элементов. Но так же есть более специализированные интерфейсы
  //например HTMLInputElement

  function bindModal(
    triggerSelector: string,
    modalSelector: string,
    closeSelector: string,
    closeClickOverlay: string | boolean = 'true',
  ) {
    const triggers: NodeListOf<HTMLElement> = document.querySelectorAll(
      triggerSelector,
    ) //NodeListOf<HTMLElement> - переменная содержит список HTMLElement, каких именно не важно
    const modal: HTMLElement = document.querySelector(modalSelector)
    const close: HTMLElement = document.querySelector(closeSelector)
    const AllModalWindows: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-modal]',
    )
    const closeAllModalWindow = (): void => {
      AllModalWindows.forEach((ModalWindow: HTMLElement) => {
        ModalWindow.style.display = 'none'
      })
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e: MouseEvent) => {
        //не излищне ли здесь указывать, что событие именно мыши, ведь ckick итак предусматривает только мышь
        if (e.target) {
          e.preventDefault()
        }
        if (trigger.classList.contains('popup_calc_button')) {
          const windowWidth: NodeListOf<HTMLInputElement> = window.document.querySelectorAll(
            '#width',
          ) //<HTMLInputElement> позволяет получить свойство value
          if (windowWidth[0].value === '') {
            closeAllModalWindow()
            modal.style.display = 'block'
            document.body.classList.add('modal-open')
          }
        }
        closeAllModalWindow()
        modal.style.display = 'block'
        document.body.classList.add('modal-open')
      })
    })

    const closeModal = (): void => {
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')
    }
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'Escape') {
        closeModal()
      }
    })
    close.addEventListener('click', () => {
      closeModal()
    })
    modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target == modal) {
        closeModal()
      }
    })

    const showModalByTime = (selector: string, time: number) => {
      setTimeout((): void => {
        const modal = document.querySelector(selector)
        //без создания переменной modal, выдавал ошибку document.querySelector(selector).style.display = 'block'
        // это происходит потому что в ts нельзя обращаться к объектам dom  без создания переменной ?
        if (modal instanceof HTMLElement) {
          modal.style.display = 'block'
        }
        document.body.classList.remove('modal-open')
      }, time)
    }
    showModalByTime('.popup_engineer', 60000)
  }

  bindModal(
    '.popup_engineer_btn',
    '.popup_engineer',
    '.popup_engineer .popup_close',
  )
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
  bindModal(
    '.popup_calc_button',
    '.popup_calc_profile',
    '.popup_calc_profile_close',
    false,
  )
  bindModal(
    '.popup_calc_profile_button',
    '.popup_calc_end',
    '.popup_calc_end_close',
    false,
  )
}
export default modals
