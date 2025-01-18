# 😱 Meme Manager MMM

MMM manages memes.

![Screenshot of the home page](https://raw.githubusercontent.com/arvl130/mmm/master/screenshots/1.png)
![Screenshot of semantic search](https://raw.githubusercontent.com/arvl130/mmm/master/screenshots/2.png)
![Screenshot of AI tag suggestions](https://raw.githubusercontent.com/arvl130/mmm/master/screenshots/3.png)

This is a personal project I built to help me search memes I have saved from the Internet.

I also built this project to gain a deeper understanding on how [Spring Boot](https://spring.io/projects/spring-boot),
[Spring Security](https://spring.io/projects/spring-security), [Spring Session](https://spring.io/projects/spring-session),
[Spring Data JPA](https://spring.io/projects/spring-data-jpa), [Spring AI](https://spring.io/projects/spring-ai),
[AWS SDK for Java](https://aws.amazon.com/sdk-for-java/), [Lombok](https://projectlombok.org/),
[Hibernate](https://hibernate.org/) and a bunch of other Java libraries work together to build a
scalable, production-grade Java web application.

If this application is useful or interesting to you, consider giving it a star on
[GitHub](https://github.com/arvl130/mmm-ui).

This application also comes with a backend REST API available [here](https://github.com/arvl130/mmm).

## Features

- Responsive frontend design with [ShadCN UI](https://ui.shadcn.com) and [Next.js](https://nextjs.org)
- Semantic Search with [Cohere Embed](https://cohere.com/embed) and [PostgreSQL](https://www.postgresql.org/) [`pgvector`](https://github.com/pgvector/pgvector)
- Full Text Search with [PostgreSQL](https://www.postgresql.org/) [`tsvector`](https://www.postgresql.org/docs/current/textsearch.html)
- AI Tag Suggestions with [Anthropic Claude Sonnet 3](https://www.anthropic.com/news/claude-3-family)
- Authentication with Session management with [Spring Security](https://spring.io/projects/spring-security) and [Spring Session](https://spring.io/projects/spring-session)

## Setup

1. Clone this repository.

```sh
$ git clone https://github.com/arvl130/mmm-ui.git
```

2. Install the dependencies.

```sh
$ pnpm install
```

3. Configure the environment variables.

```sh
$ cp .env.example .env
$ vi .env # press :wq to exit!
```

4. Run the development server.

```sh
$ pnpm dev
```

5. Build for production (optional).

```sh
$ pnpm build
```

## License

This project is licensed under the MIT License.

Copyright © 2024 Angelo Geulin
