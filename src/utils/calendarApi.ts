const { google } = require("googleapis");
const { OAuth2 } = google.auth;
// Create a new instance of oAuth and set our Client ID & Client Secret.
const OAuthClient = new OAuth2(
  "461094068053-388elrc8esicrp22ushls1n3dg873g39.apps.googleusercontent.com",
  "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"
);

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
OAuthClient.setCredentials({
  refresh_token:
    "1//04CgCxv3tP3i7CgYIARAAGAQSNwF-L9IrSnz5HFjz0z1vfzHcicruU6O2lWSWXrhAiJzGkZu-ddUTKIq_KC6FmbK8DsVLEk0MN4I",
});

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date("2023-04-28 04:00:00");
// eventStartTime.setDate(eventStartTime.getDay() + 3)

//

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date("2023-04-28 05:00:00");
console.log(eventStartTime, eventEndTime);
// eventEndTime.setDate(eventEndTime.getDate() + 3)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)
const calendar = google.calendar({ version: "v3", auth: OAuthClient });
// const getEvents = async () => {
//   let res = await calendar.events.list(
//     {
//       calendarId: 'primary',
//       timeMin: event.start.dateTime,
//       timeMax: event.end.dateTime,
//       timeZone: 'Indian/Maldives'
//     })
//   return res['data']
// }
// console.log(getEvents)

// Create a dummy event for temp uses in our calendar
function createCalanderEvent(event) {
  const cal = calendar.freebusy.query(
    {
      resource: {
        timeMin: event.start.dateTime,
        timeMax: event.end.dateTime,
        timeZone: "America/Denver",
        items: [{ id: "primary" }],
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) return console.error("Free Busy Query Error: ", err);

      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars.primary.busy;
      console.log(eventArr);

      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: "primary", resource: event },
          (err) => {
            // Check for errors and log them if they exist.
            if (err)
              return console.error("Error Creating Calender Event:", err);
            // Else log that the event was created.
            return console.log("Calendar event successfully created.");
          }
        );

      // If event array is not empty log that we are busy.
      return console.log(`Sorry I'm busy...`);
    }
  );
}

// function myFunction() {
//   var cal = calendar.getCalendarById(id);
//   var events = cal.getEvents();
//   console.log(events)
//   for (var i in events) {
//     var id = events[i].getId();
//   }
// }

// myFunction()

export default createCalanderEvent;
