const Modals = class Modals {
    constructor({modalsSelector, modalsOpenerSelector, openedClass}){
        this.modalsSelector = modalsSelector;
        this.modalsOpenerSelector = modalsOpenerSelector;
        this.openedClass = openedClass;
    }
    openModal(id) {
        if (!document.querySelector(`[${this.modalsSelector}="${id}"]`)) return;
        document.querySelector(`[${this.modalsSelector}="${id}"]`).classList.add(this.openedClass);
    }
    closeModal(id) {
        if (!document.querySelector(`[${this.modalsSelector}="${id}"]`)) return;
        document.querySelector(`[${this.modalsSelector}="${id}"]`).classList.remove(this.openedClass);
    }
    addClickListener() {
        document.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.dataset.modalId) {
                this.openModal(event.target.dataset.modalId);
            }
            if (!event.target.dataset.modalId && event.target.dataset.modal) {
                this.closeModal(document.querySelector(`[${this.modalsSelector}].isOpened`).dataset.modal);
            }
        })
    }
    addKeyupListener() {
        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 27 && document.querySelector(`[${this.modalsSelector}].isOpened`)) {
                this.closeModal(document.querySelector(`[${this.modalsSelector}].isOpened`).dataset.modal);
            }
        })
    }
    init() {
        if (!this.modalsSelector && this.modalsOpenerSelector) return;
        this.addClickListener();
        this.addKeyupListener();
    }
}

export default Modals;