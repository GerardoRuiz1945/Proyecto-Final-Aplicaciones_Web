BASE DE DATOS: HOTEL PARAÍSO

--Crear Base de Datos
CREATE DATABASE hotel_db;
USE hotel_db;

--Tabla: USUARIOS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(20) DEFAULT 'empleado'
);

-- Tabla: CLIENTES
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20)
);

-- Tabla: HABITACIONES
CREATE TABLE habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Disponible',
    descripcion TEXT,
    imagen VARCHAR(500)
);

--Tabla: RESERVAS
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    total DECIMAL(10,2),
    cliente_id INT,
    habitacion_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id)
);


-- DATOS DE PRUEBA

-- Usuarios del Sistema
INSERT INTO usuarios (nombre, email, password, rol) VALUES 
('Gerardo Admin', 'admin@hotel.com', '123456', 'admin'),
('Recepcion Ana', 'ana@hotel.com', 'ana123', 'empleado'),
('Gerente Luis', 'luis@hotel.com', 'luis123', 'admin');

-- Habitaciones Iniciales
INSERT INTO habitaciones (numero, tipo, precio, estado, descripcion, imagen) VALUES 
('101', 'Sencilla', 500.00, 'Disponible', 'Ideal para viajeros solos. Cama matrimonial y vista al jardín.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60'),
('102', 'Sencilla', 500.00, 'Disponible', 'Confort y tranquilidad. Incluye desayuno continental.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60'),
('201', 'Doble', 900.00, 'Disponible', 'Perfecta para parejas. Dos camas queen y balcón privado.', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=500&q=60'),
('305', 'Suite', 1500.00, 'Disponible', 'El máximo lujo. Jacuzzi, sala de estar y vista panorámica.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=60');

-- Clientes de Ejemplo
INSERT INTO clientes (nombre_completo, email, telefono) VALUES 
('Juan Perez', 'juan@gmail.com', '4771234567'),
('Maria Lopez', 'maria@outlook.com', '5559876543');