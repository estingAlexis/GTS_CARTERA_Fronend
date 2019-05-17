export const APP: any = {
    ApiEndpoint: 'http://localhost:3000',
    AppBaseUrl: 'http://localhost:4210',
}

const paginate: DataTables.LanguagePaginateSettings = {
    first: 'Primero',
    last: 'Último',
    next: 'Siguiente',
    previous: 'Anterior'
};
export let DataSpanidhDatatable: DataTables.LanguageSettings = {
    emptyTable: 'No se encontraron datos',
    info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
    infoFiltered: '(filtrado de un total de _MAX_ registros)',
    infoPostFix: '',
    thousands: ',',
    lengthMenu: 'Mostrar _MENU_ registros',
    loadingRecords: 'Cargando...',
    processing: 'Procesando...',
    search: 'Buscar:',
    searchPlaceholder: '',
    zeroRecords: 'No se encontraron resultados',
    aria: {
        sortAscending: ' Activar para ordenar la columna de manera ascendente',
        sortDescending: ' Activar para ordenar la columna de manera descendente',
        paginate: paginate
    },
    url: '',
    paginate: paginate
};