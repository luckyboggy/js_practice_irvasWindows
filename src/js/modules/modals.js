const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            // Все модальные окна на странице
            mWindows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.targer) {
                    // Отменятет перезагрузку страницы (по умолчанию)
                    event.preventDefault();
                }
                // Закрываем все модальные окна
                mWindows.forEach(item => {
                    item.style.display = 'none';
                });

                // Делает элемент modal видимым
                modal.style.display = 'block';
                // Отмена прокрутки остальной страницы
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                // Через классы bootstrap
                //document.body.classList.add('modal-open')
            });
        });

        close.addEventListener('click', () => {
            // Закрываем все модальные окна
            mWindows.forEach(item => {
                item.style.display = 'none';
            });
            // Делает элемент modal невидимым
            modal.style.display = 'none';
            // разрещение прокрутки страницы
            document.body.style.overflow = '';
            document.body.style.marginRight = `0`;
            // Через классы bootstrap
            //document.body.classList.remove('modal-open')
        });

        // закрытие модального окна по клику вне его
        modal.addEventListener('click', (event) => {
            if ((event.target === modal) && closeClickOverlay) {
                // Закрываем все модальные окна
                mWindows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0`;
                //document.body.classList.remove('modal-open')
            }
        });
    }

    function showModalByTyme(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = '';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();


        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

    showModalByTyme('.popup', 6000);
};

export default modals;