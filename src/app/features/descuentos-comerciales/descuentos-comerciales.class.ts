export class DescuentoClass {
    constructor(
        public id?: number,
        public codigo?: string,
        public estado?: number,
        public nombre?: string,
        public descuento?: number
    ) {
        this.id = null;
        this.codigo = null;
        this.estado = 1;
        this.nombre = null;
        this.descuento = null;
    }
}