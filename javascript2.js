var rods = [[0,0,0],[0,0,0],[0,0,0]];	

var diskNotPlaced = true;
var previousDiskRod = -1;
var previousDiskPosition = -1;
//var diskBeingDragged = -1;




function putDisk(diskBeingDragged, myRodTarget, ev, myTarget, idDrag){

	while (diskNotPlaced)

	{

		if (rods[myRodTarget][2] == 0) { //If the botom position of the rod is empty...

			emptyPreviousLocation(diskBeingDragged); //...remove this disk from any previous locations...
			rods[myRodTarget][2] = diskBeingDragged; //...put the disk there
			
			myTarget = myTarget.slice(0,3).concat("3"); // change the target cell from the target you are hovering over to the bottom of the rod if empty.
			
			alert(myTarget+" I am in rod "+myRodTarget+" position "+myTarget);
			
			executeDiskPlacement2(ev, myTarget, idDrag); // I am not passing the right variable here for which position to graphically update
			//diskNotPlaced = false;
			return true; //...exit the function

		} else {

			alert("Disk below..." +rods[myRodTarget][2]+" and the disk being dragged is "+diskBeingDragged);

			if (rods[myRodTarget][1] == 0 && diskBeingDragged < rods[myRodTarget][2]) { // if the position immediately above is empty and the disk below is bigger..
				emptyPreviousLocation(diskBeingDragged); //...remove this disk from any previous locations...
				rods[myRodTarget][1] = diskBeingDragged; //... put the disk there
				//alert("I am in rod "+myRodTarget);

				myTarget = myTarget.slice(0,3).concat("2"); // change the target cell from the target you are hovering over to 

				executeDiskPlacement2(ev, myTarget, idDrag);
				//diskNotPlaced = false;
				return true; //...exit the function

			} else {

				if (rods[myRodTarget][0] == 0 && diskBeingDragged < rods[myRodTarget][1] ) { // if the position immediately above is empty and the disk below is bigger..
					emptyPreviousLocation(diskBeingDragged); //...remove this disk from any previous locations...
					rods[myRodTarget][0] = diskBeingDragged; //... put the disk there

					myTarget = myTarget.slice(0,3).concat("1"); // change the target cell from the target you are hovering over to 

					executeDiskPlacement2(ev, myTarget, idDrag);
					//diskNotPlaced = false;
					return true; //...exit the function

				} else {

					alert("Sorry mate, you can't put this disk here, you have smaller disks below it");
					diskNotPlaced = false; // Exit the while loop here if you can't position the disk...

				}
			}
		}
	}
	diskNotPlaced = true; // Reset the variable that checks whether you should enter in the while loop so you can drag another disk
	tellMe(); // This function shows the contents of the rods array. In this case we want to see the contents after the above has happened
}



function emptyPreviousLocation(diskBeingDragged) {

	for (var i = 0; i<3; i++) {
		for (var j = 0; j<3; j++){
			 if (rods[i][j] == diskBeingDragged) {

			 	previousDiskRod = i; // keep previous rod in this variable
			 	previousDiskPosition =j; // keep previous position in rod in this variable

			 	rods[i][j] = 0;
			 }
		}
	}
}

function executeDiskPlacement2(ev, myTarget, idDrag){
      ev.preventDefault(); // Turn off the default behaviour to stop things from happening as usual after the drop 
      //ev.target.appendChild(document.getElementById(idDrag)); // Append the dragged item to the item it is currently over
      document.getElementById(myTarget).appendChild(document.getElementById(idDrag));
    }


function tellMe(){
	for (var i = 0; i<3; i++) {
		for (var j = 0; j<3; j++){
			 document.getElementById("debugArea").innerText += "\n Rod "+ i + " position "+j+" has "+ rods[i][j]+" in it";
		}
	}
}
