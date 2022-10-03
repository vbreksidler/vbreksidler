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
