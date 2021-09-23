import {Pool} from 'pg';

export const insertOperation = async (pool: Pool, operation: Operation) => {
    const {userId, firstName, lastName, emailAddress, homeAddress, sex, dateOfBirth} = operation;

    await pool.query(`
                INSERT INTO hbb_person.patients(user_id, first_name, last_name, email_address, home_address, sex, date_of_birth)
                VALUES (${userId}, '${firstName}', '${lastName}', '${emailAddress}', '${homeAddress}', '${sex}', '${dateOfBirth}')`);
}

export type Operation = {
    userId: number,
    firstName: string,
    lastName: string,
    emailAddress: string,
    homeAddress: string,
    sex: string,
    dateOfBirth: string,
}