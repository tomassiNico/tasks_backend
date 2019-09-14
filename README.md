# Proyecto BACKEND para tareas pendientes

## Objetivo: Aprendizaje con NodeJs

### Sobre el proyecto:

La app brinda soporte a la creación/consulta/edición/borrado de tareas. La misma lleva una autenticación por usuario (email) dónde la password es encriptada con bcrypt en la base de datos (SQLITE en desarrollo y Postgres en producción), manejando las sesiones de los usuarios logueado, además se aplica WebSocket para hacer una comunicación entre servidor y cliente en la cual se informa a cada cliente en tiempo real la cantidad de usuarios conectados, tal cantidad es refrescada sin necesidad de actualizar la página ya que el servidor se encarga de informarle al cliente si esta cambia.


### Herramientas/Técnologías utilizadas: 
  * node
  * express
  * express-session
  * bcrypt
  * sequelize
  * socket.io
  * body-parser
  * method-override
  * pug
