# santander-meetings

Buenas, primero que nada me llamo Lucas Chiesa, actualmente soy Java/Angular developer y estoy intentando migrarme a React y NodeJS.

La aplicacion que les traigo aca se llama Santander Meetings, esta hecha en React con Typescript, Node y MySQL.

Esta cuenta con 4 paginas clave:

- Pagina de autenticacion (Registro y login)
- Pagina principal (En esta se encuentran la tarjeta para crear meetings y las tarjetas de las distintas meetings que hayamos creado o que nos hayan invitado)
- Pagina de creacion de meeting
- Pagina de detalle de la meeting (En esta se encuentra la cantidad de birras y la temperatura)

La autenticacion esta hecha con JWT.

Un detalle! Lamentablemente, no encontre forma de obtener el clima para un dia en especifico, por lo que decidi calcularlo con la temperatura actual ya que me parece lo mas cercano a lo pedido.

Repositorio git: https://github.com/lchiesasturla/santander-meetings.git

Consideraciones para levantar el proyecto completo:

Base de datos:

 1. Tenerla instalada y contar con el mismo usuario que el configurado en el .env del backend
 2. Contar con la base de datos "santander_meetings" creada.
 3. Me encontre con que el driver de mysql tiene un bug con respecto a la autenticacion nueva que se implemento en MySQL 8.0, por lo que les dejo el comando que encontre por internet para poder arreglarlo y poder continuar
 
 Backend:

 1. Primero que nada, debemos instalar primero las dependencias con *npm i*
 2. Debemos configurar las variables de entorno en el .env, aca encontraran DB_HOST, DB_USER y DB_PASSWORD por sus datos y credenciales.
 3. *IMPORTANTE* Se debe crear la base de datos "santander_meetings" previo a ejecutar la aplicacion. Esto se debe a como maneja la conexion el driver de mysql. Las tablas se crearan automaticamente una vez iniciado el servidor.
 4. El backend cuenta con la dependencia nodemon, por lo que podremos iniciar la aplicacion con LiveReload con el comando *npm run dev*
 
Frontend:

 1. Como en el backend, debemos instalar las dependencias con *npm i*
 2. El backend esta configurado para correr en localhost sobre el puerto 4000, lo pueden cambiar desde el .env a su gusto.
 3. Una vez finalicemos los demas pasos, recien ahi recomiendo levantar el frontend con *npm start*, para tener ya todo el ambiente levantado.

La aplicacion no cuenta con tests ya que no conte con el tiempo por un tema laboral y de facultad y decidi priorizar otros aspectos de la aplicacion.


    
	En donde dice root iria nuestro usuario y en donde dice password iria la password que tenemos habitualmente.
	*ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'*
	Luego de haber corrido este comando, refreshear los privilegios con el comando:
	*flush privileges;*
	
	Dejo igualmente el stackoverflow que me ayudo a solucionarlo por si mi explicacion no es la mejor jajajaja
	
	https://stackoverflow.com/a/50131831

Espero que les guste mi aplicacion, considero que se le puede hacer muchas mejoras pero creo que quedo bastante bien jeje.

Les mando un saludo y ante cualquier consulta me pueden consultar!