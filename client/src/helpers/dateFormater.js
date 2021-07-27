/* converts timestamp to dd monthname yyyy format */
const dateFormater = (date) => {
    var months = 'January February March April May June July August Sept October November December'.split(' ');
    var dateElems = date.split(/\D/);
    return dateElems[2] + ' ' + months[dateElems[1] - 1] + ' ' + dateElems[0];
}

export default dateFormater;