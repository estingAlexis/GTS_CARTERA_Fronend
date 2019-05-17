export class DepartamentoClass {
    constructor(
        public id?: number,
        public codigo?: string,
        public estado?: number,
        public nombre?: string,
    ) {
        this.id = null;
        this.codigo = null;
        this.estado = 1;
        this.nombre = null;
    }
}