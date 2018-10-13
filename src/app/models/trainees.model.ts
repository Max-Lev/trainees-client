export interface ITrainees {
    id: number;
    name: string;
    date: string;
    grade: number;
    subject: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zip: number;
};

export class TraineesModel implements ITrainees {
    id: number;
    name: string;
    date: string;
    grade: number;
    subject: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zip: number;
    isSelected: boolean;
    constructor(model: TraineesModel) {
        this.id = model['id'];
        this.name = model['name'];
        this.date = model['date'];
        this.grade = model['grade'];
        this.subject = model['subject'];
        this.email = model['email'];
        this.address = model['address'];
        this.city = model['city'];
        this.country = model['country'];
        this.zip = model['zip'];
        this.setSelected();
    };

    setSelected() {
        this.isSelected = false;
    };

    getViewModel() {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            grade: this.grade,
            subject: this.subject
        }
    };

}