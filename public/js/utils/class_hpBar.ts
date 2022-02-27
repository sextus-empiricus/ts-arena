export class ProgressBar {
    valueElement: HTMLElement
    fillElement: HTMLElement
    private value: number;
    public actualHp: number;
    public fullHp: number;

    constructor(element: HTMLDivElement, maxHp: number) {
        this.valueElement = element.querySelector('.progress-bar-value');
        this.fillElement = element.querySelector('.progress-bar-fill');
        this.fullHp = maxHp;
        this.actualHp = maxHp;
        this.setValue(100);
    }

    private setValue(newValue: number) {
        if (newValue < 0) {
            newValue = 0;
        }
        if (newValue > 100) {
            newValue = 100;
        }
        this.value = newValue;
        this.update();
    }

    private update() {
        const percentage = this.value + '%';
        this.fillElement.style.width = percentage;
        this.valueElement.textContent = percentage;
    }

    public hit(hitPower: number) {
        this.actualHp -= hitPower;
        const newHp = this.actualHp * 100 / this.fullHp;
        this.setValue(Math.round(newHp));
        this.update()
    }
}