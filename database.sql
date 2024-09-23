--
-- PostgreSQL database wine_lab dump
--

-- Установка различных параметров среды выполнения SET ??


--
-- DROP TABLES IF EXISTS --
--
DROP TABLE IF EXISTS wines CASCADE;
DROP TABLE IF EXISTS wine_categories;
DROP TABLE IF EXISTS wines_wine_categories;
DROP TABLE IF EXISTS wine_images;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS wines_orders;
DROP TABLE IF EXISTS basket CASCADE;
DROP TABLE IF EXISTS wines_basket;
DROP TABLE IF EXISTS discounts CASCADE;
DROP TABLE IF EXISTS fabricators;
DROP TABLE IF EXISTS error_logs;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS wines_discounts;
DROP TABLE IF EXISTS delivery_addresses;



--
-- ============== CREATE TABLES ============== -- 
--


-- Name: wines; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE wines (
	wine_id SMALLINT GENERATED ALWAYS AS IDENTITY,
	wine_title VARCHAR(50) NOT NULL, 
	wine_price NUMERIC(10,2) NOT NULL, 
	wine_description TEXT NOT NULL,
	wine_rating REAL NOT NULL,
    fabricator_id INTEGER NOT NULL 
);


-- Name: wine_categories; Type: TABLE; Schema: public; Owner: -; Tablespace:  
CREATE TABLE wine_categories (
    category_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    category_color VARCHAR(30) NOT NULL,
    category_gassing VARCHAR(30) NOT NULL,
    category_country VARCHAR(50) NOT NULL,
    category_sugar VARCHAR (30) NOT NULL,
    category_alcohol REAL NOT NULL,
    category_region VARCHAR(50) NOT NULL,
    category_grape VARCHAR(50) NOT NULL,
    category_year INTEGER NOT NULL
);


-- Name: wine_images; Type: TABLE; Schema: public; Owner: -; Tablespace:  
CREATE TABLE wine_images (
    img_id INTEGER GENERATED ALWAYS AS IDENTITY,
    img_url VARCHAR,
    wine_id INTEGER NOT NULL
);


-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE users (
    user_id BIGINT GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(124) NOT NULL, 
    user_email VARCHAR(256) NOT NULL,
    user_password VARCHAR NOT NULL, 
    user_phone VARCHAR(24) NOT NULL
);


-- Name: reviews; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY,
    review_score REAL NOT NULL,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP NOT NULL,
    user_id INTEGER NOT NULL, 
    wine_id INTEGER NOT NULL
);


-- Name: orders; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE orders (
    order_id BIGINT GENERATED ALWAYS AS IDENTITY,
    order_date TIMESTAMP NOT NULL, -- PK?
    order_status VARCHAR (30) NOT NULL,
    order_full_price NUMERIC(10, 2) NOT NULL,
    order_amount SMALLINT NOT NULL,
    user_id INTEGER NOT NULL, 
    payment_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL 
);


-- Name: delivery_addresses; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE delivery_addresses (
    address_id BIGINT GENERATED ALWAYS AS IDENTITY,
    address_city VARCHAR(50),
    address_street VARCHAR(100),
    address_house VARCHAR(10),
    address_apartment VARCHAR(10),
    address_postal_code VARCHAR(20),
    address_description TEXT
);


-- Name: payments; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE payments (
    payments_id BIGINT GENERATED ALWAYS AS IDENTITY, 
    payment_amount NUMERIC(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_time TIMESTAMP NOT NULL,
    payment_status VARCHAR(30) NOT NULL,
    order_id INTEGER NOT NULL
);


-- Name: basket; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE basket (
    basket_id BIGINT GENERATED ALWAYS AS IDENTITY,
    product_quantity INTEGER NOT NULL,
    product_one_price NUMERIC(10, 2) NOT NULL,
    product_full_price NUMERIC(10, 2) NOT NULL,
    user_id INTEGER UNIQUE NOT NULL -- UNIQUE для отношения 1:1
);


-- Name: discounts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE discounts (
    discount_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    discount_name VARCHAR(50) NOT NULL,
    discount_percent REAL NOT NULL,
    discount_starts DATE,
    discount_ends DATE,
    wine_id INTEGER NOT NULL
);


-- Name: fabricators; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE fabricators (
    fabricator_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    fabricator_name VARCHAR(100) NOT NULL,
    fabricator_country VARCHAR(30) NOT NULL,
    fabricator_region VARCHAR(100) NOT NULL,
    fabricator_address VARCHAR NOT NULL,
    fabricator_email VARCHAR(256),
    fabricator_phone VARCHAR(24),
    fabricator_social_links VARCHAR,
    fabricator_description TEXT
);


-- Name: wines_wine_categories; Type: TABLE; Schema: public; Owner: -; Tablespace: 
CREATE TABLE wines_wine_categories (
    wine_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL
);


-- Name: wines_basket; Type: TABLE; Schema: public; Owner: -; Tablespace:
CREATE TABLE wines_basket (
    wine_id INTEGER NOT NULL,
    basket_id INTEGER NOT NULL
);


-- Name: wines_orders; Type: TABLE; Schema: public; Owner: -; Tablespace:
CREATE TABLE wines_orders (
    wine_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL
);


-- Name: wines_discounts; Type: TABLE; Schema: public; Owner: -; Tablespace:
CREATE TABLE wines_discounts (
    wine_id INTEGER NOT NULL,
    discount_id INTEGER NOT NULL
);


-- Name: error_logs; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--
-- CREATE TABLE error_logs (
--   error_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--    error_time TIMESTAMP,  --PRIMARY KEY,
--    error_message TEXT,
--    error_code INTEGER,
--    error_stack_trace VARCHAR,
--    wine_id INTEGER FOREIGN KEY REFERENCES wines(wine_id)
--);



--
-- ============== ALTER TABLES ============== -- 
--

-- PK --

--
-- Name: pk_wines; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wines
    ADD CONSTRAINT pk_wines PRIMARY KEY (wine_id);


--
-- Name: pk_wine_categories; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wine_categories
    ADD CONSTRAINT pk_wine_categories PRIMARY KEY (category_id);


--
-- Name: pk_wine_images; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wine_images
    ADD CONSTRAINT pk_wine_images PRIMARY KEY (img_id);


--
-- Name: pk_users; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);


