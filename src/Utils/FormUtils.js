//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function selectHasValue(select, value) {
  console.log("selectHasValue");

  let obj = document.getElementById(select);
  //console.log(obj);

  if (obj !== null) {
      return (obj.innerHTML.indexOf('value="' + value + '"') > -1);
  } else {
      return false;
  }
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////