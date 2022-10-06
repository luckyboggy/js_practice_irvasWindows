import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');
    // phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    // Можно вводить только цифры
    // phoneInputs.forEach(item => {
    //     item.addEventListener('input', () => {
    //         item.value = item.value.replace(/\D/, '');
    //     });
    // });
    checkNumInputs('input[name="user_phone"]');


    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так'
    };

    // функция отпавки данных
    // async - значит внутри функции есть асинхрронные операции
    const postData = async (url, data) => {
        // Вывод сообщения в созданный элемент (StatusMessage)
        document.querySelector('.status').textContent = message.loading;
        // fetch возвращает промис (который нужно ещё раз обработать)
        // fetch - асинхронная операция
        // await - куы получит результат только после выполнения fetch
        let res = await fetch(url, {
            method: 'POST',
            body: data,
        });

        // return происходит только после выполнения res.text();
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            // Отмена перезагрузки страницы при отправке формы
            event.preventDefault();

            // Создание элемента для вывода сообщений
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            // Помещаем созданный div в конец выбранной формы
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                // В конце необходимо очистить инпуты и удалить Status message через определенное время
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        // удаляем StatusMessage
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;