const appUrl = import.meta.env.VITE_APP_URL;

const baseURL = appUrl || 'http://localhost:3000';

const events = '/events';
const users = '/users';

const urls = {
    events,
    users,
    usersByEventId: (eventId: number) => `${users}/${eventId}`,
}
export {
    baseURL,
    urls
}