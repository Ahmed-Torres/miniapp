CREATE TABLE publicaciones(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR (150) NOT NULL,
    contenido VARCHAR (280) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    id_usuario INT NOT NULL
)