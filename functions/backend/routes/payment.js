const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Configure o Mercado Pago com suas credenciais (versão 1.x)
mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST_ACCESS_TOKEN');
console.log('Mercado Pago Access Token (first 5 chars):', process.env.MERCADOPAGO_ACCESS_TOKEN ? process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 5) : 'Not set');

router.post('/process-payment', async (req, res) => {
    const { token, amount, description, installments, payment_method_id, issuer_id, payer } = req.body;

    try {
        const paymentData = {
            transaction_amount: amount,
            token: token,
            description: description,
            installments: installments,
            payment_method_id: payment_method_id,
            issuer_id: issuer_id,
            payer: {
                email: payer.email,
                identification: {
                    type: payer.identification.type,
                    number: payer.identification.number,
                },
            },
        };

        const result = await mercadopago.payment.create(paymentData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error processing payment:', error);
        if (error.cause) {
            console.error('Mercado Pago API error cause:', error.cause);
        }
        if (error.status) {
            console.error('Mercado Pago API error status:', error.status);
        }
        res.status(500).json({ error: error.message || 'Failed to process payment' });
    }
});

router.post('/', async (req, res) => {
    console.log('Received request for /pix-payment');
    const { amount, description, payerEmail } = req.body; 

    try {
        const pixPaymentData = {
            transaction_amount: amount,
            description: description,
            payment_method_id: 'pix',
            payer: {
                email: payerEmail || 'test_user@example.com',
                // Mercado Pago often requires identification for PIX payments.
                // Using placeholder values. Replace with actual payer identification from frontend if available.
                identification: {
                    type: 'CPF', // Example: 'CPF', 'CNPJ', 'RG'
                    number: '12345678909' // Example: a valid CPF or CNPJ number
                },
                first_name: 'Test', // Placeholder
                last_name: 'User' // Placeholder
            },
            // Removed point_of_interaction as it's likely incorrect for direct PIX key specification.
            // The PIX key is usually associated with the Mercado Pago account linked to the ACCESS_TOKEN.
            // If a specific recipient PIX key is required, please consult Mercado Pago's official PIX API documentation.
        };

        const result = await mercadopago.payment.create(pixPaymentData);
        console.log('Mercado Pago PIX creation result:', JSON.stringify(result, null, 2));

        if (result && result.body) { // Ensure result.body exists
            const qrCodeBase64 = result.body.point_of_interaction && result.body.point_of_interaction.transaction_data && result.body.point_of_interaction.transaction_data.qr_code_base64;
            const qrCode = result.body.point_of_interaction && result.body.point_of_interaction.transaction_data && result.body.point_of_interaction.transaction_data.qr_code;
            
            if (qrCodeBase64 || qrCode) {
                res.status(201).json({ qrCodeBase64, qrCode });
            } else {
                console.error('Mercado Pago PIX response missing QR code data:', result.body); // Log result.body for more context
                res.status(500).json({ error: 'Failed to generate PIX QR Code data. Missing qr_code_base64 or qr_code in response.' });
            }
        } else {
            console.error('Mercado Pago PIX creation result or body is empty:', result);
            res.status(500).json({ error: 'Failed to create PIX payment. Empty response or body from Mercado Pago.' });
        }

    } catch (error) {
        console.error('Error creating PIX payment:', error);
        if (error.cause) {
            console.error('Mercado Pago API error cause:', error.cause);
        }
        if (error.status) {
            console.error('Mercado Pago API error status:', error.status);
        }
        res.status(500).json({ error: error.message || 'Failed to create PIX payment' });
    }
});

module.exports = router;
