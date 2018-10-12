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
    constructor(model: TraineesModel) {
        this.Id = model.Id;
        this.Name = model.Name;
        this.Date = model.Date;
        this.Grade = model.Grade;
        this.Subject = model.Subject;
        this.Email = model.Email;
        this.Address = model.Address;
        this.City = model.City;
        this.Country = model.Country;
        this.Zip = model.Zip;
    };

    getViewModel() {
        return {
            Id: this.Id,
            Name: this.Name,
            Date: this.Date,
            Grade: this.Grade,
            Subject: this.Subject
        }
    };

}