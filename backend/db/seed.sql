INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES
('Sony Headphones', 'Electronics', 'Comfortable over-ear headphones', 'High-fidelity noise-cancelling headphones with 30h battery.', 129.99, 'https://media.wired.com/photos/688421c8d632f582759c6e56/4:3/w_1064,h_798,c_limit/The%20Best%20Noise-Canceling%20Headphones.png'),
('Vivo X200', 'Electronics', 'Flagship smartphone', '6.5\" AMOLED display, 128GB storage, 8GB RAM.', 699.00, 'https://www.vopmart.com/media/catalog/product/cache/ee14c5ab36c97d39d331f867fa3bee63/v/i/vivo-x200-global.jpg'),
('The Art of Programming', 'Books', 'Beginner to advanced programming', 'A comprehensive guide to modern software development.', 29.95, 'https://m.media-amazon.com/images/I/719SYGJejmL._AC_UF1000,1000_QL80_.jpg'),
('Milton Water Bottle', 'Home', 'Keeps drinks cold for 24h', 'Double-wall vacuum insulated bottle, 750ml.', 24.50, 'https://www.milton.in/cdn/shop/files/71I6_Uop7sL._SL1500.jpg?v=1736933342&width=1500'),
('Dell Wireless Keyboard', 'Electronics', 'Slim bluetooth keyboard', 'Compact keyboard with rechargeable battery.', 49.99, 'https://snpi.dell.com/snp/images/products/large/en-in~580-AKQO/580-AKQO.jpg'),
('Ceramic Plant Pot', 'Home', 'Minimalist planter', 'Matte finish ceramic planter, 12cm diameter.', 15.00, 'https://m.media-amazon.com/images/I/71BGMbLdeCL.jpg'),
('Yoga Mat Pro', 'Sports', 'Non-slip yoga mat', '6mm thickness, eco-friendly material.', 39.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmgWEVu2_6sJ8x4WCtuIXq19LuY3T0j7m86A&s'),
('Desk Lamp LED', 'Home', 'Adjustable LED desk lamp', 'Dimmable lamp with USB charging port.', 34.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnh4moC4ePzq6u49Qe27TL4zco7aUGFENUZA&s');

INSERT INTO enquiries (product_id, name, email, phone, message) VALUES
(1, 'Chetan Ponugoti', 'chetan@example.com', '8897543517', 'I am interested in bulk ordering 10 units of the Quantum Laptop X. Can you provide a corporate discount?');