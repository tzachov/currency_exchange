function getQuoteWidgetTemplate() {
    return `
    <div class="loader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="84px" height="84px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path d="M24 50A26 26 0 0 0 76 50A26 30.3 0 0 1 24 50" fill="#e9edf3" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="0.5319148936170213s" repeatCount="indefinite" keyTimes="0;1" values="0 50 52.15;360 50 52.15"></animateTransform>
            </path>
        </svg>
    </div>
    <div class="fatal-error">
        <div>
            <svg class="icon exclamation" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="svg-inline--fa fa-exclamation-triangle fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
            <div class="text">
                <span>Could not load widget</span>
                <span id="fatalReason"></span>
            </div>
        </div>
        <button id="reloadButton">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo-alt" class="svg-inline--fa fa-redo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
        </button>
    </div>
    <div class="form-container">
        <div class="amount-container">
            <label for="amount">Amount:</label>
            <input type="number" class="amount-input" id="amount" />
        </div>
        <div class="currencies">
            <div class="select-container">
                <label for="fromCurrency">From:</label>
                <select class="currency-select" id="fromCurrency"></select>
            </div>
            <button id="swap" class="swap-button" title="Swap currencies">
                <svg class="arrow" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange-alt" class="svg-inline--fa fa-exchange-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path></svg>
            </button>
            <div class="select-container">
                <label for="toCurrency">To:</label>
                <select class="currency-select" id="toCurrency"></select>
            </div>
        </div>
    </div>
    <div class="error-container">
        Conversion failed: <span id="failReason"></span>
    </div>
    <div class="conversion-loader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 50px;margin:auto;background:#fff;display:block;" width="84px" height="84px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path d="M24 50A26 26 0 0 0 76 50A26 30.3 0 0 1 24 50" fill="#e9edf3" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="0.5319148936170213s" repeatCount="indefinite" keyTimes="0;1" values="0 50 52.15;360 50 52.15"></animateTransform>
            </path>
        </svg>
    </div>
    <div id="result">
        <div class="res-from-currency"><span id="resultFromCurrency"></span></div>
        <div class="res-converted"><span id="convertedAmount"></span>&nbsp;<span id="convertedCurrency"></span></div>
        <div class="res-rate"><span id="exchangeRate"></span></div>
    </div>`;
}

function getQuoteWidgetStyle() {
    return `
            :host {
                display: block;
                width: 500px;
                max-width: 100%;
                box-sizing: border-box;
            }

            :host * {
                box-sizing: border-box;
            }

            .widget-container {
                background: #fff;
                width: 500px;
                max-width: 100%;
                overflow: hidden;
                font-family: sans-serif;
                border-radius: 8px;
                border: 1px solid #ccc;
                padding: 8px;
                box-shadow: 0px 3px 10px rgb(35 55 80 / 20%);
            }
            
            .widget-container.error {
                border: 1px solid #c00;
            }

            .conversion-loader {
                display: none;
            }

            .widget-container.converting .conversion-loader {
                display: block;
            }

            .fatal-error {
                display: none;
                color: #c00;
                padding: 1em;
                align-items: center;
                justify-content: space-between;
            }

            .fatal-error .text {
                display: flex;
                flex-direction: column;
            }

            .fatal-error button {
                background: none;
                border: none;
                color: #aaa;
                cursor: pointer;
                transition: all .2s cubic-bezier(.38,.04,.6,1.29);
            }

            .fatal-error button:hover {
                transform: scale(1.2);
                color: #000;
            }

            .icon {
                width: 24px;
                height: 24px;
            }

            .fatal-error .exclamation {
                margin-right: 8px;
            }

            #fatalReason {
                font-size: 0.8em;
                color: #ab5050;
            }

            .fatal-error > div {
                display: flex;
                align-items: center;
            }

            .widget-container.error .fatal-error {
                display: flex;
            }

            .widget-container .form-container {
                display: none;
            }
            
            .widget-container.loaded .form-container {
                display: block;
                opacity: 1;
                display: flex;
                align-items: center;
                transition: all .2s ease-out;
            }

            .widget-container .loader {
                display: none;
            }

            .widget-container.loading .form-container {
                opacity: 0;
            }

            .widget-container.loading .loader {
                display: block;
            }

            .currencies {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 1;
                width: 100%;
            }

            label {
                font-size: 12px;
                padding: 0.2em 0;
                color: #777;
            }

            .amount-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 0 2px;
            }

            .amount-input {
                padding: 0.2em;
                font-size: 2em;
                width: 100%;
                text-align: center;
                border-radius: 8px;
                border: 1px solid #ccc;
                color: #777;
                outline: none;
                box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
            }

            .currency-select {
                min-width: 110px;
                width: 100%;
                padding: 0.2em;
                font-size: 2em;
                text-align: center;
                border-radius: 8px;
                border: 1px solid #ccc;
                color: #777;
                outline: none;
                box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
            }

            .amount-input:focus,
            .currency-select:focus {
                box-shadow: 0 0 6px rgba(0, 0, 0, .2);
            }

            .currency-select option {
                font-size: 1rem;
            }

            .select-container {
                display: flex;
                flex-direction: column;
                flex: 2;
                padding: 0 2px;
            }

            .swap-button {
                width: 24px;
                height: 24px;
                color: #aaa;
                transition: all .2s cubic-bezier(.38,.04,.6,1.29);
                border: none;
                background: none;
                margin: 18px 4px 0;
                padding: 0;
                cursor: pointer;
            }

            .swap-button:hover {
                color: #000;
                transform: scale(1.2);
            }

            #result {
                padding: 0.3em;
                border: 1px solid #ccc;
                display: none;
                line-height: 1.5;
                transition: all .3s cubic-bezier(.38,.04,.6,1.29);
                border-radius: 8px;
                background: linear-gradient(0deg, #efefef, transparent 80%);
            }

            #result.visible {
                margin: 8px 0 0;
                display: block;
                animation: slideIn .3s cubic-bezier(.38,.04,.6,1.29) forwards;
            }

            .res-from-currency {
                font-size: 1.1em;
                color: #aaa;
            }

            .res-converted {
                font-size: 1em;
                line-height: 1;
                padding: 6px 0 12px;
                text-align: center;
                color: #aaa;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #convertedAmount {
                color: #777;
                font-size: 2em;
            }

            .res-rate {
                font-size: 0.8em;
                color: #aaa;
            }

            .error-container {
                font-size: 0.8em;
                color: #c00;
                padding: 8px 4px 4px;
                display: none;
                transition: all .3s cubic-bezier(.38,.04,.6,1.29);
            }

            .widget-container.conversion-error .error-container {
                display: block;
                animation: slideIn .3s cubic-bezier(.38,.04,.6,1.29) forwards;
            }

            @media only screen and (max-width: 500px) {
                .widget-container .form-container {
                    flex-direction: column;
                    align-items: stretch;
                }

                #result.visible {
                    margin-top: 18px;
                }
            }

            @media only screen and (max-width: 300px) {
                .select-container {
                    width: 100%;
                }
                
                .currencies {
                    flex-direction: column;
                }

                .swap-button {
                    margin: 18px 0 0;
                }
            }

            @keyframes slideIn {
                0% {
                    opacity: 0;
                    transform: translateY(-100%);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
}