--
-- Name: pk_reviews; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY reviews
    ADD CONSTRAINT pk_reviews PRIMARY KEY (review_id);


--
-- Name: pk_orders; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY orders
    ADD CONSTRAINT pk_orders PRIMARY KEY (order_id);


--
-- Name: pk_delivery_addresses; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY delivery_addresses
    ADD CONSTRAINT pk_delivery_addresses PRIMARY KEY (address_id);


--
-- Name: pk_payments; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY payments
    ADD CONSTRAINT pk_payments PRIMARY KEY (payment_id);


--
-- Name: pk_basket; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY basket
    ADD CONSTRAINT pk_basket PRIMARY KEY (basket_id);


--
-- Name: pk_discounts; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY discounts
    ADD CONSTRAINT pk_discounts PRIMARY KEY (discount_id);


--
-- Name: pk_fabricators; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY fabricators
    ADD CONSTRAINT pk_fabricators PRIMARY KEY (fabricator_id);


--
-- Name: pk_wines; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wines_discounts
    ADD CONSTRAINT pk_wines_discounts PRIMARY KEY (wine_id, discount_id);


--
-- Name: pk_wines_wine_categories; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wines_wine_categories
    ADD CONSTRAINT pk_wines_wine_categories PRIMARY KEY (wine_id, category_id);


--
-- Name: pk_wines_basket; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wines_basket
    ADD CONSTRAINT pk_wines_basket PRIMARY KEY (wine_id, basket_id);
    

--
-- Name: pk_wines_orders; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--
ALTER TABLE ONLY wines_orders
    ADD CONSTRAINT pk_wines_orders PRIMARY KEY (wine_id, order_id);


-- FK --

--
-- Name: fk_discounts_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY discounts
    ADD CONSTRAINT fk_discounts_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_basket_users; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY basket
    ADD CONSTRAINT fk_basket_users FOREIGN KEY (user_id) REFERENCES users;


--
-- Name: fk_payments_orders; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY payments
    ADD CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders;


--
-- Name: fk_orders_users; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY orders
    ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users;


--
-- Name: fk_orders_payments; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY orders
    ADD CONSTRAINT fk_orders_payments FOREIGN KEY (payment_id) REFERENCES payments;


--
-- Name: fk_orders_delivery_addresses; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY orders
    ADD CONSTRAINT fk_orders_delivery_addresses FOREIGN KEY (address_id) REFERENCES delivery_addresses;


--
-- Name: fk_reviews_users; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY reviews
    ADD CONSTRAINT fk_reviews_users FOREIGN KEY (user_id) REFERENCES users;


--
-- Name: fk_reviews_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY reviews
    ADD CONSTRAINT fk_reviews_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_fabricators; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines
    ADD CONSTRAINT fk_wines_fabricators FOREIGN KEY (fabricator_id) REFERENCES fabricators;


--
-- Name: fk_wine_images; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wine_images
    ADD CONSTRAINT fk_wine_images FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_wine_categories_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_wine_categories
    ADD CONSTRAINT fk_wines_discounts_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_wine_categories_wine_categories; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_wine_categories
    ADD CONSTRAINT fk_wines_wine_categories_wine_categories FOREIGN KEY (category_id) REFERENCES wine_categories;


--
-- Name: fk_wines_orders_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_orders
    ADD CONSTRAINT fk_wines_orders_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_orders_orders; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_orders
    ADD CONSTRAINT fk_wines_orders_orders FOREIGN KEY (order_id) REFERENCES orders;


--
-- Name: fk_wines_basket_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_basket
    ADD CONSTRAINT fk_wines_basket_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_basket_basket; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_basket
    ADD CONSTRAINT fk_wines_basket_basket FOREIGN KEY (basket_id) REFERENCES basket;


--
-- Name: fk_wines_discounts_wines; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_discounts
    ADD CONSTRAINT fk_wines_discounts_wines FOREIGN KEY (wine_id) REFERENCES wines;


--
-- Name: fk_wines_discounts_discounts; Type: CONSTRAINT; Schema: public; Owner: -  
--
ALTER TABLE ONLY wines_discounts
    ADD CONSTRAINT fk_wines_discounts_discounts FOREIGN KEY (discount_id) REFERENCES discounts;



-- ============== INSERT TABLES ============== --

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--





--
-- PostgreSQL database dump complete
--
