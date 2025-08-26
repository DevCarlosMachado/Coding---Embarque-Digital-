const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultElement = document.getElementById('result');


const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

// Função para buscar e popular as moedas
async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Pega a lista de moedas do objeto 'rates'
        const currencies = Object.keys(data.rates);

        // Adiciona cada moeda aos dropdowns
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });

        // Opcional: define um valor padrão para os dropdowns
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'BRL';

    } catch (error) {
        console.error('Erro ao buscar as moedas:', error);
        alert('Não foi possível carregar a lista de moedas. Tente novamente mais tarde.');
    }
}

async function convertCurrency() {
    // Pega os valores do formulário
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Valida se o valor digitado é válido
    if (amount <= 0 || !amount) {
        resultElement.textContent = 'Por favor, digite um valor válido.';
        return;
    }

    // Define a URL da API com a moeda de origem selecionada
    const conversionUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(conversionUrl);
        const data = await response.json();

        // Pega a taxa de conversão da moeda de destino
        const rate = data.rates[toCurrency];

        if (rate) {
            // Calcula o resultado e formata para 2 casas decimais
            const convertedAmount = (amount * rate).toFixed(2);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            resultElement.textContent = 'Erro: Taxa de conversão não encontrada.';
        }

    } catch (error) {
        console.error('Erro ao converter:', error);
        resultElement.textContent = 'Erro ao buscar a taxa de conversão. Tente novamente.';
    }
}

convertBtn.addEventListener('click', convertCurrency);
// Chama a função para buscar as moedas quando a página carrega
fetchCurrencies();