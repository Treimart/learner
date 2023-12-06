insert into
category (name)
values
('Loodus'),
('Ajalugu'),
('Matemaatika'),
('Tehnoloogia'),
('Teadus'),
('Kunst'),
('Kirjandus'),
('Muusika'),
('Psühholoogia'),
('Filosoofia'),
('Majandus'),
('Geograafia'),
('Tervis'),
('Kultuur'),
('Filmindus');

insert into
form (category_id, title, description, status, created)
values
(1, 'Cats', 'Test your knowledge of everyones favorite pet!', 1, '2023-11-16 13:13:20'),
(3, 'Irrational numbers', 'A form on irrational numbers for total beginners.', 3, '2023-11-19 15:16:50'),
(5, 'Quantum Physics', 'A comprehensive form on the principles of Quantum Physics.', 3, '2023-11-20 10:10:10'),
(6, 'Impressionist Art', 'Test your knowledge of Impressionist Art and its masters.', 2, '2023-11-21 11:11:11'),
(11, 'Microeconomics', 'A beginner-friendly form on the basics of Microeconomics.', 3, '2023-11-22 12:12:12'),
(12, 'World Geography', 'A comprehensive form on World Geography.', 2, '2023-11-23 13:13:13');

insert into
question (form_id, title, answer, photo_url, is_evaluable)
values
(1, 'What breed of cat is this?', 'Domestic shorthair', 'https://cdn.mos.cms.futurecdn.net/2fw95nMhZqLGohDSUbLunn-1200-80.jpg.webp', TRUE),
(1, 'How long do cats typically live?', '13-17 years', null, FALSE),
(2, 'Irrational numbers are the opposite to ...?', 'rational numbers', null, TRUE),
(2, 'Is this an irrational number?', 'yes', 'https://images.saymedia-content.com/.image/t_share/MTc5OTc2MzEwNjQ1MzM1Mzg0/how-to-prove-that-the-square-root-of-2-is-irrational.jpg', TRUE),
(3, 'Who is considered the father of Quantum Physics?', 'Max Planck', null, TRUE),
(3, 'What is the uncertainty principle', 'It`s impossible to simultaneously measure the exact position and momentum of a particle.', null, FALSE),
(4, 'Who painted the `Water Lilies` series?', 'Claude Monet', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Le_bassin_aux_nymph%C3%A9as_-_Claude_Monet.jpg/612px-Le_bassin_aux_nymph%C3%A9as_-_Claude_Monet.jpg', TRUE),
(4, 'What is the main characteristic of Impressionist Art?', 'Visible brush strokes and emphasis on accurate depiction of light.', null, FALSE),
(5, 'What does the law of demand state?', 'As the price of a good increases, the quantity demanded decreases.', null, FALSE),
(5, 'What is a normal good?', 'A good for which demand increases as income increases.', null, FALSE),
(6, 'What is the largest country in the world by land area?', 'Russia', null, TRUE),
(6, 'Which river is known as the longest river in the world?', 'The Nile', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Cairo_skyline%2C_Panoramic_view%2C_Egypt.jpg/260px-Cairo_skyline%2C_Panoramic_view%2C_Egypt.jpg', TRUE),
(6, 'What is the capital of Australia?', 'Canberra', null, TRUE);

/* insert into
history (user_id, form_id, lastViewed)
values
('2c30867e-87c2-11ee-b9d1-0242ac120002', 1, '2023-11-16 16:13:20'),
('317e357c-87c2-11ee-b9d1-0242ac120002', 2, '2023-11-19 15:19:50'); */

/* insert into
favorite (user_id, form_id)
values
('dd8c5403-b1a7-4d92-9fdb-7d457f1cbf9a', 2); */
