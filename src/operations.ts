import {Pool} from 'pg';
import {PersonDetails} from "./person-types";


export const insertOperation = async (pool: Pool, operation: Operation) => {
    const {firstName, lastName, emailAddress, homeAddress, sex, dateOfBirth} = operation;

    await pool.query(`
                INSERT INTO hbb_person.patients(first_name, last_name, email_address, home_address, sex, date_of_birth)
                VALUES ('${firstName}', '${lastName}', '${emailAddress}', '${homeAddress}', '${sex}', '${dateOfBirth}')`);
}

export type Operation = {
    firstName: string,
    lastName: string,
    emailAddress: string,
    homeAddress: string,
    sex: string,
    dateOfBirth: string,
}


/**
* Fetches users from the table and maps them to DTO (data transfer objects).
* @param pool
* @param userId
*/
export const fetchPatient = async (pool: Pool, userId: number): Promise<PersonDetails> => {
    const {rows} = await pool.query(`SELECT * FROM hbb_person.patients WHERE user_id=${userId}`);

    if (rows[0] === undefined) throw new Error(`The patient with the id: ${userId} does not exist.`);

    return {
        id: rows[0].id,
        userId: rows[0].user_id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        emailAddress: rows[0].email_address,
        homeAddress: rows[0].home_address,
        sex: rows[0].sex,
        dateOfBirth: rows[0].date_of_birth
    }
}
