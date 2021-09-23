CREATE SCHEMA IF NOT EXISTS hbb_person;

CREATE TYPE sex as ENUM('female', 'male');

CREATE TABLE IF NOT EXISTS hbb_person.patients (
    id BIGSERIAL not null primary key,
    user_id INT not null,
    first_name VARCHAR not null,
    last_name VARCHAR not null,
    email_address VARCHAR not null,
    home_address VARCHAR not null,
    TYPE sex not null,
    date_of_birth DATE not null,
    created_at timestamp default now() not null
);

CREATE INDEX IF NOT EXISTS patients_user_id_index ON hbb_person.patients(user_id);
