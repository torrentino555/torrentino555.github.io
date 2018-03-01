class Progess {
    constructor() {
        this.value = 40;
        this.angle = Math.PI;
        this.width = window.innerWidth*0.3;
        this.height = window.innerHeight/2;
        this.radius = Math.min(this.height, this.width)/2 - 12;
        this.create();
    }

    draw() {
        let flag = this.value > 50 ? 1 : 0;
        let x = this.radius * Math.sin(-Math.PI*2*(this.value/100) + this.angle) + this.width/2;
        let y = this.radius * Math.cos(-Math.PI*2*(this.value/100) + this.angle) + 6;
        let x1 = (this.radius * Math.sin(this.angle) + this.width/2).toPrecision(7);
        let y1 = (this.radius * Math.cos(this.angle) + this.radius + 6).toPrecision(7);
        let dx = x.toPrecision(7);
        let dy = (y + this.radius).toPrecision(7);

        document.getElementsByTagName('svg')[0].innerHTML = `
            <!--<path d="M ${x1} ${y1} L ${dx} ${dy}" stroke="#000000"></path>-->
            <!--<path d="M ${window.innerWidth/4} ${window.innerHeight*0.1} a ${this.radius} ${this.radius} 0 1,1 ${-this.radius} ${this.radius}" stroke="#f8f32b" stroke-width="6px" fill="none"></path>-->
            <path d="M ${x1} ${y1} 
            A ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" stroke="#f8f32b" stroke-width="6px" fill="none"></path>
            <path d="M ${x1} ${y1} 
            A ${this.radius} ${this.radius} 0 ${flag ? 0 : 1},0 ${dx} ${dy}" stroke="#a5a5a5" stroke-width="6px" fill="none"></path>`;
    }

    create() {
        let flag = this.value > 50 ? 1 : 0;
        let x = this.radius * Math.sin(-Math.PI*2*(this.value/100) + this.angle);
        let y = this.radius * Math.cos(-Math.PI*2*(this.value/100) + this.angle);
        let dx = x.toPrecision(7);
        let dy = (y + this.radius).toPrecision(7);

        document.body.innerHTML = `
        <div class="icon">
            <svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">
            <path d="M ${this.width/2} ${6} 
            a ${this.radius} ${this.radius} 0 ${flag},1 ${dx} ${dy}" stroke="#f8f32b" stroke-width="6px" fill="none"></path>
            <path d="M ${this.width/2} ${6} 
            a ${this.radius} ${this.radius} 0 ${flag ? 0 : 1},0 ${dx} ${dy}" stroke="#a5a5a5" stroke-width="6px" fill="none"></path>
            </svg>
        </div>` + document.body.innerHTML;
    }
}

let progress = new Progess();

document.getElementById('value').addEventListener('input', function () {
    progress.value = this.value;
    progress.draw();
});

document.getElementById('animation').addEventListener('click', function () {
    console.log(this.checked);
    progress.animation = this.checked;
    if (this.checked) {
        animate();
    }
});

function speed(start, time) {
    time %= 2000;
    time /= 1000;
    if (time > 1) {
        return   (2 - time) * 180 * start / 10000
    } else {
        return time * 180 * start / 10000;
    }
}

function animate() {
    let start = performance.now();
    let prev = start;

    requestAnimationFrame(function animate(time) {
        let tick = time - prev;
        let timePassed = time - start;
        prev = time;

        console.log(speed(tick, timePassed));

        progress.angle -= speed(tick, timePassed);
        progress.draw();

        if (progress.animation) {
            requestAnimationFrame(animate);
        }

    });
}