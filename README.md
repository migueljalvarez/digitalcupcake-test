# digitalcupcake-test

Evaluación Tecnica de Digital Cupcake

## Instalación y Configuración del Repositorio.

1. Asegurese de tener una version de `nodejs` igual o superior a `v12.18.3`.
2. Instale `yarn` con `npm install yarn -g`.
3. Instale las dependencias del repositorio ejecutando `yarn install`.
4. Cree el `.env` partiendo de `.env.example`.
5. Configure las variables de entorno que se encuentran en el `.env` segun los valores que correspondan, las variables son las sigientes:

| Variables de Entorno  | Descripción                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`            | si desea ejecutar localmente el repositorio coloque por defecto `local`, en caso contrario segun sea el escenario use `development` o `production`. |
| `PORT`                | asigne el puerto en el que desea correr la aplicación por defecto `3000`                                                                            |
| `DB_USERNAME`         | coloque un usuario diferente de `root`.                                                                                                             |
| `DB_PASSWORD`         | asigne una contraseña.                                                                                                                              |
| `DB_DATABASE`         | indique el nombre de la base de datos.                                                                                                              |
| `DB_HOSTNAME`         | si ejecuta localmente el repositorio use `localhost` si se ejecuta con `docker-compose` use `db`.                                                   |
| `DB_PORT`             | indique el puerto de conexion a la base de datos.                                                                                                   |
| `DIALECT`             | `mysql`                                                                                                                                             |
| `MYSQL_DATABASE`      | configure solo si se conecta con `docker-compose`, replique el valor utilizado en `DB_DATABASE`.                                                    |
| `MYSQL_USER`          | configure solo si se conecta con `docker-compose`, replique el valor utilizado en `DB_USERNAME`.                                                    |
| `MYSQL_PASSWORD`      | configure solo si se conecta con `docker-compose`, replique el valor utilizado en `DB_PASSWORD`.                                                    |
| `MYSQL_ROOT_PASSWORD` | configure solo si se conecta con `docker-compose`, asigne una contraseña maestra para el usuario root.                                              |

Si desea utilizar docker, asegurese de tener instalada la version `19.03.13` y docker-compose version `1.27.4`

## Correr el Repositorio.

- Para ejecutar el proyecto, debe posicionarse en la carpeta raiz del mismo y ejecutar el comando `yarn start` para ejecutar localmente o `docker-compose up -d` para ejecutar con `docker-compose`.
- Ejecute `docker-compose logs -f api`, para visualizar el estado el api, cuando el api este listo se vera un mensaje de la siguiente manera `🔥 App listening on port 3000` seguido de `[Database:] connection open to localhost/<database>`.
  <br />

### Notas

Utilize la coleccion de postman para hacer pruebas de los endpoints creados.
