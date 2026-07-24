


ALTER TABLE shop
DROP COLUMN location,
ADD street VARCHAR(255),
ADD apt_suite VARCHAR(255),
ADD city VARCHAR(255),
ADD postal_code VARCHAR(20)
ADD phone_number VARCHAR(20),
ADD description TEXT,
ADD is_verified BOOLEAN;