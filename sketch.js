/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var mountains;
var clouds;
var flag = {
    isReached : false,
    xPos: 2000,
    yPos: 100,
};
var isfound;

var trees_x;
var treePos_y;

var collectable;
var collectables;

var x_posc;
var canyonWidth;

var x_pos;

var gray = (192,192,192);
var black = (0,0,0);
var live =
{
    lives: 3,
    isDead: false,
};



function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;

    startGame()
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    treePos_y= height/2;
    
    textSize(50);

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
    //value to initalize whether or not the flag is white
    //flag.isfound = false;
    

	// Initialise arrays of scenery objects.
    trees_x = [100,500,970];
    mountains = [100, 300, 700,1500];
    clouds = [{pos_x:100, pos_y:200},
              {pos_x:1000, pos_y:100},
              {pos_x:400, pos_y:200},
              {pos_x:500, pos_y:50}
             ];
    
    x_posc = 150;
    canyonWidth = 100;
    collectables = [
        {x_pos:100, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos:300, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos:800, y_pos: floorPos_y, size: 50, isFound: false},
    ]; 
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    
    push();
	// Draw clouds.
    translate (scrollPos,0)
    drawClouds()

	// Draw mountains.
    drawMountains()
	// Draw trees.
    drawTrees()
	// Draw canyons.
    drawCanyon()
    checkCanyon()
    drawFlagpole()
    checkPlayerDie()
	// Draw collectable items.
    for (var i = 0; i< collectables.length; i++)
        {
            if (collectables[i].isFound == false)
            {
            drawCollectable(collectables[i])
            }
//            if (dist(gameChar_world_x, gameChar_y, collectable[i].x_pos, collectable[i].y_pos)<20)
//            {
//            collectable.isFound = true;
//            }
        }
    checkFlagpole()
    //checkCollectable()
	// Draw game character.
	pop();
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    
        if (gameChar_y < floorPos_y)
    {
        gameChar_y = gameChar_y + 1.25
    }
    

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    fill(black);
    text(live.lives, 20, 50);
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	//console.log("keyPressed: " + key);
	//console.log("keyPressed: " + keyCode);
    
    if (keyCode == 37)
    {
        isLeft = true;
    }
     
    else if (keyCode == 39)
    {
        isRight = true;
    }
    
    else if (keyCode == 32 && gameChar_y == floorPos_y )
    {   
        isFalling = true;
        gameChar_y = gameChar_y - 100; 
    }
    
    else if (keyCode == 39 && isFalling == true)
    {
        isRight = true;
        isFalling = true;
    }
    
    else if (keyCode == 37 && isFalling == true)
    { 
        isLeft = true;
        isFalling = true;
    }
    

}

function keyReleased()
{
// if statements to control the animation of the character when
	// keys are released.

	//console.log("keyReleased: " + key);
	//console.log("keyReleased: " + keyCode);
    
        if (keyCode == 37)
    {
        console.log ("Left Arrow");
        isLeft = false;
    }
    
    else if (keyCode == 39)
    {
        console.log ("Right Arrow");
        isRight = false;
    }
    
    else if (keyCode == 32)
    {
        isFalling = false;
    }
 
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    if(isLeft && isFalling)
{
    // add your jumping-left code
        fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40,25,30);

        fill(0,125,125);
        rect(gameChar_x-6,gameChar_y-30,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10,8,15);

}
else if(isRight && isFalling)
{
    // add your jumping-right code
        fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40,25,30);

        fill(0,125,125);
        rect(gameChar_x+1,gameChar_y-30,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10,8,15);

}
else if(isLeft)
{
    // add your walking left code
        fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40,25,30);

        fill(0,125,125);
        rect(gameChar_x-6,gameChar_y-30,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10,8,15);

}
else if(isRight)
{
    // add your walking right code
     fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40,25,30);

        fill(0,125,125);
        rect(gameChar_x+1,gameChar_y-30,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10,8,15);


}
else if(isFalling || isPlummeting)
{
    // add your jumping facing forwards code
        fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50-15,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40-15,25,30);

        fill (0,125,125);
        rect(gameChar_x-20,gameChar_y-30-15,8,25);

        fill(0,125,125);
        rect(gameChar_x+12,gameChar_y-30-15,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10-15,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10-15,8,15);

}
else
{
    // add your standing front facing code

        fill(0,0,125);
        ellipse(gameChar_x,gameChar_y-50,20,20);

        fill(125,0,125);
        rect(gameChar_x-12,gameChar_y-40,25,30);

        fill (0,125,125);
        rect(gameChar_x-20,gameChar_y-30,8,25);

        fill(0,125,125);
        rect(gameChar_x+12,gameChar_y-30,8,25);

        fill(125,125,125);
        rect(gameChar_x-10,gameChar_y-10,8,15);

        fill(125,125,125);
        rect(gameChar_x+5,gameChar_y-10,8,15);

}


}

