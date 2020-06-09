POINTS TO TALK ABOUT WITH MATTHEW JOSIAH EBENEEZER BREALEY

- I haven't finished tidying it up in as much as I'd like... the main reasons are
  the placement of the big ol' function in Play.svelte as noted, and the need for
  defining user colours for the sliders and then updating the store on submission
  (see below). Obvs if we could bind the sliders to the store values this would
  remove a big chunk of code...

- Another function left in Play.svelte is the switchmodes function - mainly because
  it performs 2 functions and moving it elsewhere would make it a wee bit less
  efficient. Interested to hear your thoughts on efficiency vs placement!

- And oh jeebus I just had a "kablow" moment when I realised the shear gosh darn
  possibilities with derived stores. I can envisage a world where even things like
  text for buttons and the display of paragraphs for a certain round can themselves
  be defined as derived stores based on the gameProgress store! Therefore eliminating
  the need to write all these functions to change em! Wooyah! Let it be noted that
  I noted this. Thoughts?

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

- Look into why my Arduino isn't being detected once plugged in after script is run

- I really like declaring variables inside the css code (as one can do with standard
  JS) rather than inline within the html bit at the bottom of each component

- How to get slider track to overlap to the left (so still displaying when value = 0)

- I know my results page looks different to the design brief, but we're heading out
  now and I don't have the time to put in a slider with initial values as the final
  values and then disable the slider so its just for display. So that's how I'd do
  it.
