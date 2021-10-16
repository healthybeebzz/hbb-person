

export type PersonDetails = {
    id: number,
    userId: number,
    firstName: string,
    lastName: string,
    emailAddress: string,
    homeAddress: string,
    sex: string,
    dateOfBirth: string,
}

export type Person = {
    userId: number,
    details: PersonDetails
}