// ---------------------------
// Background render functions
// ---------------------------



// Function to draw mountains objects.

function drawMountains()
{
    for (var i = 0; i<mountains.length; i++)
    {
            fill(120,40,40);
            triangle (mountains[i],floorPos_y,mountains[i]+100,floorPos_y-200,mountains[i]+200,floorPos_y);
    }
}

// Function to draw trees objects.
function drawTrees()
{
        for (var i = 0; i< trees_x.length; i++)
    {
            fill(120,100,40);
            rect(trees_x[i],treePos_y,60, 150);
            
            //branches
            
            fill(0,155,0); 
            //triangle(850,332,930,232,1010,332);
            triangle(trees_x[i]-50, treePos_y + 50, trees_x[i] + 30, treePos_y - 50, trees_x[i] + 110, treePos_y + 50);
            //triangle(850,282,930,182,1010,282);
            triangle(trees_x[i]-50, treePos_y + 100, trees_x[i] + 30, treePos_y - 10, trees_x[i] + 110, treePos_y + 100);
    }
}

// Function to Draw Clouds

function drawClouds()
{
     for (var i = 0; i< clouds.length; i++)
    {
            fill (255);
            ellipse (clouds[i].pos_x, clouds[i].pos_y, 55,55);
            ellipse (clouds[i].pos_x + 25, clouds[i].pos_y, 35,35);
            ellipse (clouds[i].pos_x + 45, clouds[i].pos_y, 25,25)
    }
}
// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon()
{
    fill(120,40,40);
    rect(x_posc, floorPos_y,canyonWidth,145);
}

// Function to check character is over a canyon.

function checkCanyon()
{
       for (let i = x_posc; i < x_posc + canyonWidth; i++)
        {
            if (gameChar_world_x == i && gameChar_y >= floorPos_y)
                {   
                    gameChar_y = gameChar_y +10;
                    isFalling = true;
                }  
        }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
//
function drawCollectable(t_collectable)
{
    noFill();
    strokeWeight(6);
    stroke(220,185,0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos-20, t_collectable.size)
    strokeWeight(0);
}

//Functinon to draw flag pole
function drawFlagpole()
{
    fill(gray);
    triangle(flag.xPos, flag.yPos, flag.xPos-200, flag.yPos-25, flag.xPos-200, flag.yPos+25);
    fill(105,105,105);
    rect(flag.xPos-225, 50,25,385);
}

function checkFlagpole()
{
    if ((dist(flag.xPos-200,100,gameChar_world_x,100)<20))
        {   
         flag.isReached = true
         console.log("Flag is reached")
        }
    if (flag.isReached == true)
    {
    fill(black);
    triangle(flag.xPos, flag.yPos, flag.xPos-200, flag.yPos-25, flag.xPos-200,flag.yPos+25);
    
    if (flag.yPos <= 300)
        {
            flag.yPos +=10;
        }
        else
        {
            flag.yPos +=0;
        }
    textSize(100)
    text("Level Complete",height/2+1500,width/2);
    }
    
}


function checkPlayerDie()
{
    if (gameChar_y >= height * 3/4 + 150)
    {
        live.isDead = true;
        if (gameChar_y>= height * 3/4 + 200)
            { 
            gameChar_x = 576;
            gameChar_y = height * 3/4
            isFalling = true;
            gameChar_y = gameChar_y - 100; 
            fill(0,0,125);
            ellipse(gameChar_x,gameChar_y-50,20,20);

            fill(125,0,125);
            rect(gameChar_x-12,gameChar_y-40,25,30);

            fill (0,125,125);
            rect(gameChar_x-20,gameChar_y-30,8,25);

            fill(0,125,125);
            rect(gameChar_x+12,gameChar_y-30,8,25);

            fill(125,125,125);
            rect(gameChar_x-10,gameChar_y-10,8,15);

            fill(125,125,125);
            rect(gameChar_x+5,gameChar_y-10,8,15);
                
            live.lives = live.lives -1;
            }
        console.log(live.lives);
        
        
    }
    else
    {
        live.isDead = false;
        console.log(live.lives);
    }
    
    if (live.lives<=0)
        {   
            textSize(35);
            text("Do you want to play again? Press Space", height/4,width/4);

                if (keyCode == 32 )
                {   
                    startGame()
                    live.lives = 3;
                }
        
        }
}


// Function to check character has collected an item.

function checkCollectable()
{   
    for (var i = 0; i< collectables.length; i++)
    {
    if (dist(gameChar_world_x, gameChar_y, collectable[i].x_pos, collectable[i].y_pos)<20)
        {
            collectable.isFound = true;
        }
    }
}
