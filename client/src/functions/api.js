import config from '../files/config.json';
import { Club, ClubInfo, Event, EventInfo, Volunteering } from './entries';

/**
 * GET to /events - Gets the list of all events
 * @returns {Promise<EventInfo[]>} An array of all events' basic information
 */
async function getEventList() {
    // TODO: Add a start and end time range
    return await fetch(`${config.backend}/events`).then((res) => res.json());
}

/**
 * POST to /add - Creates an event
 * @param {Event} event Event object
 * @returns {Promise<number>} POST status [200 for Success & 400 for Failure]
 */
async function postEvent(event) {
    const res = await fetch(`${config.backend}/add-event`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
    });
    return res.status;
}

/**
 * GET to /club?id={id} - Gets club with given id
 * @returns {Promise<Club>} Object of club specified by id
 */
async function getClub(id) {
    var obj = await fetch(`${config.backend}/club?id=${id}`).then((res) => res.json());
    obj.id = obj._id;
    delete obj._id;
    return obj;
}

/**
 * GET to /club-list - Gets the list of clubs
 * @returns {Promise<ClubInfo[]>} An array of all clubs' basic information
 */
async function getClubList() {
    return await fetch(`${config.backend}/club-list`).then((res) => res.json());
}

/**
 * GET to /volunteering - Gets the list of volunteering opportunities
 * @returns {Promise<Volunteering[]>} An array of all volunteering opportunities
 */
async function getVolunteering() {
    return await fetch(`${config.backend}/volunteering`).then((res) => res.json());
}

/**
 * POST to /feedback - Uploads user feedback
 * @param {string} feedback The feedback
 * @returns {Promise<number>} POST status [200 for Success & 400 for Failure]
 */
async function postFeedback(feedback) {
    console.log(feedback);
    const res = await fetch(`${config.backend}/feedback`, {
        method: 'POST',
        body: JSON.stringify({ feedback }),
        headers: { 'Content-Type': 'application/json' },
    });
    return res.status;
}

export { getClub, getClubList, postFeedback, postEvent, getEventList, getVolunteering };
