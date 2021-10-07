
import * as Utils from './Utils'

//-------------------------------

export function getMeetingDuration() {
  console.log("getMeetingDuration");

  let select = undefined;  
  select = document.getElementById("meetingDuration");
  let meetingDuration = select.options[select.selectedIndex].value;
  return meetingDuration;
}

export function getUserOptions () {
  console.log("getUserOptions");

  let select = undefined;  
  select = document.getElementById("meetingDuration");

  let meetingDuration = select.options[select.selectedIndex].value;
  select = document.getElementById("meetingSlot");

  let meetingSlot = -1;
  console.log('select.selectedIndex', select.selectedIndex);
  if (select.selectedIndex > -1) 
  meetingSlot = select.options[select.selectedIndex].value;

  const meetingSpeedy = document.getElementById("meetingSpeedy").checked;

  let o ={
    "meetingDuration": meetingDuration,
    "meetingSlot": meetingSlot,
    "meetingSpeedy": meetingSpeedy,
  }
  console.log("getUserOptions.o", o);
  return o;
}

export function savePausedStateToLocalStorage(paused) {
  console.log("savePausedStateToLocalStorage", paused);
  localStorage.setItem('paused', paused)
}

export function getPausedStateToLocalStorage() {
  console.log("savePausedStateToLocalStorage");

  let paused = localStorage.getItem('paused')
  console.log('savePausedStateToLocalStorage - paused', paused, typeof(paused));
  return paused;
}

export function saveDurationToLocalStorage() {
  console.log("saveDurationToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingDuration', o.meetingDuration)
}

export function saveSlotToLocalStorage() {
  console.log("saveSlotToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingSlot', o.meetingSlot)
}


export function saveSpeedyToLocalStorage() {
  console.log("saveSpeedyToLocalStorage");

  let o = getUserOptions(); 
  localStorage.setItem('meetingSpeedy', o.meetingSpeedy)
}

export function saveToLocalStorage() {
  console.log("saveToLocalStorage");

  saveDurationToLocalStorage();
  saveSlotToLocalStorage();
  saveSpeedyToLocalStorage();
}


export function updateFromLocalStorage(updateStartTimeOptions) {
  console.log("updateFromLocalStorage")

  let meetingDuration = localStorage.getItem('meetingDuration')
  console.log('lc.meetingDuration', meetingDuration, typeof(meetingDuration));
  
  let meetingSlot = localStorage.getItem('meetingSlot')
  console.log('lc.meetingSlot', meetingSlot, typeof(meetingSlot));

  let meetingSpeedy = localStorage.getItem('meetingSpeedy')
  console.log('lc.meetingSpeedy', meetingSpeedy, typeof(meetingSpeedy));

  if (meetingDuration) {
    document.getElementById("meetingDuration").value = meetingDuration;
    // Make sure the options are correct before trying to preselect the selected slot
      updateStartTimeOptions();
  }
  
  if (Utils.selectHasValue("meetingSlot", meetingSlot))  
    document.getElementById("meetingSlot").value = meetingSlot;
  
  if (meetingSpeedy) {
    console.log('meetingSpeedy.checked', (meetingSpeedy === "true"))
    document.getElementById("meetingSpeedy").checked = (meetingSpeedy === "true");
  }
}

  //-------------------------------