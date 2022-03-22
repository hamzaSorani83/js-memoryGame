// ===============================VARIABELS===========================================
// user name
let yourName;

// duration
let duration = 1000;

// no clicking
let blockParent = document.querySelector( '.memory-game-blocks' );

// block list
let blockList = Array.from( blockParent.children );

//create array from 0 to ( blockList.length - 1 )
let orderRange = [ ...Array( blockList.length ).keys() ];

// wrong tries Element
let triesElement = document.querySelector( '.tries span' );

// wrong tries Counter
let tries = 0;

// time Element
let timeElement = document.querySelector( '.time span' );

// time Counter
let time = 0;

// points Element
let pointElement = document.querySelector( '.point span' );

// points Counter
let points = 0;

// after win will show this box
let postElement = document.querySelector( '#post' );

// after win will set points and time and name and tries in box
let final = document.querySelector( '#post div #final' );

// when click will rest the game
let againElement = document.querySelector( '#again' );

// to turn on startTime() only one time
let counter = 0;

// //result variables
// let nameResult = document.querySelector('.result #nameResult span' ) ;
// let timeResult = document.querySelector('.result #timeResult span' ) ;
// let triesResult = document.querySelector('.result #triesResult span' ) ;
// let pointsResult = document.querySelector( '.result #pointsResult span'  );

// ===============================END VARIABELS===========================================

// when click on start button
document.querySelector( "#control-buttons span" ).onclick = function () {
  // prompt
  yourName = prompt( 'What is your name' );

  // remove parent
  this.parentElement.remove();

  // check if null 
  yourName == null || yourName == "" ?
    // then set unknown
    document.querySelector( '#name span' ).textContent = "Unknown" :
    // else set user name
    document.querySelector( '#name span' ).textContent = yourName;

  // turn on music game
  document.getElementById( 'startGame' ).play();
  setInterval( function () {
    document.getElementById( 'startGame' ).play();
  },30000 )

  // show blocks for 1 second
  flipAllBlocks();


};


//===================================FUNCTIONS=============================================

//=================================FLIP ALL BLOCKS========================================= 
function flipAllBlocks() {

  for ( let i = 0; i < blockList.length; i++ ) {

    blockList[ i ].classList.add( "has-flipped" );

    }

  setTimeout( function () {
    for ( let i = 0; i < blockList.length; i++ ) {

      blockList[ i ].classList.remove( "has-flipped" );

    }

  },duration )

}
//================================END FLIP ALL BLOCKS==============================================



//=====================================SHUFFLE============================================

//  - suffle keys
function shuffle( array ) {

  let random;

  for ( i = 0; i < array.length; i++ ){

    random = Math.floor( Math.random() * blockList.length );

    // swap
    [ array[ i ],array[ random ] ] = [ array[ random ],array[ i ] ];

  }

  blockList.forEach( ( block,index ) => {

  block.style.order = orderRange[ index ];

} );

  return array;

}
//turn on
shuffle( orderRange );

  // set order value in css
// blockList.forEach( ( block,index ) => {

//   block.style.order = orderRange[ index ];

// } );

//=====================================END SHUFFLE============================================




//=====================================TIME FUNCTION============================================
blockList.forEach( block => {

  // onclick startTime()
  block.addEventListener( 'click',function () {

    // to turn on startTime() only one time
    counter++;

    if ( counter <= 1 ) {

      //turn on
      startTime();

    }

  } )

});
// variable to turn off startTime() after win
let timer;
// start time function
function startTime() {

    timer = setInterval( function () {

      time++;

      timeElement.innerHTML = time;

  },duration )

}
//=====================================END TIME FUNCTION============================================




//=====================================FLIP FUNCTION============================================
// onclick turn on flipBlock()
blockList.forEach( block => {

  block.addEventListener( 'click',function () {

    flipBlock( block );

  } )

});

// flip block
function flipBlock( block ) {

  block.classList.add( 'is-flipped' );
  // filted  blocks which have  'is-flipped' class
  let blocksFilted = blockList.filter( function ( el ) {

    return el.classList.contains( 'is-flipped' )

  } );

  // select only two blocks 
  if ( blocksFilted.length == 2 ) {

    // stop select any block else
    stopClicking();

    // to check if two similar blocks
    checkMatchedBlocks( blocksFilted[ 0 ],blocksFilted[ 1 ] );

  }

}

// add no clicking to parent for a 1 second, and remove it
function stopClicking() {
  blockParent.classList.add( 'no-clicking' );

  setTimeout( () => {

    blockParent.classList.remove( 'no-clicking' )

  },duration )

}

// check if similar
function checkMatchedBlocks( firstBlock,secondBlock ) {

  // if similar
  if ( firstBlock.dataset.technology === secondBlock.dataset.technology ) {
    // if similar then remove is-flipped and add has-flipped
    firstBlock.classList.remove( 'is-flipped' );
    secondBlock.classList.remove( 'is-flipped' );
    firstBlock.classList.add( 'has-flipped' );
    secondBlock.classList.add( 'has-flipped' );

    // turn on success music
    document.getElementById( 'success' ).play();

    // add 10 points
    points += 10;
    pointElement.innerHTML = points;

    //check if game is finished
    let endGame = blockList.filter( function ( element ) {

      // filtering blocks which have 'has-flipped' class
      return element.classList.contains( 'has-flipped' );

    } );
    // check if game is finished
    if ( endGame.length === blockList.length ) {

      // show box
      post.classList.remove( 'hidden' );
      // set points and time and tries in box
      final.innerHTML = `You won ${points} points in ${time} seconds and your wrong tries is  ${tries}`;
      // set name in box
      document.querySelector( '#post div p span' ).innerHTML = yourName;


      // stop time counter
      clearTimeout( timer );

    }

  // if not similar 
  } else {

    // wait 1 second and flip two blocks
    setTimeout( () => {

      // filp block to !
      firstBlock.classList.remove( 'is-flipped' );
      secondBlock.classList.remove( 'is-flipped' );

    },duration )

    tries++;

    triesElement.innerHTML = tries;

    // only if points > 0 do
    if ( points > 0 ) {

      points -= 2;

      pointElement.innerHTML = points;

    }

    // turn on fail music effect
    document.getElementById( 'fail' ).play();

  }

}



// rest game after win
againElement.addEventListener("click", resetGame);
function resetGame() {

  // hide box
  postElement.classList.add( "hidden" );

  for ( let i = 0; i < blockList.length; i++ ) {

    // flip box to !
    blockList[ i ].classList.remove( "has-flipped" );

  }

  // make time and points and tries = 0
  tries = 0;
  points = 0;
  time = 0;
  timeElement.innerHTML = time;
  pointElement.innerHTML = points;
  triesElement.innerHTML = tries;

  // show all blocks for one second
  flipAllBlocks();
  shuffle( orderRange )
}
