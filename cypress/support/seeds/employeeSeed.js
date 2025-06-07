import { faker } from '@faker-js/faker';

export const generateEmployee = () => {
    return {
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        employeeId: faker.string.numeric(5)
    };
};