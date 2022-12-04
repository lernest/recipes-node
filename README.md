# Recipes

This is the node backend for a project with the purpose of practicing docker and full stack programming. The front end (recipe-ui) is written in Vue. The backend connects to a postgres database. The database always runs in a container. The node backend can be run locally or from its container. The frontend is not yet containerized.

The application handles simple GET and POST requests to write / read from a postgres database of recipes. Each recipe contains a name, ingredients, and directions. This can be easily extended to more complex applications.

Next steps:
- containerize the frontend
- use docker-compose to orchestrate all three containers

Challenges:
- initializing and persisting data in the postgres container

## Run the program

### Start the node app

`nodemon index.js`

or run it in a container using the Dockerfile:

`docker build . -t liam/recipes-node`

`docker run -p 3000:3000 -d liam/recipes-node`

---

### Start a postgres container to connect to

`docker run -e POSTGRES_PASSWORD=lol --name=pg --rm -d -p 5432:5432 postgres:14`

---

### Connect to this database through pgAdmin

Create a db called 'recipes'

### Initialize the recipe table

```
CREATE SEQUENCE public.recipes_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.recipes_id_seq
    OWNER TO postgres;

CREATE TABLE public.recipes
(
    id integer NOT NULL DEFAULT nextval('recipes_id_seq'::regclass),
    recipe text COLLATE pg_catalog."default",
    ingredients text COLLATE pg_catalog."default",
    directions text COLLATE pg_catalog."default",
    CONSTRAINT recipes_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE public.recipes
    OWNER to postgres;
```

### Start up the ui

From the 'recipes-ui' repo, run `npm run serve` and the UI will be accessible at localhost:8080