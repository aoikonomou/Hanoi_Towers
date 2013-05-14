//Global variables declaration

//var originalRodPositions = ["r1p1","r1p2","r1p3","r2p1","r2p2","r2p3","r3p1","r3p2","r3p3"];
//var rodpositions = ["r1p1","r1p2","r1p3","r2p1","r2p2","r2p3","r3p1","r3p2","r3p3"];
//var rodBottomPositions = [2,5,8];



function drag(ev) 
{
  ev.dataTransfer.setData("Text",ev.target.id); //Put the name (id) of the thing you are dragging in the dataTransfer location in memeory for future use
}

function allowDrop(ev) 
{
  ev.preventDefault(); //Make the element you want to drop things on to accept items. By default things will not accept other things dropped on them (except images and links I think)
}

function drop(ev) 
{

  var diskBeingDragged = -1; // No disk being dragged at the start, we 'll find out which disk we are dragging in a moment...
  var myRodTarget = -1; // Rod target for dragged disk

  var idDrag = ev.dataTransfer.getData("Text"); // Get the id of the item being dragged from "dataTransfer"

  if (idDrag == "Disk1") { diskBeingDragged = 1; // If smallest disk being dragged change your relevant variable to 1
  }

  if (idDrag == "Disk2") {
  diskBeingDragged = 2; // if middle disk being dragged change your variable to 2
  }

  if (idDrag == "Disk3") {
  diskBeingDragged = 3; // if biggest disk being dragged change variable to 3
  }

  var myTarget = ev.target.id; // Get the name (id) of the element you want to drop your thing on
  
  if (myTarget == "r1p1" || myTarget == "r1p2" || myTarget == "r1p3") {
    myRodTarget = 0;
  } 

  if (myTarget == "r2p1" || myTarget == "r2p2" || myTarget == "r2p3") {
    myRodTarget = 1;
  } 

  if (myTarget == "r3p1" || myTarget == "r3p2" || myTarget == "r3p3") {
    myRodTarget = 2;
  } 

  putDisk(diskBeingDragged, myRodTarget, ev, myTarget, idDrag);
  //putDiskOnRod(myTarget,ev,idDrag); // Pass its name to this function for further processing (e.g. testing of whether certain conditions are satisfied)
 
}





















































function putDiskOnRod(myTarget,ev,idDrag) 
{

  for (var i = 0; i<=rodpositions.length; i++) {  //Search through the rod positions...
    if (myTarget == rodpositions[i]) //myTarget should match one of the empty rodpositions...
    {
      for (var j = 0; j<=rodpositions.length; j++) { // OK, an empty rod position was matched but is the Disk at hand already in another position? 
        if (idDrag == rodpositions[j]) 
        {
            rodpositions[j] = originalRodPositions[j]; // It is,so clear that spot
          }
        }

      //Is the new position at the bottom or the rod?

      if (rodpositions[i] == "r1p3" || rodpositions[i] == "r2p3" || rodpositions[i] == "r3p3" ) // Yes
      {
        executeDiskPlacement(i,myTarget,ev,idDrag);
        return true; // Exit the function
      }

      //Is the new position not at the bottom but the space below is empty?
      var k=i; // So that you don't interfere with the main loop

      for (var r = 0;r <4; r++) {

        if (k < rodBottomPositions[r]  && rodpositions[k+1] != "Disk1" && rodpositions[k+1] != "Disk2" && rodpositions[k+1] != "Disk3") {
        while (k < rodBottomPositions[r] && rodpositions[k+1] != "Disk1" && rodpositions[k+1] != "Disk2" && rodpositions[k+1] != "Disk3") // Let's test whilst we are not at the bottom of the rod...
        {
        document.getElementById("debugArea").innerText = rodpositions[k+1]+" is now full with it's variable changed to "+rodpositions[i+1]; // Tell the user
        ev.preventDefault(); // Turn off the default behaviour to stop things from happening as usual after the drop 
        document.getElementById(rodpositions[k+1]).appendChild(document.getElementById(idDrag));
        
         for (var j = 0; j<=rodpositions.length; j++) { // OK, an empty rod position was matched but is the Disk at hand already in another position? 
          if (idDrag == rodpositions[j]) 
          {
            rodpositions[j] = originalRodPositions[j]; // It is,so clear that spot
          }
        }
        rodpositions[k+1] = idDrag; // Put the disk you are holding in the new, empty rod space
        k++;
      } 
      return true; // Exit the function
    }
  }
  executeDiskPlacement(i,myTarget,ev,idDrag);
      return true; // Exit the function
    } 
  }
  alert("This position is full with ..."); // If the incoming target position was not found then let the user know 
}

function executeDiskPlacement(counter, myTarget, ev, idDrag){

      rodpositions[counter] = idDrag; // Put the disk you are holding in the new, empty rod space
      // document.getElementById("debugArea").innerText = myTarget+" is now full with it's variable changed to "+rodpositions[counter]; // Tell the user
      ev.preventDefault(); // Turn off the default behaviour to stop things from happening as usual after the drop 
      ev.target.appendChild(document.getElementById(idDrag)); // Append the dragged item to the item it is currently over
    }