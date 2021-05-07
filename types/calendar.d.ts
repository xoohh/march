type AttendeeResponseStatus = gapi.client.calendar.AttendeeResponseStatus
type Calendar = gapi.client.calendar.Calendar
type CalendarListEntry = gapi.client.calendar.CalendarListEntry
type CalendarListInput = gapi.client.calendar.CalendarListInput

interface CalendarEvent extends gapi.client.calendar.Event {
  type?:string
  start_dateTime:Date
  end_dateTime:Date
}

type HttpRequestFulfilled<T> = gapi.client.http.HttpRequestFulfilled<T>

interface Attendance {
  id:string;
  email:string;
  displayName?:string;
  organizer:boolean;
  self:boolean;
  resource:boolean;
  optional?:boolean;
  responseStatus:AttendeeResponseStatus;
  comment?:string;
  additionalGuests?:number
}

type ISOString = string

interface CalendarRequest {
  calendarId:string
  timeMin:ISOString
  timeMax:ISOString
}