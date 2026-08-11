-- Insert categories
INSERT INTO categories (id, name, description) VALUES
('appetizers', 'Entradas', 'Comece sua experiência com nossas tradicionais entradas italianas'),
('pasta', 'Massas Artesanais', 'Massas frescas preparadas diariamente em nossa cozinha'),
('pizza', 'Pizzas', 'Pizzas clássicas assadas em forno a lenha com fermentação natural'),
('main', 'Pratos Principais', 'Carnes e frutos do mar com temperos da costa Amalfitana'),
('desserts', 'Sobremesas', 'O autêntico sabor dolce da Itália para finalizar');

-- Insert some menu items
INSERT INTO menu_items (id, name, description, price, image_url, category, featured) VALUES
(gen_random_uuid(), 'Burrata DOP com tomates confit', 'Burrata de Andria, tomates cereja assados lentamente com alho e tomilho.', 52, 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Caprese_salad_%283124173496%29.jpg', 'appetizers', true),
(gen_random_uuid(), 'Spaghetti alla Carbonara', 'O verdadeiro preparo romano: guanciale, queijo pecorino romano, gemas caipiras e pimenta preta. Sem creme de leite.', 68, 'https://upload.wikimedia.org/wikipedia/commons/3/33/Espaguetis_a_la_carbonara.jpg', 'pasta', true),
(gen_random_uuid(), 'Pizza Margherita Verace', 'Molho de tomate San Marzano DOP, mozzarella di bufala da Campânia, manjericão fresco e azeite extra virgem.', 58, 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spick.jpg', 'pizza', true),
(gen_random_uuid(), 'Tiramisù Tradizionale', 'Biscoitos savoiardi artesanais embebidos em café expresso e licor Amaretto, cobertos com creme de mascarpone e cacau em pó.', 32, 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg', 'desserts', true);
