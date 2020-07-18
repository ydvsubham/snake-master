var snake_type;
  function check() {
      snake_type=0;
    }
    function uncheck() {
      snake_type=1;
    }

  
  
  let leftBound ;//left boundry of game feild
  let rightBound ;//right boundry of game feild
  let upperBound ;//upper boundry of game feild
  let lowerBound ;//lower boundry of game feild
  const box = 12; // 1 box =1 unit of feild
  const box_in_feild=40; // total number of box in field by withd or height(i.e. lenght of feild in terms of box)
  let speed;
  let score=0; 
  let d="LEFT";
  var pause_btn = true;

  
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
  var snakeLenght= document.getElementById('slenght').value;
  var option = document.querySelector(".button");
  var game_over = document.querySelector(".game_over");
  var pause_display = document.querySelector(".pause");

  function pause(){
      pause_btn = false;
      pause_display.style="height:480px;";
    }
  function setting(){
    clearInterval(game);
    option.style="display:flex";
  }
  
  const groundimg=new Image();
  groundimg.src='img/ground.jpg';

  const foodimg= new Image();
  foodimg.src='img/food.jpg';

  let dead = new Audio();
  dead.src='sound/dead.mp3';
  let eat = new Audio();
  eat.src='sound/eat.mp3';
  let keysound = new Audio();
  keysound.src='sound/keysound.mp3';
  
    
  
  let snake=[];

  for(var l=0; l<snakeLenght;l++){
    snake[l]={
      x : (15+l)*box,
      y : 9*box
    };
  }
  


  let food = {
    x : Math.floor(Math.random()*box_in_feild) * box,
    y : Math.floor(Math.random()*box_in_feild) * box
  }

  

  function collision(head,array){
      for(let i = 0; i < array.length; i++){
          if(head.x == array[i].x && head.y == array[i].y){
              return true;
          }
      }
      return false;
  }
  document.addEventListener("keydown",direction);

  function direction(event){

    let key = event.keyCode;
    if(key == 32){
      pause();
    }else if( key == 37 && d != "RIGHT"){
    	keysound.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
    	keysound.play();
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
    	keysound.play();
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
    	keysound.play();
        d = "DOWN";
    }
  }
  
  function draw(){
      if (snake_type==1) {
        leftBound=0;
        rightBound=468;
        upperBound=0;
        lowerBound=468;
      }else{
        leftBound=-12;
        rightBound=456;
        upperBound=-12;
        lowerBound=456;
      }

    context.drawImage(groundimg,0,0);
    if (snake_type==1) {
      for (var i = 0;  i < snake.length; i++) {
      context.beginPath();
      context.arc(snake[i].x+(box/2),snake[i].y + (box/2),(box/2),0,2*Math.PI);
      context.fillStyle = ( i == 0 )? "green" : "pink";
      context.fill();

      context.strokeStyle = "red";
      context.stroke();
    }
  }else{for (var i = 0;  i < snake.length; i++) {
      context.beginPath();
      context.rect(snake[i].x+(box),snake[i].y + (box),box,box);
      context.fillStyle = ( i == 0 )? "green" : "pink";
      context.fill();

      context.strokeStyle = "red";
      context.stroke();
    }}
    
    context.drawImage(foodimg,food.x,food.y);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    
    if( d == "LEFT") {snakeX -= box;}
      if( d == "UP") {snakeY -= box;}
      if( d == "RIGHT"){snakeX += box;}
      if( d == "DOWN") {snakeY += box;}


    if (snake_type==1) {
      if(snakeX == food.x && snakeY == food.y){
          eat.play();
          score++;
          food = {
          x : Math.floor(Math.random()*box_in_feild) * box,
          y : Math.floor(Math.random()*box_in_feild) * box
        }
          // we don't remove the tail
      }else{
          // remove the tail
          snake.pop();
      }
    }else{     
      if(snakeX == food.x-box && snakeY == food.y-box){
          eat.play();
          score++;
          food = {
          x : Math.floor(Math.random()*box_in_feild) * box,
          y : Math.floor(Math.random()*box_in_feild) * box
        }
          // we don't remove the tail
      }else{
          // remove the tail
          snake.pop();
      }
    }

      let newHead = {
          x : snakeX,
          y : snakeY
      }
      
      var score_number= document.querySelector(".score_number").innerHTML="Score:  "+score;
      if(snakeX < leftBound || snakeX > rightBound || snakeY < upperBound || snakeY > lowerBound || collision(newHead,snake)){
          dead.play();
          score=0;
          game_over.style="height:480px";
          clearInterval(game);
      }
      snake.unshift(newHead);

      if(pause_btn == false){
        clearInterval(game);
      }
  }

  function resume(){
      pause_display.style="height:0;";
      pause_btn = true;
      game = setInterval(draw,(250-(50*speed)));
    }

  function play_again(){
    clearInterval(game);
    if(document.getElementById('slenght').value){
      snakeLenght=document.getElementById('slenght').value;
    }else{
      snakeLenght=1;
    }
    if (document.getElementById('speed').value) {
      speed=document.getElementById('speed').value;
    }else{
      speed=1;
    }
    option.style="display:none;";
    game_over.style="height:0";
    snake=[];
    d="LEFT";

    for(var l=0; l<snakeLenght;l++){
      snake[l]={
        x : (15+l)*box,
        y : 9*box
      };
    }
    game = setInterval(draw,(250-(50*speed)));
  }
  play_again();
  let sound_flag=1;
  function sound(){
    if (sound_flag==1) {
      document.getElementById('sound_img').src='img/sound_off.png';
    keysound.muted=true;
    dead.muted=true;
    eat.muted=true;
    sound_flag=0;
  }else{
    document.getElementById('sound_img').src='img/sound_on.png';
    keysound.muted=false;
    dead.muted=false;
    eat.muted=false;
    sound_flag=1;
  }
  }
