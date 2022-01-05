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
    coefVenteHT: string | null;
    coefVenteTTC: string | null;
    coutHFluide: string | null;
    coutHMoyen: string | null;

    public constructor(id:string | null, name: string, manager: string, category: string, nbGuests: number, stageList: any[], matS: string | null, matD: string | null, coefVenteHT: string | null, coefVenteTTC: string | null, coutHFluide: string | null, coutHMoyen: string | null) {
        this.id = id ? id : null;
        this.name = name;
        this.manager = manager;
        this.category = category;
        this.nbGuests = nbGuests;
        this.stageList = stageList;
        this.matS = matS ? matS : null;
        this.matD = matD ? matD : null;
        this.coefVenteHT = coefVenteHT ? coefVenteHT : null;
        this.coefVenteTTC = coefVenteTTC ? coefVenteTTC : null;
        this.coutHFluide = coutHFluide ? coutHFluide : null;
        this.coutHMoyen = coutHMoyen ? coutHMoyen : null;
    }
}

