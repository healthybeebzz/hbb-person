CREATE SCHEMA IF NOT EXISTS hbb_person;

CREATE TYPE sex AS ENUM('female', 'male');

CREATE TABLE IF NOT EXISTS hbb_person.patients (
    id BIGSERIAL not null primary key,
    user_id SERIAL not null,
    first_name VARCHAR not null,
    last_name VARCHAR not null,
    email_address VARCHAR not null,
    home_address VARCHAR not null,
    sex sex not null,
    date_of_birth VARCHAR not null,
    created_at timestamp default now() not null
);

CREATE INDEX IF NOT EXISTS patients_user_id_index ON hbb_person.patients(user_id);
