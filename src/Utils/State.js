import * as FormHelpers from './FormUtils'

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function getMeetingDuration() {
  console.log("getMeetingDuration");

  let select = undefined;  
  select = document.getElementById("meetingDuration");
  let meetingDuration = select.options[select.selectedIndex].value;
  return meetingDuration;
}

//////////////////////////////////////////////////////

export function getUserOptions () {
  console.log("getUserOptions");

  let select = undefined;  
  select = document.getElementById("meetingDuration");
  let meetingDuration = select.options[select.selectedIndex].value;

  let meetingSlot = -1;
  select = document.getElementById("meetingSlot");
  console.log("getUserOptions - meetingSlot.selectedIndex", select.selectedIndex);
  if (select.selectedIndex > -1) 
  meetingSlot = select.options[select.selectedIndex].value;

  const meetingSpeedy = document.getElementById("meetingSpeedy").checked;

  select = document.getElementById("meetingWarning");
  let meetingWarning = select.options[select.selectedIndex].value;

  let o ={
    "meetingDuration": meetingDuration,
    "meetingSlot": meetingSlot,
    "meetingSpeedy": meetingSpeedy,
    "meetingWarning": meetingWarning,
  }
  console.log("getUserOptions.o", o);
  return o;
}

//////////////////////////////////////////////////////

export function saveEnabledStateToLocalStorage(enabled) {
  console.log("saveEnabledStateToLocalStorage", enabled);
  localStorage.setItem('enabled', enabled)
}

//////////////////////////////////////////////////////

export function getEnabledStateToLocalStorage() {
  console.log("getEnabledStateToLocalStorage");

  let enabled = localStorage.getItem('enabled')
  if(enabled && typeof(enabled) === "string") {
    enabled = (enabled === "true");
  } else {
    enabled = true; // default is enabled
  }
  console.log('getEnabledStateToLocalStorage - enabled', enabled, typeof(enabled));
  return enabled;
}

//////////////////////////////////////////////////////

export function saveDurationToLocalStorage() {
  console.log("saveDurationToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingDuration', o.meetingDuration)
}

//////////////////////////////////////////////////////

export function saveSlotToLocalStorage() {
  console.log("saveSlotToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingSlot', o.meetingSlot)
}

//////////////////////////////////////////////////////

export function saveSpeedyToLocalStorage() {
  console.log("saveSpeedyToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingSpeedy', o.meetingSpeedy)
}

export function saveWarningToLocalStorage() {
  console.log("saveWarningToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingWarning', o.meetingWarning)
}

//////////////////////////////////////////////////////

export function saveToLocalStorage() {
  console.log("saveToLocalStorage");

  saveDurationToLocalStorage();
  saveSlotToLocalStorage();
  saveSpeedyToLocalStorage();
  saveWarningToLocalStorage();
}

//////////////////////////////////////////////////////

export function updateFromLocalStorage(updateStartTimeOptions) {
  console.log("updateFromLocalStorage")

  let meetingDuration = localStorage.getItem('meetingDuration')
  console.log('lc.meetingDuration', meetingDuration, typeof(meetingDuration));
  
  let meetingSlot = localStorage.getItem('meetingSlot')
  console.log('lc.meetingSlot', meetingSlot, typeof(meetingSlot));

  let meetingSpeedy = localStorage.getItem('meetingSpeedy')
  console.log('lc.meetingSpeedy', meetingSpeedy, typeof(meetingSpeedy));

  let meetingWarning = localStorage.getItem('meetingWarning')
  console.log('lc.meetingWarning', meetingWarning, typeof(meetingWarning));

  if (meetingDuration) {
    document.getElementById("meetingDuration").value = meetingDuration;
    // Make sure the options are correct before trying to preselect the selected slot
      updateStartTimeOptions();
  }
  
  if (FormHelpers.selectHasValue("meetingSlot", meetingSlot))  
    document.getElementById("meetingSlot").value = meetingSlot;
  
  if (meetingSpeedy) {
    console.log('meetingSpeedy.checked', (meetingSpeedy === "true"))
    document.getElementById("meetingSpeedy").checked = (meetingSpeedy === "true");
  }

  if(meetingWarning) {
    document.getElementById("meetingWarning").value = meetingWarning;
  }
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////