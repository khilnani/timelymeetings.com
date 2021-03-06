//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function getNow() {
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

//////////////////////////////////////////////////////

export function addMinutes(date, minutes) {
  //console.log("addMinutes");
  return new Date(date.getTime() + minutes*60000);
}

//////////////////////////////////////////////////////

export function getTimeslots(now, duration) {
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
    
    if (selected) {
      // Add 4 extra slots in case folks want to set up for a meeting up to an hour early
      for (let i=0; i < 4; i++) {
        slots.push({
          label: next.toLocaleTimeString(),
          value: next.toString(),
          selected: false,
        });
        next = addMinutes(next, increment);
      }
      break;
    }

    current = next;    
  }

  // don't forget the extra 4
  let slotCount = Math.ceil(duration / increment) + 4;
  console.log('slotCount', slotCount);
  
  slots = slots.slice( slots.length - slotCount);
  console.log('slots', slots);

  return slots;
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////