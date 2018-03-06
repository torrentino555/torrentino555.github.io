class Progess {
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

    drawCircle(color) {
        this.svgElement.innerHTML =
            `<circle r="${this.radius}" cx="${this.length}" cy="${this.radius + this.strokeWidth}" 
                fill="none" stroke="${color}" stroke-width="${this.strokeWidth}px"/>`;
    }

    drawCurves(x, y, dx, dy, flag) {
        this.svgElement.innerHTML =
            `<path d="M ${x} ${y} 
            A ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" 
            stroke="${this.firstColor}" stroke-width="${this.strokeWidth}px" fill="none"></path>
            <path d="M ${x} ${y} 
            A ${this.radius} ${this.radius} 0 ${1 - flag},0 ${dx} ${dy}" 
            stroke="${this.secondColor}" stroke-width="${this.strokeWidth}px" fill="none"></path>`;
    }

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

    create() {
        document.getElementsByClassName('progress')[0].innerHTML =
            `<svg width="${this.length*2}" height="${this.length*2}" xmlns="http://www.w3.org/2000/svg"></svg>`;
        this.svgElement = document.getElementsByTagName('svg')[0];

        this.draw();
    }

    setMod(mode, state) {
        if (mode === 'animated') {
            if (state === 'yes') {
                this.rotationAnimation();
            } else if (state === '') {
                cancelAnimationFrame(this.rotationAnimationId);
            }
        }
    }

    setValue(value) {
        if (isNaN(value) || typeof  value !== "number" || value > 100 || value < 0 || value === this.value) {
            return;
        }
        if (this.valueAnimationId === null) {
            this.valueAnimation(value);
        } else {
            cancelAnimationFrame(this.valueAnimationId);
            this.valueAnimation(value);
        }
    }

    rotationAnimation() {
        let start = performance.now();
        let prev = start;

        this.rotationAnimationId = requestAnimationFrame(function animation(time) {
            let tick = time - prev;
            let timePassed = time - start;
            prev = time;

            this.angle -= offset(tick, timePassed);
            this.draw();

            this.rotationAnimationId = requestAnimationFrame(animation.bind(this));
        }.bind(this));

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

    valueAnimation(finalValue) {
        let prev = performance.now();
        let differenceOfValues = finalValue - this.value;

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