import {Person, PersonDetails} from "./person-types";

export const convertFromDTOToPerson = (personDTO: PersonDetails): Person => {
    return {
        userId: personDTO.userId,
        details: personDTO
    };
}
