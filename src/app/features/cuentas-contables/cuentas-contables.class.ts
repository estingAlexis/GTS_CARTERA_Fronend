export class CuentasContablesClass {

    constructor(
        public id?: number,
        public codigo?: number,
        public naturaleza?: number,
        public nivel?: number,
        public nombre?: string,
        public tasa?: number,
        public retencion?: any,
        public movimientos?: any
    ) {
        this.codigo = null;
        this.naturaleza = null;
        this.nivel = null;
        this.nombre = null;
        this.tasa = null;
        this.retencion = null;
        this.movimientos = null;
    }
}
