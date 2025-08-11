CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    status TEXT NOT NULL DEFAULT 'pending' -- Adiciona a coluna de status
);

CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cuisine TEXT,
    rating REAL,
    location TEXT,
    image TEXT,
    hours TEXT,
    description TEXT,
    whatsapp TEXT,
    map_embed TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER,
    title TEXT NOT NULL,
    code TEXT,
    description TEXT,
    discount_type TEXT,
    discount_value REAL,
    original_price REAL,
    discounted_price REAL,
    min_order_value REAL,
    valid_from TEXT,
    valid_to TEXT,
    usage_limit INTEGER,
    category TEXT,
    type TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO restaurants (id, name, cuisine, rating, location, image, hours, description, whatsapp, map_embed) VALUES
(1, 'Restaurante Sabor Caseiro', 'Comida Brasileira', 4.5, 'Rua das Flores, 123, Centro', 'https://example.com/sabor_caseiro.jpg', 'Seg-Sex: 08h-18h', 'O melhor da comida caseira com um toque especial.', '5511987654321', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0000000000005!2d-46.639557!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59f8d2d1d1d1%3A0x1d1d1d1d1d1d1d1d!2sRua%20das%20Flores%2C%20123%2C%20Centro%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001000-000!5e0!3m2!1spt-BR!2sbr!4v1678901234567!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'),
(2, 'Pizzaria Forno a Lenha', 'Pizzaria', 4.8, 'Avenida Principal, 456, Bela Vista', 'https://example.com/forno_a_lenha.jpg', 'Ter-Dom: 18h-23h', 'Pizzas artesanais feitas no forno a lenha.', '5511912345678', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0000000000005!2d-46.639557!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59f8d2d1d1d1%3A0x1d1d1d1d1d1d1d1d!2sAvenida%20Principal%2C%20456%2C%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001000-000!5e0!3m2!1spt-BR!2sbr!4v1678901234567!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'),
(3, 'Sushi Master', 'Japonesa', 4.7, 'Rua da Paz, 789, Liberdade', 'https://example.com/sushi_master.jpg', 'Seg-Sab: 12h-15h, 19h-23h', 'O melhor sushi da cidade, com peixes frescos e ingredientes selecionados.', '5511998765432', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0000000000005!2d-46.639557!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59f8d2d1d1d1%3A0x1d1d1d1d1d1d1d1d!2sRua%20da%20Paz%2C%20789%2C%20Liberdade%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001000-000!5e0!3m2!1spt-BR!2sbr!4v1678901234567!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');

INSERT OR IGNORE INTO coupons (id, restaurant_id, title, code, description, discount_type, discount_value, original_price, discounted_price, min_order_value, valid_from, valid_to, usage_limit, category, type, image) VALUES
(1, 1, 'Desconto de 10% em Massas', 'MASSA10', 'Ganhe 10% de desconto em qualquer prato de massa.', 'percentage', 10.0, 50.00, 45.00, 30.00, '2024-01-01', '2025-12-31', 100, 'Almoço', 'online', 'https://example.com/coupon_massa10.jpg'),
(2, 2, 'Pizza Grande com Refri Grátis', 'PIZZACOMBO', 'Na compra de uma pizza grande, leve um refrigerante de 2L grátis.', 'fixed_amount', 0.0, 70.00, 70.00, 50.00, '2024-02-01', '2025-11-30', 50, 'Jantar', 'in_store', 'https://example.com/coupon_pizza.jpg'),
(3, 3, 'Rodízio de Sushi com 15% Off', 'SUSHI15', 'Aproveite 15% de desconto no rodízio de sushi.', 'percentage', 15.0, 100.00, 85.00, 80.00, '2024-03-01', '2025-10-31', 75, 'Jantar', 'online', 'https://example.com/coupon_sushi15.jpg');
