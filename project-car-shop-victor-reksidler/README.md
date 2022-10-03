  <h2>
  Projeto utilizando os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos, utilizando o banco de dados `MongoDB`.
 </h2>

1. Instruções para rodar com Docker:

```sh
docker pull mongo
```

2. Crie o contêiner do MongoDB:

```sh
docker run --name <nome-do-container> -p 27017:27017 -d mongo
```

3. Confira se o contêiner está rodando:

```sh
docker ps
```

 > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.


<h2>
  Project using Object Oriented Programming (`OOP`) principles to build an API with `CRUD` to manage a car dealership, using the `MongoDB` database.
 </h2>

1. Instructions to run with Docker:

```sh
docker pull mongo
```

2. Create the MongoDB container:

```sh
docker run --name <container-name> -p 27017:27017 -d mongo
```

3. Check if the container is running:

```sh
docker ps
```

 > Run the `node` and `mongodb` services with the command `docker-compose up -d`.
