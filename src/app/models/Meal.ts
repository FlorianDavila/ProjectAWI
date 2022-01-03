import { Stage } from "./Stage";

export class Meal {
    id: string | null;
    name: string;
    manager: string;
    category: string;
    nbGuests: number;
    stageList: any[];
    matS: string | null;
    matD: string | null;

    public constructor(id:string | null, name: string, manager: string, category: string, nbGuests: number, stageList: any[], matS: string | null, matD: string | null) {
        this.id = id ? id : null;
        this.name = name;
        this.manager = manager;
        this.category = category;
        this.nbGuests = nbGuests;
        this.stageList = stageList;
        this.matS = matS ? matS : null;
        this.matD = matD ? matD : null;
    }
}

