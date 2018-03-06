class ProgressApi {
    /** @description
     * Создает объект ProgressApi.
     * Запоминаются нужные html объекты.
     * В зависимости от ориентации эркана, присваевается отрицательный margin для выравнивания объекта по горизонтали/вертикали.
     *
     * Далее добавляются обработчки событий через функцию addEvents.
     * @constructor
     */
    constructor() {
        this.progressApi = document.querySelector('.progress-api');
        this.value = document.querySelector('.progress-api__value');
        this.animation = document.querySelector('.progress-api__animation');
        this.hide = document.querySelector('.progress-api__hide');
        this.svg = document.querySelector('svg');

        if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
            this.progressApi.style.marginLeft = (- this.progressApi.offsetWidth/2) + "px";
        } else {
            this.progressApi.style.marginTop = (- this.progressApi.offsetHeight/2) + "px";
        }

        this.addEvents();
    }

    /** @description
     * Функция добавляет обработчики событий для всех элементов блока progress-api.
     */
    addEvents() {
        /** @description
         * Добавляется обработчик на input, отвечающий за value. Не допускается выставление значений
         * input больше, чем 100 и меньше, чем 0.
         * В случае пустой строки объект progress отрисовывается с value = 0;
         */
        this.value.addEventListener('input', function () {
            if (this.value > 100) {
                this.value = '100';
            } else if (this.value < 0) {
                this.value = '0';
            }
            progress.setValue(parseInt(this.value === '' ? 0 : this.value));
        });

        /** @description
         * Добавляется обработчик на checkbox, отвечающий за анимацию объекта progress.
         */
        this.animation.addEventListener('click', function () {
            progress.setMod('animated', this.checked ? 'yes' : '');
        });

        /** @description
         * Добавляется обработчик на checkbox, отвечающий за скрытие объекта
         */
        this.hide.addEventListener('click', function () {
            progress.setMod('hidden', this.checked ? 'yes': '');
        });

        /** @description
         * Добавляется обработчик смены ориентации экрана, который обнуляет старое значение margin и устанавливает
         * новое, для выравнивания блока по горизонтали/вертикали по центру.
         */
        window.addEventListener('orientationchange', function () {
            if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
                this.progressApi.style.marginTop = "0";
                this.progressApi.style.marginLeft = (- this.progressApi.offsetWidth/2) + "px";
            } else {
                this.progressApi.style.marginLeft = "0";
                this.progressApi.style.marginTop = (- this.progressApi.offsetHeight/2) + "px";
            }
        }.bind(this));
    }
}

let progressApi = new ProgressApi();