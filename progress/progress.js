class Progess {
    /** @description
     * Создает объект progress.
     * В зависимости от ориентации экрана устанавливаются отступы блока progress и размер круга загрузки.
     * this.length - половина от длины блока progress
     * Радиус вычисляется исходя из длины блока и ширины кривых, с помощью которых рисуется круг загрузки.
     *
     * После начальной инициализации, добавляются события и создается svg объект, через который реализован круг загрузки.
     * Svg это технология, реализующая векторную графику.
     *
     * @constructor
     */
    constructor() {
        this.progress = document.querySelector('.progress');
        this.value = parseInt(document.getElementsByClassName('progress-api__value')[0].value);
        this.angle = Math.PI;
        this.strokeWidth = 8;
        this.firstColor = "#ffcc00";
        this.secondColor = "#bdbdbd";

        if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
            this.length = window.innerWidth/4;
            this.progress.style.marginLeft = (- this.length) + "px";
        } else {
            this.length = window.innerHeight/4;
            this.progress.style.marginTop = (- this.length) + "px";
        }

        this.radius = this.length - this.strokeWidth*2;

        this.addEvent();

        this.create();
    }

    /** @description
     * При изменении ориентации экрана обнуляется старое значение отступа и вычисляется новое, чтобы блок находился по центру по вертикали/горизонтали.
     */
    addEvent() {
        window.addEventListener('orientationchange', function () {
            if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
                this.progress.style.marginTop = "0";
                this.progress.style.marginLeft = (- this.progress.offsetWidth/2) + "px";
            } else {
                this.progress.style.marginLeft = "0";
                this.progress.style.marginTop = (- this.progress.offsetHeight/2) + "px";
            }
        }.bind(this));
    }

    /** @description
     * Функция отрисовывает круг определенного цвета через svg.
     * @param color - цвет круга, рисуемого в блоке svg.
     */
    drawCircle(color) {
        this.svgElement.innerHTML =
            `<circle r="${this.radius}" cx="${this.length}" cy="${this.radius + this.strokeWidth}" 
                fill="none" stroke="${color}" stroke-width="${this.strokeWidth}px"/>`;
    }

    /** @description
     * Функция отрисовывает две дуги цвета this.firstColor и this.secondColor через svg.
     * В конечном счёте эти дуги образуют круг, отображающий процесс загрузки чего-либо.
     * Дуга в svg задается рядом параметров.
     * @param x - координата x первой точки дуги
     * @param y - координата y первой точки дуги
     * @param dx - координата x второй точки дуги
     * @param dy - координата y второй точки дуги
     * @param flag - флаг, который определяет, какую дугу рисовать: большую или меньшую.
     */
    drawCurves(x, y, dx, dy, flag) {
        this.svgElement.innerHTML =
            `<path d="M ${x} ${y} 
            A ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" 
            stroke="${this.firstColor}" stroke-width="${this.strokeWidth}px" fill="none"></path>
            <path d="M ${x} ${y} 
            A ${this.radius} ${this.radius} 0 ${1 - flag},0 ${dx} ${dy}" 
            stroke="${this.secondColor}" stroke-width="${this.strokeWidth}px" fill="none"></path>`;
    }

    /** @description
     * Функция с помощью полярных координат вычисляет координаты двух точек на круге, исходя из которых рисуются дуги загрузки
     * функцией drawCurves.
     */
    draw() {
        if (this.value === 0) {
            this.drawCircle(this.secondColor);
            return;
        } else if (this.value === 100) {
            this.drawCircle(this.firstColor);
            return;
        }
        let x = (this.radius * Math.sin(this.angle) + this.length).toPrecision(7);
        let y = (this.radius * Math.cos(this.angle) + this.radius + this.strokeWidth).toPrecision(7);
        let dx = (this.radius * Math.sin(-Math.PI*2*(this.value/100) + this.angle) + this.length).toPrecision(7);
        let dy = (this.radius * Math.cos(-Math.PI*2*(this.value/100) + this.angle) + this.strokeWidth + this.radius).toPrecision(7);

        this.drawCurves(x, y, dx, dy, this.value > 50 ? 1 : 0);
    }

    /** @description
     * Функция создает html элемент svg в блоке progress, исходя из выбранных размеров блока this.length.
     * После этого, запоминается svg элемент и вызывается функция отрисовки дуг.
     */
    create() {
        document.getElementsByClassName('progress')[0].innerHTML =
            `<svg width="${this.length*2}" height="${this.length*2}" xmlns="http://www.w3.org/2000/svg"></svg>`;
        this.svgElement = document.getElementsByTagName('svg')[0];

        this.draw();
    }

    /** @description
     * Изменение состояния анимации блока.
     * При включениии режима анимации, запускается функция rotationAnimation, которая отвечает за анимацию вращения.
     * При выключении режима анимации, отменяется следующий вызов функции анимации в стеке отрисовки браузера.
     *
     * @param mode - выбор устанавливаемого режима:
     * 'animated' - режим анимации
     * 'hidden' - режим скрытия блока
     * 'normal' - базовое состояние
     * @param state - устанавливаемое значение для выбранного режима:
     * 'yes' - выполнение выбраного режима
     *  '' - отключение выбранного режима
     */
    setMod(mode, state) {
        if (mode === 'animated') {
            if (state === 'yes') {
                this.rotationAnimation();
            } else if (state === '') {
                cancelAnimationFrame(this.rotationAnimationId);
            }
        } else if (mode === 'hidden') {
            if (state === 'yes') {
                this.svgElement.style.opacity = '0';
            } else if (state === '') {
                this.svgElement.style.opacity = '1';
            }
        } else if (mode === 'normal') {
            if (state === 'yes') {
                this.angle = Math.PI;
                this.draw();
            }
        }
    }

    /** @description
     * Изменение значения загрузки объекта.
     * При вызове функции происходит плавное изменение полосы загрузки блока progress.
     *
     * Если входное значение value не соответствует требованиям, функция завершает свою работу.
     * После проверки value, проверяется наличие другой работающей анимации changeValueAnimation.
     * Если она есть, эта анимация завершается через cancelAnimationFrame, и вызывается новая.
     * Если другой анимации не было обнаружено, тогда просто вызывается функция анимации changeValueAnimation.
     * @param value - значение загрузки, может принимать значеня от 0 до 100, значения должны быть числового типа.
     */
    setValue(value) {
        if (isNaN(value) || typeof  value !== "number" || value > 100 || value < 0 || value === this.value) {
            return;
        }
        if (this.valueAnimationId === null) {
            this.changeValueAnimation(value);
        } else {
            cancelAnimationFrame(this.valueAnimationId);
            this.changeValueAnimation(value);
        }
    }

    /** @description
     * Функция реализует анимацию через рекурсию и команду requestAnimationFrame.
     * Сначала запоминается время начала работы анимации, также значени дублируется в prev для вычислений ниже.
     */
    rotationAnimation() {
        let start = performance.now();
        let prev = start;

        /**
         * Вычисляется и запоминается время, прошедшее от предыдущей отрисовки и от начала анимации.
         * prev принимает значение текущего времени.
         * Далее с помощью функции offset вычисляется угол, на который должен повернутся круг, учитывая время предудщей отрисовки
         * и время от начала работы.
         * После этого происходит отрисовка круга загрузки и повторный вызов requestAnimationFrame, а также запоминание
         * номера, возвращаемого requestAnimationFrame, чтобы иметь возможность отменить вызов в будущем.
         * @type {Number} - время от начала загрузки страницыв милисекундах.
         */
        this.rotationAnimationId = requestAnimationFrame(function animation(time) {
            let tick = time - prev;
            let timePassed = time - start;
            prev = time;

            this.angle -= offset(tick, timePassed);
            this.draw();

            this.rotationAnimationId = requestAnimationFrame(animation.bind(this));
        }.bind(this));

        /**
         * Вспомагательная функция offset, вычисляющая угол, на который следует повернуть круг загрузки.
         * Период анимации - 2 секнуды.
         * В первую секунду происходит равномерный рост скорости анимации вращения.
         * Во вторую же равномерный спад.
         * Так как средняя скорость равна 0.5 * Math.PI * 4, за две секунды круг загрузки производит два оборота по
         * часовой стрелке.
         * @param tick - время с последней отрисовки
         * @param timePassed - время с начала анимации
         * @returns {number} - угол в радианах, на который должен повернутся круг загрузки.
         */
        function offset(tick, timePassed) {
            const period = 2;
            const milisecondsPerSecond = 1000;

            timePassed = timePassed/milisecondsPerSecond % period;
            if (timePassed > period/2) {
                return   (period - timePassed) * Math.PI * 4 * (tick/milisecondsPerSecond);
            } else {
                return timePassed * Math.PI * 4 * (tick/milisecondsPerSecond);
            }
        }
    }

    /** @description
     * Функция плавно в течение 0.5 секунд изменяет старое значени value на новое.
     * Запоминается разность между конечным и текущим значением value, а так же время начала анимации.
     * @param finalValue - конечное значение value
     */
    changeValueAnimation(finalValue) {
        let prev = performance.now();
        let differenceOfValues = finalValue - this.value;

        /**
         * Вычисляется и запоминается время, прошедшее от предыдущей отрисовки.
         * prev принимает значение текущего времени.
         * Время анимации - 0.5 секунд.
         *
         * Далее вычисляется новое значение newValue.
         * Сначала считается отношение времени от предыдущей отрисовки до текущей к времени всей анимации, потом умножается
         * на разность конечного и начального значения value. Так мы получаем число, которое надо прибавить к текущему this.value,
         * чтобы получить анимацию.
         *
         * После этого происходит проверка, входит ли в допустимый диапазон значение newValue, и если что, значение корректируется.
         * Затем, если newValue равен или больше finalValue с положительной разностью differenceOfValues или равен и меньше finalValue
         * с отрицательной разностью, то тогда происходит последняя отрисовка и работа анимации завершается. Иначе, анимация продолжается до тех пор,
         * пока значение newValue не достигнет finalValue.
         * @type {Number} - время от начала загрузки страницыв милисекундах.
         */
        this.valueAnimationId = requestAnimationFrame(function animation(time) {
            let tick = time - prev;
            prev = time;

            const timeAnimation = 500;

            let newValue = (tick/timeAnimation)*differenceOfValues + this.value;
            if (newValue > 100) {
                newValue = 100;
            } else if (newValue < 0) {
                newValue = 0;
            }

            if ((differenceOfValues > 0 && newValue >= finalValue) || (differenceOfValues < 0 && newValue <= finalValue)) {
                this.value = finalValue;
                this.draw();
                this.valueAnimationId = null;
            } else {
                this.value = newValue;
                this.draw();
                this.valueAnimationId = requestAnimationFrame(animation.bind(this));
            }
        }.bind(this))
    }
}

let progress = new Progess();