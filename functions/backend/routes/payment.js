const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const authenticateToken = require('../middleware/authenticateToken'); // Import centralized middleware

// Configure o Mercado Pago com suas credenciais (versão 1.x)
mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST_ACCESS_TOKEN');
console.log('Mercado Pago Access Token (first 5 chars):', process.env.MERCADOPAGO_ACCESS_TOKEN ? process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 5) : 'Not set');

router.post('/process-payment', authenticateToken, async (req, res) => {
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

router.post('/pix-payment', async (req, res) => {
    console.log('Received request for /pix-payment');
    const { amount, description, payerEmail, additional_info } = req.body; 

    try {
        const pixPaymentData = {
            transaction_amount: amount,
            description: description,
            payment_method_id: 'pix',
            payer: {
                email: payerEmail || 'test_user@example.com',
                identification: {
                    type: additional_info.payer.identification.type || 'CPF', 
                    number: additional_info.payer.identification.number || '12345678909' 
                },
                first_name: additional_info.payer.first_name || 'Test', 
                last_name: additional_info.payer.last_name || 'User' 
            },
            additional_info: {
                external_reference: 'PIX_TO_CPF_42189406811', 
                items: [
                    {
                        id: 'subscription',
                        title: 'Monthly Subscription',
                        description: 'FoodCupons Monthly Subscription',
                        quantity: 1,
                        unit_price: amount
                    }
                ],
                payer: { 
                    first_name: additional_info.payer.first_name || 'Test',
                    last_name: additional_info.payer.last_name || 'User',
                    phone: {
                        area_code: additional_info.payer.phone.area_code || '11',
                        number: additional_info.payer.phone.number || '999999999'
                    },
                    address: {
                        zip_code: additional_info.payer.address.zip_code || '01000000',
                        street_name: additional_info.payer.address.street_name || 'Test Street',
                        street_number: additional_info.payer.address.street_number || '123',
                        neighborhood: additional_info.payer.address.neighborhood || 'Test Neighborhood',
                        city: additional_info.payer.address.city || 'Test City',
                        federal_unit: additional_info.payer.address.federal_unit || 'SP'
                    }
                },
            },
        };

        const result = await mercadopago.payment.create(pixPaymentData);
        console.log('Mercado Pago PIX creation result:', JSON.stringify(result, null, 2));

        if (result && result.body) { 
            const qrCodeBase64 = result.body.point_of_interaction && result.body.point_of_interaction.transaction_data && result.body.point_of_interaction.transaction_data.qr_code_base64;
            const qrCode = result.body.point_of_interaction && result.body.point_of_interaction.transaction_data && result.body.point_of_interaction.transaction_data.qr_code;
            
            if (qrCodeBase64 || qrCode) {
                res.status(201).json({ qrCodeBase64, qrCode });
            } else {
                console.error('Mercado Pago PIX response missing QR code data:', result.body); 
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

