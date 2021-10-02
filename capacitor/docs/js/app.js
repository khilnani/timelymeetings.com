
function updateMeetingTime (startTime, endTime) {
  console.log('updateMeetingTime');

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
  let options = {
    hour: "numeric",
    minute: "2-digit"
  };
  const startTimeStr = startTime.toLocaleTimeString("en-us", options);
  let endTimeStr = endTime.toLocaleTimeString("en-us", options);

  document.getElementById("meetingTime").textContent = startTimeStr + " to " + endTimeStr
}

//-------------------------------

function updateStartTimeOptions() {
  console.log('updateStartTimeOptions');

  let meetingDuration = getMeetingDuration();
  let now = getNow();
  let slots = getTimeslots(now.date, meetingDuration);

  let select = document.getElementById("meetingSlot");
  select.options.length = 0;

  let selected = undefined;

  for(index in slots) {
    select.options[select.options.length] = new Option(slots[index].label, slots[index].value);
    if (slots[index].selected)
      selected = slots[index].value;
  }    
  select.value = selected;
}

//-------------------------------

function updateCountdown () {
  console.log('updateCountdown');

  saveToLocalStorage();

  let o = getUserOptions();
  let meetingDuration = o.meetingDuration;
  let meetingSlot = o.meetingSlot;
  let meetingSpeedy = o.meetingSpeedy;

  let meetingStartTime = new Date(Date.parse(meetingSlot));
  console.log('meetingStartTime', meetingStartTime);


  if (meetingSpeedy === true || meetingSpeedy === "true") {
    meetingDuration = meetingDuration - 5;
  }

  let meetingEndTime = new Date(Date.parse(meetingStartTime) + meetingDuration * 60 * 1000);

  updateMeetingTime(meetingStartTime, meetingEndTime);

  initializeClock("clockdiv", meetingEndTime);

}

//-------------------------------

function onDurationChange() {
  saveDurationToLocalStorage();
  updateStartTimeOptions();
  updateFromLocalStorage();
  updateCountdown();
}

//-------------------------------

function onSpeedyChange() {
  saveSpeedyToLocalStorage();
  updateCountdown()
}

//-------------------------------

function onSlotChange() {
  saveSlotToLocalStorage();
  updateCountdown()
}

//-------------------------------
//-------------------------------

(async function() {

  updateStartTimeOptions();
  updateFromLocalStorage();
  updateCountdown();

  alert(Capacitor.isPluginAvailable('LocalNotifications'));

  try {

    let p = await Capacitor.Plugins.LocalNotifications.checkPermissions()
    alert('checkPermissions ' + p.display);

    let a = await Capacitor.Plugins.LocalNotifications.requestPermissions()
    alert('requestPermissions ' + a.display);

    let e = await Capacitor.Plugins.LocalNotifications.areEnabled()
    alert('areEnabled ' + e.value);

    let r =  await Capacitor.Plugins.LocalNotifications.schedule({
      notifications: [
          {
              id: 1,
              title: 'TEST',
              schedule: {
                on: {
                  year: '2021',
                  month: '10',
                  day: '2',
                  hour: '0',
                  minute: '1',
                },
              },
          },
      ],
    });
  } catch (error) {
    alert(error);
  }

})();

