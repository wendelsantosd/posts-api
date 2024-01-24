<div>
<h1 align="center">
Posts API
</h1>
</div>

<div align="center">

<img src="https://img.shields.io/badge/NodeJS-18.17.1-green">

<img src="https://img.shields.io/badge/Nest.js-10.0.0-EA2845">

<img src="https://img.shields.io/badge/Typescript-5.1.3-blue">

</div>

# Overview

A "Posts API" é uma aplicação que possibilita a criação de postagens associadas a um usuário e a uma categoria. Essa aplicação surgiu como resposta a um desafio proposto por uma empresa durante uma das etapas do processo seletivo. Foi desenvolvida utilizando Node.js com o framework Nest.js e Typescript, além de fazer uso de um banco de dados relacional PostgreSQL e do Redis para implementar um sistema de cache.

# To Start the Application

1. Clone o repositório:

```shell
git clone https://github.com/wendelsantosd/posts-api.git
```

2. Entre no diretório:

```shell
cd posts-api
```

3. Instale as dependências:

```shell
yarn
```

4. Crie um arquivo `.env` baseado no `env.example`

5. Execute o docker-compose:

```shell
  docker compose up -d
```

Para acompanhar o log da aplicação

```shell
  docker logs posts-api-container -f
```

6. Push nas tabelas para o banco de dados:

```shell
  yarn prisma:db:push
```

# ROTAS PÚBLICAS

1. Criar usuário

```shell
POST
```

```shell
/user
```

```shell
body: {
    name: string,
    email: string,
    password: string
}
```

2. Login

```shell
POST
```

```shell
/auth
```

```shell
body: {
    email: string,
    password: string
}
```

# ROTAS QUE EXIGEM AUTENTICAÇÃO

1. Criar Categoria

```shell
POST
```

```shell
/category
```

```shell
headers: {
  Authorization: "Bearer {{token}}"
}
```

```shell
body: {
  name: string
}
```

2. Listar Posts

```shell
GET
```

```shell
/post
```

```shell
headers: {
  Authorization: "Bearer {{token}}"
}
```

```shell
params: {
  take?: number,
  skip?: number,
  categoryId?: string,
  userId?: string,
}
```

3. Liberar Cache

```shell
GET
```

```shell
headers: {
  Authorization: "Bearer {{token}}"
}
```

```shell
/post/flushCache
```

# Contact us

<p style="font-size: 18px;">
Wendel Santos, 2024.
</p>
<p style="font-size: 18px;">
wendelwcsantos@gmail.com
</p>
