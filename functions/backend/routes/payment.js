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
        res.status(500).json({ error: error.message || 'Failed to process payment' });
    }
});

router.post('/', async (req, res) => {
    console.log('Received request for /pix-payment');
    const { amount, description } = req.body;

    try {
        const pixPaymentData = {
            transaction_amount: amount,
            description: description,
            payment_method_id: 'pix',
            payer: {
                email: 'test_user@example.com', // Substitua pelo email real do usuário
            },
        };

        const result = await mercadopago.payment.create(pixPaymentData);
        console.log('Mercado Pago PIX creation result:', JSON.stringify(result, null, 2));

        if (result && result.point_of_interaction && result.point_of_interaction.transaction_data) {
            const qrCodeBase64 = result.point_of_interaction.transaction_data.qr_code_base64;
            const qrCode = result.point_of_interaction.transaction_data.qr_code;
            res.status(201).json({ qrCodeBase64, qrCode });
        } else {
            console.error('Mercado Pago PIX response missing data:', result);
            res.status(500).json({ error: 'Failed to generate PIX QR Code data. Missing point_of_interaction or transaction_data.' });
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
