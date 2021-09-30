
function selectHasValue(select, value) {
  console.log("selectHasValue");

  let obj = document.getElementById(select);
  console.log(obj);

  if (obj !== null) {
      return (obj.innerHTML.indexOf('value="' + value + '"') > -1);
  } else {
      return false;
  }
}

function getNow() {
  console.log('getNow');

  let date = new Date(Date.now());
  //date.setHours(13, 44, 0, 0);
  let label = date.toLocaleTimeString();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let o = {
    hours,
    mins,
    label,
    date,
  }
  console.log(o)
  return o;
}
  
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
  
function getTimeslots(now, duration) {
  console.log('getTimeslots');

  let increment = 15;

  let current = new Date(Date.now());
  current.setHours(0, 0, 0, 0);
  const midnight = new Date(Date.now());
  midnight.setHours(23, 59, 59, 99);

  let slots = [];

  while  (current < midnight) {
    let next = addMinutes(current, increment);
    let selected = (now >= current && now < next)
    slots.push({
      label: current.toLocaleTimeString(),
      value: current.toString(),
      selected,
    });
    
    if (selected)
      break;

    current = next;    
  }

  let slotCount = Math.ceil(duration / increment);
  console.log('slotCount', slotCount);
  
  slots = slots.slice( slots.length - slotCount);
  console.log('slots', slots);

  return slots;
}

  