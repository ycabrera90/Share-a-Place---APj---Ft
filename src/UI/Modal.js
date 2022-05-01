export class Modal {
    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.modalTemplateEl = document.getElementById('modal-template');
        this.modalContentEl = document.getElementById(contentId);
    }

    show() {
        // chequear que el navegador soporta la opción de templates
        if ('content' in document.createElement('template')) {
            const modalTemplate = document.importNode(
                this.modalTemplateEl.content,
                true
            );

            const modalTemplateContent = document.importNode(
                this.modalContentEl.content,
                true
            );

            this.modalElement = modalTemplate.querySelector('.modal');
            this.modalElement.appendChild(modalTemplateContent);
            this.backdrop = modalTemplate.querySelector('.backdrop');

            document.body.insertAdjacentElement(
                'afterbegin',
                this.modalElement
            );
            document.body.insertAdjacentElement('afterbegin', this.backdrop);
        } else {
            alert(this.fallbackText);
        }
    }
    hide() {
        if (this.modalElement) {
            document.body.removeChild(this.modalElement);
            document.body.removeChild(this.backdrop);
            this.modalElement = null;
            this.backdrop = null;
        }
    }
}
