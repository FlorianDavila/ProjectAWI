export class Settings {

    id? : string;  
    name : string; 
    value : number;

    constructor(name : string, value : number, id : string | undefined) {
        if(id) this.id = id;
        this.name = name;
        this.value = value;
    }
}
