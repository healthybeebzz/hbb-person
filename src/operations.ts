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


/**
* Fetches transcations from the table and maps them to DTO (data transfer objects).
* @param pool
* @param userId
*/
export const fetchPatient = async (pool: Pool, userId: number) => {
    const queryResult = await pool.query(`SELECT * FROM hbb_person.patients WHERE user_id=${userId}`);
    const rows = queryResult.rows;

    const resultsArray: Array<Operation> = [];
    for (let i = 0; i < rows.length; i++) {
        const obj = {
            id: rows[i].id,
            userId: rows[i].user_id,
            firstName: rows[i].first_name,
            lastName: rows[i].last_name,
            emailAddress: rows[i].email_address,
            homeAddress: rows[i].home_address,
            sex: rows[i].sex,
            dateOfBirth: rows[i].date_of_birth,
            createdAt: rows[i].created_at
        }

        resultsArray.push(obj);
    }

    return resultsArray;
}
