	
	// Makes an initial challenge appear
	window.onload = function() {
		gettingReadyToPlay();
	}

	// Field declarations and initializations.
    var _wordsAllArray = new Array();
    var _counter = 61;
    var _t;
    var _isTimerOn = false;
    var _rightWords = [];
	var _wrongWords = [];
	var _rightKeystrokes = 0;
   	var _wrongKeystrokes = 0;

   	/*
   		Fills the Word Array with all words that are involved to the challenge.
   	*/
 	function fillWordArrayWithWords() {

		 _wordsAllArray = ["Business", "casual", "is", "an", "ambiguously" , "defined" ,
							"dress" , "code" , "that","has" , "been" , "adopted", "by",
							"many", "professional", "and", "white-collar","workplaces",
							"in", "Western", "countries." ,"It", "entails" ,"neat","yet", 
							"casual", "attire", "and", "is", "generally","more","casual",
							"than", "informal", "attire", "but","more", "formal", "than",
							"casual", "or", "smart","casual","attire.","Casual","Fridays", 
							"preceded","widespread","acceptance","of","business","casual",
							"attire", "in", "many","offices.","Web" ,"designers", "are",
							"expected", "to", "have", "an", "awareness","of", "usability",
							"and", "if", "their", "role", "involves", "creating", "mark", 
							"then", "they", "are", "also","expected","to", "be","up","to",
							"date", "with", "web", "accessibility", "guidelines." ," The",
							"different", "areas", "of", "web", "design", "include", "web",
							"Engineers,", "as","practitioners", "of","engineering,", "are",
							"people", "who", "invent,","design,","analyze,","build,","and",
							"test","machines,","systems," ,"structures","and","materials", 
							"to", "fulfill", "objectives", "and", "requirements", "while",
							"considering","the","limitations","imposed","by","practicality",
							"regulation,","safety,", "and", "cost.", " The", "work", "of",
							"engineers", "forms", "the", "link", "between", "scientific", 
							"discoveries", "and","their","subsequent","applications","to",
							 "human", "and", "business", "needs" ,"and", "quality", "of", "life." 
							];				
    }

	/*
		A simple countdown. If the countdown hits 0 seconds timer is stopped, 
		typing field disabled and score will be showing up.
	*/
    function countdown() {
		
		_counter--;
		_t = setTimeout("countdown()", 1000);
		getTimerTextfield().innerHTML = _counter;

		if(_counter == 0) {
			isTimerOn = false;
  			clearTimeout(_t);
  			getTypingTextfield().setAttribute("contentEditable", false); 
  			getTypingTextfield().innerHTML = ""
  			calculateScores();
		}
	}

	/*
		Starts the countdown if there is no timer running at the moment.
	*/
	function startCountdown() {
		if(!_isTimerOn) {
			_isTimerOn = true;
			countdown();
		}
	}

	/*
		Calculates the scores and displays it after the timer hits 0 seconds.
	*/
	function calculateScores() {

		var rightWords = _rightWords.length;
		var wrongWords = _wrongWords.length;
		var rightKeystrokes = _rightKeystrokes;
		var wrongKeystrokes = _wrongKeystrokes;
		var officialWPM = Math.floor(rightKeystrokes/5);

		// No CSS used
		getTimerTextfield().style.height="150px";
		getTimerTextfield().style.width="300px";

		getTimerTextfield().innerHTML = "<br />" + 
			"<b>" + "*** S C O R E ***" + "</b>" + "<br />"
			+ "<b>" + "WPM : " + "</b>" + officialWPM + " (" + (rightKeystrokes + wrongKeystrokes) + " keystrokes)" + "<br />"
			+ "<b>" + "Right words : " + "</b>" + rightWords + " (" + rightKeystrokes + " keystrokes)" + "<br />"
			+ "<b>" + "Wrong words : " + "</b>" + wrongWords + " (" + wrongKeystrokes + " keystrokes)" + "<br />"
	}

	/*
		Deletes viewable content of the Typing Textfield as well as the Problem Textfield.
	*/
	function cleanUpFrontend() {
		document.getElementById("typingTextfield").innerHTML = "";
		document.getElementById("problemTextfield").innerHTML = "";
	}

	/*
		Deletes unviewable content of the Typing Textfield as well as the Problem Textfield.
	*/
    function cleanUpBackend() {
    	_wordsAllArray = [];
    }

    /*
    	Shuffles an given Array.
    */
    function shuffle(array) {
	    
	    var j, x, i;
	    
	    for (i = array.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = array[i - 1];
	        array[i - 1] = array[j];
	        array[j] = x;
	    }
}
	/*
		Shuffles the Word Array and generating a string with words that can be displayed. 
	*/
    function generateProblem() {
    	
    	cleanUpBackend();
 		fillWordArrayWithWords();
 		fillWordArrayWithWords();
 		fillWordArrayWithWords();
 		shuffle(_wordsAllArray);
 	}

	/*
		Uses the array to display the problem.
 	*/
 	function displayProblem() {
 		
 		cleanUpFrontend();
 		getProblemTextfield().innerHTML = _wordsAllArray.join(" ");
 	}

	/*
		Returns the Typing Textfield.
 	*/
 	function getTypingTextfield() {
 		return document.getElementById("typingTextfield");
 	}

	/*
		Returns the Problem Textfield.
 	*/
 	function getProblemTextfield() {
 		return document.getElementById("problemTextfield");
 	}

	/*
		Returns the body of the HTML document.	
 	*/
 	function getBody() {
 		return document.getElementsByTagName("BODY")[0];
 	}

	/*
		Returns the Timer Textfield.
 	*/
 	function getTimerTextfield() {
 		return document.getElementById("timerTextfield");
 	}

	/*
		Returns the Refresh Button.
 	*/
 	function getRefreshWordsButton() {
 		return document.getElementById("refreshButton");
 	}

	// This happens if a keyboard key has been pressed.
	getTypingTextfield().addEventListener("keypress", function checkKeyPress(e) {
		
		if(getProblemTextfield().innerHTML !== "") {
			startCountdown();
			getTypingTextfield().placeholder= "";
		}

		var currentWordOfString = _wordsAllArray[_rightWords.length + _wrongWords.length];

		var SPACE = 32;

		if (e.keyCode == SPACE) {
			e.preventDefault();

			if(getTypingTextfield().innerHTML !== "") {
				if(getTypingTextfield().innerHTML === currentWordOfString) {
						_rightWords.push(currentWordOfString);
						_rightKeystrokes += currentWordOfString.length;
						
						_wordsAllArray[_rightWords.length + _wrongWords.length - 1] = '<span class="highlightRight">' + currentWordOfString + '</span>';
						displayProblem();
					} 
					else if(getTypingTextfield().innerHTML !== currentWordOfString) {
						_wrongWords.push(currentWordOfString);
						_wrongKeystrokes += currentWordOfString.length;
						
						_wordsAllArray[_rightWords.length + _wrongWords.length - 1] = '<span class="highlightWrong">' + currentWordOfString + '</span>';
						displayProblem();
					}
			}

			getTypingTextfield().innerHTML = "";
		}
		});

	/*
  		This is the method that is called everytime the Refresh button has been pressed.
  		It's mostly about cleaning up stuff that another challenge can be launched. 
  	*/
  	function gettingReadyToPlay() {
		
		getTypingTextfield().setAttribute("contentEditable", true); 
  		_counter = 61;
		_isTimerOn = false;
  		clearTimeout(_t);
  		getTimerTextfield().innerHTML = "";
  		getTypingTextfield().placeholder="Start typing to begin a challenge.";
  		
  		// No CSS used :/
  		getTimerTextfield().style.textAlign = "center";
  		getTypingTextfield().style.textAlign = "center";
  		getTimerTextfield().style.height = "30px";
  		getTimerTextfield().style.width = "45px";
  		
  		_rightWords = [];
  		_wrongWords = [];
  		_rightKeystrokes = 0;
  		_wrongKeystrokes = 0;

  		cleanUpFrontend();
  		generateProblem();
  		displayProblem();
  }
