window.onload = function()
{
  var keys = ["Score 1","Score 2","Score 3","Score 4","Score 5"];
	var colors = generateRandomColors();
	var grid= document.getElementsByClassName("grid")[0];
  var rows= 4;
  var columns = 5;
	var Ids = [100,200,300,400,500];
	var k=0,x=0;
	var order = [];
	var ugNum = [];
	var lgNum = [];
	var current_num = 1;
	var next_num = 21;
	var index_lg = [];
	var index_ug = [];
	var sec,ms,count,sec_alt,ms_alt;
  var message,game,score;
  var resetBtn = document.getElementById("reset");
  var easyBtn = document.getElementById("easyBtn");
  var hardBtn = document.getElementById("hardBtn");
  var mode = true;
  var j=0;
  var counter = 5;
  var ls_array = [];
  var is_playing = false;

	for(var i=0;i<40;i++)
    {
        order[i] = i+1;
    }
	 function create(rows,columns)
	{
      for(var i=0;i<rows;i++)
    {
        var newNode = document.createElement("div");
        var referenceNode = document.querySelector(".grid");
        newNode.className = "row";
        newNode.setAttribute("id", Ids[i]);
        referenceNode.appendChild(newNode);
        for(var j=0;j<columns;j++)
        {
          var nNode = document.createElement("div");
          var rNode = document.getElementById(Ids[i]);
          nNode.className = "grid-items";
          nNode.setAttribute("id", order[k]);
          k++;
          rNode.appendChild(nNode);
          
          
        }
    }
    k=0;
  }
    create(rows,columns);
   
    // Click Easy Button
    easyBtn.addEventListener("click", function()
    {
      if(!is_playing)
      {
      reset();
      var bestScore = document.getElementById("bestScore");
      var gameNum = document.getElementById("GameNum");
      bestScore.textContent = "0" + sec + ":" + ms + "0";
      counter = 5;
      gameNum.textContent = counter.toString();
      is_playing = false;
      localStorage.clear();
      mode = false;
      easyBtn.classList.add("selected");
      hardBtn.classList.remove("selected");
      deleteGrid();
      easyMode();
      }
      
    });

// Click Hard Button
  hardBtn.addEventListener("click",function(){
    if(!is_playing)
    {
    reset();
    var bestScore = document.getElementById("bestScore");
    var gameNum = document.getElementById("GameNum");
    bestScore.textContent = "0" + sec + ":" + ms + "0";
    counter = 5;
    gameNum.textContent = counter.toString();
    is_playing = false;
    localStorage.clear();
    mode = true;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    deleteGrid();
    hardMode();
    }
    
  });

// Reset Button
resetBtn.addEventListener("click",function()
{
 
  if(this.textContent === "New Game")
  {
     if(counter>0)
   {
    counter--;
    lsitems();
    displayScore();
   }
   if(counter === 0)
   {
    stopwatch.stop();

   }
  var gameNum = document.getElementById("GameNum");
  gameNum.textContent = counter.toString();
  }
  if(this.textContent === "Reset")
  {
    localStorage.removeItem(game);
    is_playing = false;
  }
  
  this.textContent = "Reset";
  if(mode)
  {
    j=0;
    reset();
    deleteGrid();
    hardMode();
  }
  else
  {
    reset();
    deleteGrid();
    easyMode();
  }
  if(counter === 0)
  {
    stopGame();
    easyBtn.classList.add("fade");
    this.onclick = function()
    {
      localStorage.clear();
      location.reload();
    }
  }

  
});
    for (var i = 0; i <20; i++) 
	{
      lgNum[i] = i+1;
	}
	for (var i = 0; i <20; i++) 
	{
		  ugNum[i] = 20 + (i+1);
	}
	
	//    To randomise array elements - Fisher-Yates shuffle
   function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  shuffle(lgNum);
  shuffle(ugNum);
  function index()
  {
     // To get index of lower grid
  for (var i = 0; i < lgNum.length; i++) 
  {
    index_lg[i] = lgNum.indexOf(i+1);
    index_lg[i]++;
  }
  // To get index of upper grid
  for (var i = 0; i < ugNum.length; i++) 
  {
    index_ug[i] = ugNum.indexOf(20+i+1);
    index_ug[i]++;
  }
  }
 index();

//   To give each grid-item a unique number
function content(gridNum)
{
    var items = document.getElementsByClassName("grid-items");
    for(var i=0;i<gridNum.length;i++)
    {
        items[i].textContent = gridNum[i];
    }
    

}
content(lgNum);
lgColor(index_lg);
var start = document.getElementById(index_lg[0]);
var stop = document.getElementById(index_lg[19]);

// StopWatch Function
var stopwatch = 
{
  start: function()
  {
    ms = 0;
    sec = 0;
    count = setInterval(function()
    {
      if(ms == 100)
      {
        ms = 0;
        sec++;
      }
      else
      {
        ms++;
      }
      sec_alt = stopwatch.display(sec);
      ms_alt = stopwatch.display(ms);

      stopwatch.update(sec_alt + ":" + ms_alt);
    },10);
  },
  stop: function()
  {
    clearInterval(count);
  },
  update: function(txt)
  {
    var temp = document.getElementById("timer");
    temp.firstChild.nodeValue = txt;
  },
  display: function(time)
  {
    var temp;
    if(time < 10)
    {
      temp = "0" + time;
    }
    else
    {
      temp = time;
    }
    return temp;
    
  }
};
start.addEventListener("click",stopwatch.start);
// endGame Function
function endGame()
{
  is_playing = false;
  resetBtn.textContent = "New Game";
  stopwatch.stop();
  // To remove all the tiles after every round
  var elements = document.getElementsByClassName("grid-items");
    for(var i=0;i<elements.length;i++)
    {
      elements[i].classList.add("fade");
    }
    // To display the score after every round
     game= "Score " + counter.toString();
     message = document.getElementById("scoreDisplay");
     message.classList.remove("fade");
     score = document.getElementById("timer").textContent;
     message.innerHTML = "Your Score is " + score;
     if(counter>0)
     {
      localStorage.setItem(game,score);

     }
        sec = 0;
        ms = 0;  
}

// Click Tile function
function check(index,start)
{

    for(var i=0;i<20;i++)
    {
        
        var element = document.getElementById(index[i]);
        
         element.addEventListener("click", function()
         {
            var click= Number(this.textContent);
        
            
            if(click === current_num)
            {
                if(current_num <= 20)
                {
                  is_playing = true;
                  start.removeEventListener("click",stopwatch.start);
                  this.className+= " fade";
                  current_num++;
                  next_num++;
                  var shade = ugNum[j];
				          this.textContent = ugNum[j] ;
                  j++;
                  this.style.backgroundColor = colors[40-shade];
                  this.classList.toggle("fade"); 
                }
                else
                {
                  is_playing = true;
                	this.classList.add("fade");
                	check(index_ug);
                	current_num++;
                }
                if(current_num>40)
                {
                  is_playing = false;
                	stopwatch.stop();
                	endGame();
                  return;
                }
               
            }
            
           
        });
        
    }

}
check(index_lg,start);
function checkEasy(index,start)
{
  for(var i=0;i<40;i++)
    {
        
        var element = document.getElementById(index[i]);
         element.addEventListener("click", function(){
          var click= Number(this.textContent);
            

            if(click === current_num)
            {
              is_playing = true;
              start.removeEventListener("click",stopwatch.start);
              this.className+= " fade";
              current_num++;
                
            }
            if(current_num>40)
            {
              is_playing = false;
              endGame();
              return;
            }
            
        });
        
    }
}

function generateRandomColors()
{
    // Create an array
    var arr = [];
    // Repeat num times
    for (var i = 0; i < 40; i++) 
    {
         // get random no. and push it into the array
         arr.push(colorShades());
    }
    // return  the array
    var sorted = arr.sort();
    return sorted;
}

function colorShades()
{
    var red = Math.floor(Math.random() * 120 + 138);
    return ("rgb(" + red + ", 255, 255)");
}
function lgColor(index)
{

	for(var i=0;i<index.length;i++)
	{
		var element = document.getElementById(index[i]);
		element.style.backgroundColor = colors[39-i];
	}
}

// Remove Classes
var  els = document.getElementsByClassName("grid-items fade");
function _removeClasses () 
{
  while (els[0])
  {
    els[0].classList.remove('fade');
  }
}

// Stop Game Function
function stopGame()
{
  stopwatch.stop();
  var best = document.getElementById("bestScore").textContent;
  var final_score = document.getElementById("scoreDisplay");
 final_score.textContent = "Your Final Score is " + best;
  document.querySelector(".time").classList.add("fade");
   final_score.classList.remove('fade');
  localStorage.clear();
  counter == 5;
   deleteGrid();

}
// To store the values of local storage in an array an sorting that array
function lsitems()
{
  if(localStorage.length>0)
  {
    if(x<=4)
    {
       ls_array[x] = localStorage.getItem(keys[4-x]);
       x++;
    }
   ls_array.sort();
  }
  return;
}
// To display best score function
function displayScore()
{
  if(localStorage.length>0)
  {
    var display = document.getElementById("bestScore");
    display.textContent = ls_array[0];

  }
}
// Reset function
function reset(numbers,mode)
{
current_num = 1;

stopwatch.stop();
sec = 0;
ms = 0;
stopwatch.update("0" + sec + ":" + ms + "0");
 _removeClasses();
 document.querySelector(".time").classList.remove('fade');
 document.getElementById("scoreDisplay").classList.add('fade');
 document.getElementById("scoreDisplay").textContent = "Your Score is" + sec + ":" + ms;
}

// Function EasyMode
function easyMode()
{
      rows = 5;
      columns = 8;
      current_num = 1;
      create(rows,columns);
      var numbers = [];
      var index = [];
      for(var i=0;i<40;i++)
      {
        numbers[i] = i+1;
      }
      
      shuffle(numbers);
      content(numbers);
      // To find the ids of all the numbers
      for(var i=0; i<numbers.length;i++)
  {
      index[i] = numbers.indexOf(i+1);
      index[i]++;
  }
    lgColor(index);
    var start = document.getElementById(index[0]);
    var stop = document.getElementById(index[39]);
    start.addEventListener("click",stopwatch.start);
    checkEasy(index,start);
}

// Function Hard Mode
function hardMode()
{
       rows = 4;
       columns = 5;
       current_num = 1;
      create(rows,columns);
      shuffle(lgNum);
      shuffle(ugNum);
      content(lgNum);
      index();
      lgColor(index_lg);
      var start = document.getElementById(index_lg[0]);
      var stop = document.getElementById(index_lg[19]);
      start.addEventListener("click",stopwatch.start);
      check(index_lg,start);
}
function deleteGrid()
{
  var items = document.getElementsByClassName("row");
    
    for (var i = 0; i < items.length; i++) 
      {
         items[i].remove();
      } 
    items[0].remove();
    items[0].remove();

}
}