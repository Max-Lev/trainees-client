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
        this.Id = model['id'];
        this.Name = model['name'];
        this.Date = model['date'];
        this.Grade = model['grade'];
        this.Subject = model['subject'];
        this.Email = model['email'];
        this.Address = model['address'];
        this.City = model['city'];
        this.Country = model['country'];
        this.Zip = model['zip'];
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