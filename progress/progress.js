class Progess {
    constructor() {
        this.value = 40;
        this.angle = Math.PI;
        if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
            this.width = window.innerWidth/2;
            this.height = this.width;
            this.radius = this.width/2 - 16;
        } else {
            this.width = window.innerWidth * 0.3;
            this.height = window.innerHeight / 2;
            this.radius = Math.min(this.height, this.width) / 2 - 16;
        }
        this.create();
    }

    draw() {
        let size = Math.min(this.height, this.width);
        if (this.value === 0) {
            document.getElementsByTagName('svg')[0].innerHTML = `
                <circle r="${this.radius}" cx="${size/2}" cy="${this.radius + 8}" fill="none" stroke="#bdbdbd" stroke-width="8px"/>
            `;
            return;
        } else if (this.value === 100) {
            document.getElementsByTagName('svg')[0].innerHTML = `
                <circle r="${this.radius}" cx="${size/2}" cy="${this.radius + 8}" fill="none" stroke="#ffcc00" stroke-width="8px"/>
            `;
            return;

        }
        let flag = this.value > 50 ? 1 : 0;
        let x = this.radius * Math.sin(-Math.PI*2*(this.value/100) + this.angle) + size/2;
        let y = this.radius * Math.cos(-Math.PI*2*(this.value/100) + this.angle) + 8;
        let x1 = (this.radius * Math.sin(this.angle) + size/2).toPrecision(7);
        let y1 = (this.radius * Math.cos(this.angle) + this.radius + 8).toPrecision(7);
        let dx = x.toPrecision(7);
        let dy = (y + this.radius).toPrecision(7);

        document.getElementsByTagName('svg')[0].innerHTML =
            `<path d="M ${x1} ${y1} 
            A ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" stroke="#ffcc00" stroke-width="8px" fill="none"></path>
            <path d="M ${x1} ${y1} 
            A ${this.radius} ${this.radius} 0 ${flag ? 0 : 1},0 ${dx} ${dy}" stroke="#bdbdbd" stroke-width="8px" fill="none"></path>`;
    }

    create() {
        let flag = this.value > 50 ? 1 : 0;
        let x = this.radius * Math.sin(-Math.PI*2*(this.value/100) + this.angle);
        let y = this.radius * Math.cos(-Math.PI*2*(this.value/100) + this.angle);
        let dx = x.toPrecision(7);
        let dy = (y + this.radius).toPrecision(7);
        let size = Math.min(this.height, this.width);

        document.getElementsByClassName('progress')[0].innerHTML =
            `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <path d="M ${size/2} ${8} 
            a ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" stroke="#ffcc00" stroke-width="8px" fill="none"></path>
            <path d="M ${size/2} ${8} 
            a ${this.radius} ${this.radius} 0 ${flag ? 0 : 1},0 ${dx} ${dy}" stroke="#bdbdbd" stroke-width="8px" fill="none"></path>
            </svg>`;
    }
}

let progress = new Progess();

document.getElementsByClassName('progress-api__value')[0].addEventListener('input', function () {
    if (this.value > 100) {
        this.value = '100';
    } else if (this.value < 0) {
        this.value = '0';
    }

    progress.valueAnimation = parseInt(this.value === '' ? 0 : this.value) - progress.value;
    valueAnimate(parseInt(this.value === '' ? 0 : this.value) - progress.value);
});

document.getElementsByClassName('progress-api__animation')[0].addEventListener('click', function () {
    progress.animation = this.checked;
    if (this.checked) {
        animate();
    }
});

document.getElementsByClassName('progress-api__hide')[0].addEventListener('click', function () {
    if (this.checked) {
        document.getElementsByTagName('svg')[0].style.opacity = '0';
    } else {
        document.getElementsByTagName('svg')[0].style.opacity = '1';
    }
});

function speed(start, time) {
    time %= 2000;
    time /= 1000;
    if (time > 1) {
        return   (2 - time) * 180 * start / 15000
    } else {
        return time * 180 * start / 15000;
    }
}

function animate() {
    let start = performance.now();
    let prev = start;

    requestAnimationFrame(function animate(time) {
        let tick = time - prev;
        let timePassed = time - start;
        prev = time;

        progress.angle -= speed(tick, timePassed);
        progress.draw();

        if (progress.animation) {
            requestAnimationFrame(animate);
        }

    });
}

function helper(tick, value) {
    return (tick/500)*value;
}

function valueAnimate(value) {
    let start = performance.now();
    let prev = start;
    let finalValue = value + progress.value;

    requestAnimationFrame(function animate(time) {
        let tick = time - prev;
        let timePassed = time - start;
        prev = time;

        let change  = helper(tick, value);
        if (progress.valueAnimation !== value) {
            return;
        } else if (change + progress.value > 100 || change + progress.value < 0 || timePassed >= 500) {
            progress.value = finalValue;
            progress.draw();
        } else {
            progress.value += change;
            progress.draw();
            requestAnimationFrame(animate);
        }
    })
}


let progressApi = document.getElementsByClassName('progress-api')[0];
let progressElement = document.getElementsByClassName('progress')[0];
if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
    progressApi.style.marginLeft = (- progressApi.offsetWidth/2) + "px";
    progressElement.style.marginLeft = (- progressElement.offsetWidth/2) + "px";
} else {
    progressApi.style.marginTop = (- progressApi.offsetHeight/2) + "px";
    progressElement.style.marginTop = (- progressElement.offsetHeight/2) + "px";
}

window.addEventListener('orientationchange', function () {
    if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
        progressApi.style.marginTop = "0";
        progressElement.style.marginTop = "0";
        progressApi.style.marginLeft = (- progressApi.offsetWidth/2) + "px";
        progressElement.style.marginLeft = (- progressElement.offsetWidth/2) + "px";
    } else {
        progressApi.style.marginLeft = "0";
        progressElement.style.marginLeft = "0";
        progressApi.style.marginTop = (- progressApi.offsetHeight/2) + "px";
        progressElement.style.marginTop = (- progressElement.offsetHeight/2) + "px";
    }
});