import {Pool} from 'pg';

export enum Sex {
    FEMALE = 'female',
    MALE = 'male'
}

export const insertOperation = async (pool: Pool, userId: number, firstName: String, lastName: String, emailAddress: String, homeAddress: String, sex: Sex, dateOfBirth: Date) => {
    await pool.query(`INSERT INTO hbb_person.pacients(user_id, first_name, last_name, email_address, home_address, sex, date_of_birth)
                VALUES (${userId}, ${firstName}, ${lastName}, ${emailAddress}, ${homeAddress}, '${sex}', ${dateOfBirth}`);
}

export type Operation = {
    id: number,
    userId: number,
    firstName: string,
    lastName: string,
    emailAddress: string,
    homeAddress: string,
    sex: string,
    dateOfBirth: Date,
    createdAd: Date
}