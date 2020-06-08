import { writable, derived } from 'svelte/store';
import { convertToPercentage } from './calculations.js';

const defaultValues = {
 red: 0,
 blue: 0,
 green: 0,
};

function setUpColourStore() {

 const { subscribe, set, update } = writable(defaultValues);

 function resetValues() {
   set(defaultValues);
 }

 function updateValues(red, green, blue) {
   update(colours => {
     return {
       red: red,
       green: green,
       blue: blue
     };
  });
 }

 return {
   subscribe,
   updateValues,
   resetValues
 };

}

export const userColours = setUpColourStore();



export const userColoursPerc = derived(
	userColours,
	$userColours => {return {
      red: convertToPercentage($userColours.red),
      green: convertToPercentage($userColours.green),
      blue: convertToPercentage($userColours.blue),
    };
  }
)
