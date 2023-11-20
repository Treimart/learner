insert into
category (name)
values
('Nature'),
('History'),
('Math');

insert into
form (category_id, title, description, status, created)
values
(1, 'Cats', 'Test your knowledge of everyones favorite pet!', 1, '2023-11-16 13:13:20'),
(3, 'Irrational numbers', 'A form on irrational numbers for total beginners.', 3, '2023-11-19 15:16:50');

insert into
question (form_id, title, answer, photo_url, is_evaluable)
values
(1, 'What breed of cat is this?', 'Domestic shorthair', 'https://cdn.mos.cms.futurecdn.net/2fw95nMhZqLGohDSUbLunn-1200-80.jpg.webp', TRUE),
(1, 'How long do cats typically live?', '13-17 years', null, FALSE),
(2, 'Irrational numbers are the opposite to ...?', 'rational numbers', null, TRUE),
(2, 'Is this an irrational number?', 'yes', 'https://images.saymedia-content.com/.image/t_share/MTc5OTc2MzEwNjQ1MzM1Mzg0/how-to-prove-that-the-square-root-of-2-is-irrational.jpg', TRUE);

/* insert into
history (user_id, form_id, lastViewed)
values
('2c30867e-87c2-11ee-b9d1-0242ac120002', 1, '2023-11-16 16:13:20'),
('317e357c-87c2-11ee-b9d1-0242ac120002', 2, '2023-11-19 15:19:50'); */