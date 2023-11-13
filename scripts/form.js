(function () {
    const Form = {
        agreeElement: null,
        processElement: null,

        fields: [
            {
                name: "name",
                id: "name",
                element: null,
                regex: /[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: "lastName",
                id: "last-name",
                element: null,
                regex: /[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: "email",
                id: "email",
                element: null,
                regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.[A-Za-z]{2,4}$/,
                valid: false,
            },
        ],
        init() {
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            })

            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm()
            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        },
        validateField(field, element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = "red";
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },
        validateForm() {
            const valudForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && valudForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid;
        },
        processForm() {
            if (this.validateForm()) {

                let paramString = '';
                this.fields.forEach(item => {
                    paramString += (!paramString ? '?' : "&") + item.name + "=" + item.element.value;
                })

                location.href = 'choice.html' + paramString;
            }
        }
    };
    Form.init();
})();