const baseURL = 'http://localhost:3006';

const events = '/events';
const users = '/users';

const urls = {
    events,
    users,
    usersByEventId: (eventId: string) => `${users}/${eventId}`,
}
export {
    baseURL,
    urls
}