import React from 'react';
import DateSection from '../components/DateSection';
import ScheduleEvent from '../components/ScheduleEvent';
import CalendarDay from '../components/CalendarDay';
import './Home.scss';
import Popup from '../components/Popup';
import { getEvent, getEventList } from '../functions/api';
import { createDateHeader, divideByDate, getFormattedDate, getFormattedTime, addDayjsElement } from '../functions/util';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.popup = React.createRef();
        this.state = { schedule: true, popupActive: false, events: null };
    }

    // Pads a date to 2 digits (eg. 1 => '01')
    pad = (num) => {
        if (num < 10) return `0${num}`;
        return `${num}`;
    };

    switchView = () => {
        this.setState({ schedule: !this.state.schedule });
    };

    activatePopup = () => {
        const id = this.popup.current.state.id;
        // TODO: Add check for errors (invalid ID or no ID could be found) -> redirect user to 404 page
        getEvent(id).then((event) => {
            addDayjsElement(event);
            var linkData = [];
            event.links.forEach((link) =>
                linkData.push(
                    <a className="popup-event-link" key={link} href={link}>
                        {link}
                    </a>
                )
            );
            this.setState({
                popupContent: (
                    <div className="home-popup-content">
                        <div className="popup-event-left home-popup-side">
                            {event.type === 'event' ? (
                                <p className="popup-event-type event">Event</p>
                            ) : (
                                <p className="popup-event-type signup">Signup</p>
                            )}
                            <p className="popup-event-name">{event.name}</p>
                            <p className="popup-event-club">{event.club}</p>
                            <p className="popup-event-date">{getFormattedDate(event)}</p>
                            <p className="popup-event-time">{getFormattedTime(event)}</p>
                            {linkData}
                            <p className="popup-event-added-by">{'Added by: ' + event.addedBy}</p>
                        </div>
                        <div className="popup-event-right home-popup-side">
                            <p className="popup-event-description">{event.description}</p>
                        </div>
                    </div>
                ),
            });
        });
    };

    componentDidMount() {
        getEventList().then((events) => {
            // Create a dayjs object for each event
            events.forEach((e) => addDayjsElement(e));

            // Sort the days
            events.sort((a, b) => a.start - b.start);

            // Insert the date objects
            divideByDate(events);

            // Generate the list of events
            var eventList = [];
            events.forEach((e) => {
                if (e.isDate) {
                    eventList.push(<DateSection date={createDateHeader(e.day)} key={e.day}></DateSection>);
                } else {
                    eventList.push(
                        <ScheduleEvent
                            type={e.type}
                            time={getFormattedTime(e)}
                            club={e.club}
                            name={e.name}
                            key={e.objId}
                            onClick={() => {
                                this.popup.current.activate(e.objId);
                            }}
                        ></ScheduleEvent>
                    );
                }
            });
            this.setState({ events: eventList });
        });
    }

    render() {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var calendarHeader = [];
        daysOfWeek.forEach((day) => {
            calendarHeader.push(
                <div className="days-of-week" key={day}>
                    {day}
                </div>
            );
        });
        var calendar = [];
        for (let i = 1; i <= 30; i++)
            calendar.push(<CalendarDay day={this.pad(i)} key={'1 -' + i} events={[]}></CalendarDay>);
        for (let i = 1; i <= 5; i++)
            calendar.push(<CalendarDay day={this.pad(i)} key={'2-' + i} events={[]}></CalendarDay>);

        return (
            <div className="Home">
                <Popup
                    history={this.props.history}
                    id={this.state.popupId}
                    ref={this.popup}
                    activateCallback={this.activatePopup}
                >
                    {this.state.popupContent}
                </Popup>
                <div className="home-top">
                    <div className="dummy"></div>
                    <div className="month-year">November 2020</div>
                    <button className="view-switch" onClick={this.switchView}>
                        {`Switch to ${this.state.schedule ? 'Calendar' : 'Schedule'} View`}
                    </button>
                </div>
                <div className={'schedule-view' + (this.state.schedule ? ' view-active' : '')}>
                    {this.state.events}
                    {/* <DateSection date="Monday 11/9/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="7:00pm - 8:00pm"
                        club="HOPE"
                        description="New Committee GA"
                        onClick={() => {
                            this.popup.current.activate('HOPE');
                        }}
                    ></ScheduleEvent>
                    <DateSection date="Wednesday 11/11/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="8:00pm - 9:00pm"
                        club="Eureka!"
                        description="CRT GA + TARC Info"
                    ></ScheduleEvent>
                    <ScheduleEvent
                        type="event"
                        time="8:00pm - 9:00pm"
                        club="FACES"
                        description="It's Complex Workshop"
                    ></ScheduleEvent>
                    <ScheduleEvent
                        type="event"
                        time="9:00pm - 10:00pm"
                        club="TCS"
                        description="TCS Intro GA"
                    ></ScheduleEvent>
                    <DateSection date="Thursday 11/12/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="6:00pm - 7:00pm"
                        club="Active Minds"
                        description="Mind Talk"
                    ></ScheduleEvent>
                    <ScheduleEvent
                        type="event"
                        time="8:00pm - 9:00pm"
                        club="CSO USACO"
                        description="How to Pass USACO Bronze"
                    ></ScheduleEvent>
                    <DateSection date="Friday 11/13/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="6:00pm - 7:00pm"
                        club="FACES"
                        description="Bills of Fare"
                    ></ScheduleEvent>
                    <DateSection date="Saturday 11/14/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="6:00pm - 7:00pm"
                        club="TAS Comp."
                        description="Intro to USABO"
                    ></ScheduleEvent>
                    <DateSection date="Sunday 11/15/20"></DateSection>
                    <ScheduleEvent
                        type="event"
                        time="3:00pm - 4:00pm"
                        club="TAS Phyiscs"
                        description="Physics Exam 3 Review"
                    ></ScheduleEvent>
                    <ScheduleEvent
                        type="event"
                        time="7:00pm - 9:00pm"
                        club="TAS CS"
                        description="CS Exam 3 Office Hours"
                    ></ScheduleEvent>
                    <ScheduleEvent
                        type="signup"
                        time="11:00pm"
                        club="Elm Fork"
                        description="Elm Fork Signups"
                    ></ScheduleEvent> */}
                </div>
                <div className={'calendar-view' + (!this.state.schedule ? ' view-active' : '')}>
                    <div className="calendar">
                        {calendarHeader}
                        {calendar}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
