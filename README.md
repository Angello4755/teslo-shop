# Next.js Teslo shop
Para correr localmente, se necesita la base de datos
``````
docker-compose up -d
```````
* El -d, significa __detached___

* MongoDB URL Local:
````
mongodb://localhost:27017/teslodb
````

# CONFIGURAR LAS VARIABLES DE ENTORNO
.env.template

*Reconstruir los modulos de node y levantar next
yarn install

# LLenar la base de datos con informacion de pruebas 
Llamar url http://localhost:3000/api/seed