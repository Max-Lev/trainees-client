export interface ITrainees {
    Id: number;
    Name: string;
    Date: string;
    Grade: number;
    Subject: string;
    Email: string;
    Address: string;
    City: string;
    Country: string;
    Zip: number;
};

export class TraineesModel implements ITrainees {
    Id: number;
    Name: string;
    Date: string;
    Grade: number;
    Subject: string;
    Email: string;
    Address: string;
    City: string;
    Country: string;
    Zip: number;
    constructor({ ...model }: TraineesModel) {
        console.log(this);
    }

}