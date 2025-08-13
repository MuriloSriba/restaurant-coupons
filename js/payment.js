document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    const paymentForm = document.getElementById('paymentForm');
    const pixPaidBtn = document.getElementById('pixPaidBtn');
    const paymentFeedback = document.getElementById('payment-feedback');
    const pixQrCodeImage = document.getElementById('pixQrCodeImage');
    const pixCopyPasteCode = document.getElementById('pixCopyPasteCode');
    const pixCopyButton = document.getElementById('pixCopyButton');
    const pixLoading = document.getElementById('pixLoading');

    // New address input elements for PIX
    const pixStreetNameElement = document.getElementById('pixStreetName');
    const pixStreetNumberElement = document.getElementById('pixStreetNumber');
    const pixCityElement = document.getElementById('pixCity');
    const pixStateElement = document.getElementById('pixState');
    const pixZipCodeElement = document.getElementById('pixZipCode');

    const publicKey = 'TEST-4f89ed7c-eb97-48a2-a7c1-a056df9601a1'; // Substitua pela sua chave pública
    const mercadopago = new MercadoPago(publicKey, { locale: 'pt_BR' }); // Adicionado locale

    // Initialize secure fields
    const cardNumberElement = mercadopago.fields.create('cardNumber', {
        placeholder: "0000 0000 0000 0000"
    }).mount('form-checkout__cardNumber');

    const expirationDateElement = mercadopago.fields.create('expirationDate', {
        placeholder: "MM/AA"
    }).mount('form-checkout__expirationDate');

    const securityCodeElement = mercadopago.fields.create('securityCode', {
        placeholder: "123"
    }).mount('form-checkout__securityCode');

    const cardholderNameElement = document.getElementById('form-checkout__cardholderName');
    const cardholderEmailElement = document.getElementById('form-checkout__cardholderEmail');
    const identificationTypeElement = document.getElementById('form-checkout__identificationType');
    const identificationNumberElement = document.getElementById('form-checkout__identificationNumber');
    const installmentsElement = document.getElementById('form-checkout__installments');

    // Fetch identification types
    async function getIdentificationTypes() {
        console.log('Fetching identification types...');
        try {
            const identificationTypes = await mercadopago.getIdentificationTypes();
            console.log('Identification types fetched:', identificationTypes);
            identificationTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                identificationTypeElement.appendChild(option);
            });
            console.log('Identification types populated.');
        } catch (error) {
            console.error('Error fetching identification types:', error);
        }
    }

    // Fetch installments
    async function getInstallments(bin, amount) {
        console.log(`Fetching installments for BIN: ${bin}, Amount: ${amount}...`);
        const params = {
            bin: bin,
            amount: amount,
            payment_type_id: 'credit_card',
            currency_id: 'BRL',
            locale: 'pt_BR',
        };
        console.log('Parameters sent to getInstallments:', params);
        try {
            const installments = await mercadopago.getInstallments(params);

            console.log('Installments fetched:', installments);
            installmentsElement.innerHTML = ''; // Clear previous options

            if (installments && installments.length > 0) {
                installments[0].payer_costs.forEach(payerCost => {
                    const option = document.createElement('option');
                    option.value = payerCost.installments;
                    option.textContent = payerCost.recommended_message;
                    installmentsElement.appendChild(option);
                });
                console.log('Installments populated.');
            } else {
                installmentsElement.innerHTML = '<option value="1">1x de R$ 25,00</option>';
                console.log('No installments available.');
            }
        } catch (error) {
            console.error('Error fetching installments:', error); // Log the full error object
            installmentsElement.innerHTML = '<option value="1">1x de R$ 25,00</option>';
        }
    }

    // Listen for changes in card number to get BIN and then installments
    cardNumberElement.on('binChange', async (data) => {
        console.log('Card number BIN changed.');
        const bin = data.bin;
        if (bin) {
            console.log('BIN detected:', bin);
            await getInstallments(bin, '25.00');
        } else {
            installmentsElement.innerHTML = '<option value="">Selecione as parcelas</option>';
            console.log('No BIN detected.');
        }
    });

    // Initialize identification types on page load
    getIdentificationTypes();

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            console.log('Tab clicked:', tab.dataset.target);
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));

            tab.classList.add('active');
            const targetContent = document.getElementById(tab.dataset.target);
            targetContent.classList.add('active');

            if (tab.dataset.target === 'pix') {
                pixQrCodeImage.style.display = 'none';
                pixCopyPasteCode.textContent = '';
                pixLoading.style.display = 'block'; // Show loading message
                
                try {
                    // Get address information for PIX
                    const streetName = pixStreetNameElement.value.trim();
                    const streetNumber = parseInt(pixStreetNumberElement.value.trim());
                    const city = pixCityElement.value.trim();
                    const state = pixStateElement.value.trim();
                    const zipCode = pixZipCodeElement.value.trim();

                    // Basic validation for address fields
                    if (!streetName || isNaN(streetNumber) || !city || !state || !zipCode) {
                        showFeedback('error', 'Por favor, preencha todos os campos de endereço para PIX.');
                        pixLoading.style.display = 'none'; // Hide loading message
                    }

                    const response = await fetch('/api/pix-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            amount: 25.00,
                            description: 'Assinatura Mensal FoodCupons - PIX',
                            additional_info: {
                                payer: {
                                    address: {
                                        street_name: streetName,
                                        street_number: streetNumber,
                                        city: city,
                                        state: state,
                                        zip_code: zipCode,
                                    },
                                },
                            },
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('PIX response data:', data);
                        pixQrCodeImage.src = `data:image/png;base64,${data.qrCodeBase64}`;
                        pixCopyPasteCode.textContent = data.qrCode;
                        pixQrCodeImage.style.display = 'block'; // Show QR code
                    } else {
                        const error = await response.json();
                        console.error('PIX error response:', error);
                        showFeedback('error', `Erro ao gerar PIX: ${error.error || response.statusText}`);
                    }
                } catch (error) {
                    showFeedback('error', `Erro na comunicação com o servidor para PIX: ${error.message}`);
                } finally {
                    pixLoading.style.display = 'none'; // Always hide loading message
                }
            }
        });
    });

    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        paymentFeedback.style.display = 'none';

        // Collect data from secure fields and other inputs
        const cardholderName = cardholderNameElement.value;
        const cardholderEmail = cardholderEmailElement.value;
        const identificationType = identificationTypeElement.value;
        const identificationNumber = identificationNumberElement.value;
        const installments = installmentsElement.value;

        // Basic client-side validation for non-secure fields
        if (!cardholderName || !cardholderEmail || !identificationType || !identificationNumber || !installments) {
            showFeedback('error', 'Por favor, preencha todos os campos do formulário.');
            return;
        }

        try {
            // Create card token using Mercado Pago SDK
            const token = await mercadopago.fields.createCardToken({
                cardholderName: cardholderName,
                cardholderEmail: cardholderEmail,
                identificationType: identificationType,
                identificationNumber: identificationNumber,
            });

            console.log('Card Token generated:', token.id);

            // Send token and other data to your backend
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you still need auth token
                },
                body: JSON.stringify({
                    token: token.id,
                    amount: 25.00, // Send the amount to the backend
                    description: 'Assinatura Mensal FoodCupons',
                    installments: parseInt(installments) || 1,
                    payment_method_id: token.payment_method_id, // Get from token
                    issuer_id: token.issuer_id, // Get from token
                    payer: {
                        email: cardholderEmail,
                        identification: {
                            type: identificationType,
                            number: identificationNumber,
                        },
                    },
                }),
            });

            if (response.ok) {
                showFeedback('success', 'Pagamento efetuado com sucesso! Atualizando status...');
                await updateUserPaymentStatusAndRedirect();
            } else {
                const error = await response.json();
                showFeedback('error', `Erro no pagamento: ${error.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            showFeedback('error', `Erro na comunicação com o servidor ou tokenização: ${error.message}`);
        }
    });

    pixCopyButton.addEventListener('click', () => {
        const pixCode = pixCopyPasteCode.textContent;
        navigator.clipboard.writeText(pixCode).then(() => {
            showFeedback('success', 'Código PIX copiado!');
        }).catch(err => {
            console.error('Erro ao copiar o código PIX:', err);
            showFeedback('error', 'Erro ao copiar o código PIX.');
        });
    });

    pixPaidBtn.addEventListener('click', async () => {
        // This part remains the same for PIX
        showFeedback('success', 'Pagamento PIX simulado com sucesso! Atualizando status...');
        // Simulate successful PIX payment and update user status
        await updateUserPaymentStatusAndRedirect();
    });

    async function updateUserPaymentStatusAndRedirect() {
        try {
            const currentToken = localStorage.getItem('token');
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!currentToken || !loggedInUser) {
                showFeedback('error', 'Usuário não logado. Redirecionando para o login...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
                return;
            }

            const response = await fetch('/api/auth/update-payment-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify({ userId: loggedInUser.id }) // Send user ID if needed by backend
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Update token with new status
                // Update loggedInUser object with new status
                const updatedUser = { ...loggedInUser, status: 'complete' };
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

                showFeedback('success', 'Status de pagamento atualizado com sucesso! Redirecionando...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            } else {
                const error = await response.json();
                showFeedback('error', `Erro ao atualizar status de pagamento: ${error.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Erro na atualização do status de pagamento:', error);
            showFeedback('error', `Erro na comunicação com o servidor ao atualizar status: ${error.message}`);
        }
    }

    function showFeedback(type, message) {
        paymentFeedback.textContent = message;
        paymentFeedback.className = `feedback-message ${type}`;
        paymentFeedback.style.display = 'block';
    }
});