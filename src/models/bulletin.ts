import moment from 'moment';

interface Bulletin {
    id: string;
    message: string;
    author: string;
    thumbnail_url: string;
    expiry_dt: moment.Moment;
}

export default Bulletin;
