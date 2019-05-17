export class AlmacenClass {
    constructor(
        public id?: number,
        public estado?: number,
        public nombre?: string,
        public direccion?: string,
        public responsable?: string
    ) {
        this.id = null;
        this.estado = 1;
        this.nombre = null;
        this.direccion = null;
        this.responsable = null;
    }
}