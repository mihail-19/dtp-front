export const displayMonth =  (month) =>{
    let res = 'всі'
    switch (month) {
    case '0':
        res = 'січень'
        break;

    case '1':
        res = 'лютий'
        break;
    
    case '2':
        res = 'березень'
        break;

    case '3':
        res = 'квітень'
        break;
    case '4':
        res = 'травень'
        break;

    case '5':
        res = 'червень'
        break;

    case '6':
        res = 'липень'
        break;

    case '7':
        res = 'серпень'
        break;
    case '8':
        res = 'вересень'
        break;

    case '9':
        res = 'жовтень'
        break;
    case '10':
        res = 'листопад'
        break;

    case '11':
        res = 'грудень'
        break;


    default:
        res = 'всі місяці'
    }

    return res
}