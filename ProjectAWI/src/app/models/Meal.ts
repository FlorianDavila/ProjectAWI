import { Stage } from "./Stage";

export class Meal {
    id?: string;
    name: string;
    manager: string;
    category: string;
    nbGuests: number;
    stageList: Array<Stage>;

    public constructor(id:string, name: string, manager: string, category: string, nbGuests: number, stageList: Array<Stage>) {
        this.id = id;
        this.name = name;
        this.manager = manager;
        this.category = category;
        this.nbGuests = nbGuests;
        this.stageList = stageList;
    }
}

