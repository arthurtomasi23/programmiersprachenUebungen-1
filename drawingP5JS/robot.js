function setup() {
    createCanvas(1000, 1000);
  }
  
  function draw() {
    //color
    background(80);

    //variables
    let xAchse = mouseX;
    let yAchse = mouseY;
    let radius = 60;

    /* xAchse = 200;
    yAchse = 200;
    feste variable für den roboter 

    /*let xAchse = mouseX;
    let yAchse = mouseY;
    sorgt dafür, dass der roboter der Maus folgt*/

    //body
    ellipse(xAchse, yAchse, 300);
    ellipse(xAchse-50, yAchse-20, radius);
    ellipse(xAchse+50, yAchse-20, radius);
    rect(xAchse-50, yAchse+50, 100, 10);
    /*das ist ein roboter mit variabeln verankert, 
    sodass der roboter verschoben werden kann ohne 
    das sich das Gesicht verzehrt*/
  }