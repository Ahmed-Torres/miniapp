CREATE TABLE usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (150) NOT NULL,
    apellido VARCHAR (150)NOT NULL,
    usuario VARCHAR (150)NOT NULL,
    contrasenia VARCHAR (150) NOT NULL
)

INSERT INTO `usuarios`(`id`,`nombre`,`apellido`,`usuario`,`contrasenia`) 
    VALUES (NULL, 'Yamil', 'Torres', 'yamilt', '1#fU 55@');