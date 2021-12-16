import { Stage } from "./Stage";

export class Meal {
    id: string | null;
    name: string;
    manager: string;
    category: string;
    nbGuests: number;
    stageList: any[];

    public constructor(id:string | null, name: string, manager: string, category: string, nbGuests: number, stageList: any[]) {
        this.id = id ? id : null;
        this.name = name;
        this.manager = manager;
        this.category = category;
        this.nbGuests = nbGuests;
        this.stageList = stageList;
    }
}

