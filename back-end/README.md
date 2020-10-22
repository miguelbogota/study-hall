# Back end desarollado en NestJS

## Live Server: `https://study-hall-api.herokuapp.com/api` Taken down :c

## Acciones

### Usuarios

* GET `api/users` - Devuelve todos los usuarios.
* GET `api/users/:uid` - Devuelve al usuario con el nombre de usuario.
* PUT `api/users/:uid` - Actualiza al usuario con el nombre de usuario.
* POST `api/users` - Agrega un usuario.
* DELETE `api/users/:uid` Elimina al usuario con el nombre de usuario.

### Materias

* GET `api/subjects` - Devuelve todas las materias.
* GET `api/subjects/:code` - Devuelve la materia con el codigo.
* PUT `api/subjects/:code` - Actualiza la materia con el codigo.
* POST `api/subjects` - Agrega una materia.
* DELETE `api/subjects/:code` Elimina la materia con el codigo.

### Grupos

* GET `api/groups` - Devuelve todos los grupos.
* GET `api/groups/:code` - Devuelve al grupo con el codigo.
* PUT `api/groups/:code` - Actualiza el grupo con el codigo.
* POST `api/groups` - Agrega un grupo.
* DELETE `api/groups/:code` Elimina al grupo con le codigo.

### Chat

* GET `api/chats` - Devuelve todos los chats.
* GET `api/chats/:groupId` - Devuelve todos los chats de un grupo.
* PUT `api/chats/:chatId` - Actualiza el chat con el chat Id.
* POST `api/chats` - Agrega un chat.
* DELETE `api/chats/:chatId` Elimina un chat con el chat Id.
