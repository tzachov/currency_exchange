class QuoteWidget extends HTMLElement {

    currentRequest = {
        amount: 1000
    };
    bl;
    shadow;

    constructor() {
        super();
        this.bl = new BL();

        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        const div = document.createElement('div');

        style.textContent = getQuoteWidgetStyle();
        div.innerHTML = getQuoteWidgetTemplate();
        div.classList.add('widget-container', 'loading');

        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }

    connectedCallback() {
        this.shadow.querySelector('#reloadButton').addEventListener('click', () => {
            this.loadWidget();
        });

        this.loadWidget();
    }

    async loadWidget() {
        const container = this.shadow.querySelector('.widget-container');
        container.classList.remove('error');
        container.classList.add('loading');

        try {
            const res = await this.bl.getSupportedCurrencies();
            this.populateDropdowns(res);
            this.showForm();
        } catch (err) {
            this.showFatalError(err.message);
        }
    }

    async convert() {
        const container = this.shadow.querySelector('#result');
        container.classList.remove('visible');
        if (!this.validateRequest()) {
            return;
        }

        this.toggleSpinner(true);

        const { amount, from, to } = this.currentRequest;
        try {
            const result = await this.bl.convert(from, to, amount);

            this.shadow.querySelector('#resultFromCurrency').textContent = `${amount} ${from} = `;
            const converted = this.shadow.querySelector('#convertedAmount');
            converted.textContent = result.amount.toFixed(5);
            converted.title = `${result.amount}${to}`;
            this.shadow.querySelector('#convertedCurrency').textContent = to;
            this.shadow.querySelector('#exchangeRate').textContent = `1 ${from} = ${result.exchange_rate} ${to}`;

            this.toggleSpinner(false);
            container.classList.add('visible');
        } catch (error) {
            this.showConversionError(error.message);
        }
    }

    swapCurrencies() {
        const fromList = this.shadow.querySelector('#fromCurrency');
        const toList = this.shadow.querySelector('#toCurrency');
        const temp = fromList.value;
        fromList.value = toList.value;
        toList.value = temp;

        this.currentRequest.to = toList.value;
        this.currentRequest.from = fromList.value;
    }

    populateDropdowns(list) {
        const fromList = this.shadow.querySelector('#fromCurrency');
        const toList = this.shadow.querySelector('#toCurrency');
        fromList.appendChild(document.createElement('option'));
        toList.appendChild(document.createElement('option'));

        list.forEach(item => {
            const e = document.createElement('option');
            e.innerText = item.code;
            e.value = item.code;
            e.title = item.name;

            fromList.appendChild(e);
            toList.appendChild(e.cloneNode(true));
        });
    }

    showForm() {
        const container = this.shadow.querySelector('.widget-container');
        container.querySelector('#amount').value = this.currentRequest.amount;
        let amountDefer;
        container.querySelector('#amount').addEventListener('input', (e) => {
            if (!!amountDefer) {
                clearTimeout(amountDefer);
            }

            amountDefer = setTimeout(() => {
                this.currentRequest.amount = container.querySelector('#amount').value;
                this.convert();
            }, 250);
        });

        container.querySelector('#fromCurrency').addEventListener('change', (e) => {
            this.currentRequest.from = e.target.value;
            this.convert();
        });

        container.querySelector('#toCurrency').addEventListener('change', (e) => {
            this.currentRequest.to = e.target.value;
            this.convert();
        });
        container.querySelector('#swap').addEventListener('click', (e) => {
            this.swapCurrencies();
            this.convert();
        });

        container.classList.remove('loading', 'error');
        container.classList.add('loaded');
    }

    showFatalError(error) {
        const container = this.shadow.querySelector('.widget-container');
        container.classList.remove('loading');
        this.shadow.querySelector('#fatalReason').textContent = error;
        container.classList.add('error');
    }

    showConversionError(error) {
        this.shadow.querySelector('#failReason').textContent = error;
        const container = this.shadow.querySelector('.widget-container');
        container.classList.remove('converting');
        container.classList.add('conversion-error');
    }

    validateRequest() {
        const { amount, from, to } = this.currentRequest;
        return !!amount && !!from && !!to;
    }

    toggleSpinner(show) {
        const container = this.shadow.querySelector('.widget-container');
        if (show) {
            container.classList.add('converting');
        } else {
            container.classList.remove('converting');
        }
    }
}

customElements.define('quote-widget', QuoteWidget);

