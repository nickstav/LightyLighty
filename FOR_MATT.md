POINTS TO TALK ABOUT WITH MATTHEW JOSIAH EBENEEZER BREALEY

- I haven't finished tidying it up in terms of where I'm putting functions and files
  yet, so if you end up having a look before I get back to it then that could be
  something we look at together (eg more functions removed away from svelte files &
  putting colourStore.js and gameStore.js in their own "stores" folder)

- Once quitting the game, I can't seem to get it going again. The game progress
  store looks correct when we restart, and the app flows okay... it just doesn't
  seem to talk to the led anymore (which it should because there's nothing server
  side I can think of would stop it doing so...) have I missed something obvious
  or is this linked to why it won't detect the Arduino if connected after script
  run...?

- I've added a store for the user colours, but it didn't like binding the store values
  to the sliders _at all_ - so I've left the user values in Play.svelte and am just
  currently updating the colours store after each round is complete... can you get
  the sliders linked to the colour store values I wonder...?

- The placement of the big function within Play.svelte as noted

- Look into why my Arduino isn't being detected once plugged in after script is run

- I really like declaring variables inside the css code (as one can do with standard
  JS) rather than inline within the html bit at the bottom of each component

- How to get slider track to overlap to the left (so still displaying when value = 0)

- I know my results page looks different to the design brief, but we're heading out
  now and I don't have the time to put in a slider with initial values as the final
  values and then disable the slider so its just for display. So that's how I'd do
  it.
