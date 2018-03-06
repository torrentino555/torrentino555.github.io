class ProgressApi {
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

    addEvents() {
        this.value.addEventListener('input', function () {
            if (this.value > 100) {
                this.value = '100';
            } else if (this.value < 0) {
                this.value = '0';
            }
            progress.setValue(parseInt(this.value === '' ? 0 : this.value));
        });

        this.animation.addEventListener('click', function () {
            progress.setMod('animated', this.checked ? 'yes' : '');
        });

        this.hide.addEventListener('click', function (hide) {
            if (hide.checked) {
                this.svg.style.opacity = '0';
            } else {
                this.svg.style.opacity = '1';
            }
        }.bind(this, this.hide));

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