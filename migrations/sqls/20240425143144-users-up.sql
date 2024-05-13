/* Replace with your SQL commands *//* Replace with your SQL commands */
CREATE TABLE "user" (
    "id" SERIAL primary key,
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR (255) NOT NULL
);

CREATE TABLE "project" (
    "id" SERIAL primary key,
    "project_name" VARCHAR (255) NOT NULL UNIQUE,
    "id_user" INT,
    FOREIGN KEY("id_user") references "user"("id")
);

CREATE TABLE "task" (
    "id" SERIAL primary key,
    "task_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "deadline" TIMESTAMP NOT NULL,
    "status" VARCHAR (100) NOT NULL,
    "id_user" INT,
    FOREIGN KEY("id_user") references "user"("id"),
    "id_project" INT,
    FOREIGN KEY("id_project") references "project"("id")
);

CREATE TABLE "category" (
    "id" SERIAL primary key,
    "title" VARCHAR(100) NOT NULL
);

CREATE TABLE "project_categories" (
    "id_project" INT,
    FOREIGN KEY("id_project") references "project"("id"),
    "id_category" INT,
    FOREIGN KEY("id_category") references "category"("id")
);


ALTER TABLE "task" 
ALTER COLUMN "id_user" SET NOT NULL,
ALTER COLUMN "id_project" SET NOT NULL; 