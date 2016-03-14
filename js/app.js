'use strict';
console.log("Spices of the World Quiz");

/*---------------------------------------------------------------------------------
    Inizializing Variables
---------------------------------------------------------------------------------*/
			var 
			/*Page sections*/
			gameSection,
			welcomePage,
			resultSection,
			/*Init-page variables*/
			startButton,
			bubbles,
			icons,
			/*Array of Data*/
			questionGroup,
			/*Questions-Answers-Hints*/
			question,
			option1,
			option2,
			option3,
			option4,
			option5,
			hintContent,
			answersArea,
			/*question index currently Displayed*/
			currentQuestion,
			/*Buttons of Quiz-Section*/
			buttonArea,
			reStartButton,
			hintButton,
			nextQButton,
			/*Processing information*/
/*Mehran ?*/userAnswer, //declared in line 84
			userAnswerArray,
			currentCorrectAnswer,
			/*Others*/
			feedbackArea,
			finalScore,
			score, //for percentage purposes
			complement,
			/*Result Page*/
			lastButton;


$(document).ready(function(){


			/*---------------------------------------------------------------------------------
			   DOM SELECTION
			   Declaring variables with Jquery values to fetch html elements
			---------------------------------------------------------------------------------*/
			/*Page section values*/
			gameSection = $('#quizApp');
			resultSection = $('#score-page');
			welcomePage = $('#init-page');

			/*Init Page Elements for Effect purposes*/
			bubbles = $('#bubbles');
			icons = bubbles.find('.img-logo');

			/*Display area values for: Questions, Answers & Hints*/
			answersArea = $('#answers-area'); //div id='answers-area' wrapping all the spans; line 44 index.html
			
				question = $('#question-area');
				option1 = $('#option1');
				option2 = $('#option2');
				option3 = $('#option3');
				option4 = $('#option4');
				option5 = $('#option5');

				hintContent = $('#hint-content');

			/*Buttons values*/
			buttonArea = $('#button-area'); //contains restart/hint/nextQbutton
			startButton = $('#start-button');
			reStartButton = $('#restart');
			hintButton =$('#hint');
			nextQButton = $('#nextQuestion');
			lastButton = $('#start2-button');
			

			/*Display of Score*/
			feedbackArea = $('.feedback-area');
			finalScore =$('#score-text');
			complement =$('#complement');

			/*Processing information*/

			userAnswer = $("input[type='radio']:checked").val(); 
			userAnswerArray = []; //elements are pushed where 1 is correct and 0 is wrong answer eg. [0,1,1,1,0]

			/*---------------------------------------------------------------------------------
    			END of Declaring variables 
			---------------------------------------------------------------------------------*/


	/*What to show and what to hide when the page Loads*/

		//Animation and Effects of Elements
			startEffects();

		//Hide Other Sections of the App when page uploads
			gameSection.hide();
			resultSection.hide();

	// New Game Loads With Page
			startButton.click(function(){
				newGame();
			});


		/*------Start Game Function------*/

	function newGame(){

		/*Initial Count value of Global Variable*/

			currentQuestion = 0;
			userAnswerArray = [];
			feedbackArea.text('');

		// startButton.click(function(){
			/*change Pages*/
			welcomePage.hide();
			hintContent.hide();
			


		
			/*Display of First Question Group given the above variable*/
			generateQuestionGroup(currentQuestion);

			gameSection.show();

				/*Re Start Game Button*/
				reStartButton.click(reStart);
				/*hint Button content show/hide function*/
				
				
				hintButton.mouseenter(hintDisplay);
				hintButton.mouseleave(hintDisplay);
				// /*Hidden hint*/
				// hintDisplay();
				/*Next Question button*/
				nextAnswer();

				
		// });
	};

	/*---------------------------------------------------------------------------------
	    Question Object (DataBase)
	---------------------------------------------------------------------------------*/

	function Question(question, arrayOptions,CorrectIndex, hint){
		this.question = question;
		this.option = arrayOptions;
		this.correctAnswer = CorrectIndex;
		// this.correctAnswer = arrayOptions[CorrectIndex]; // Requires extra code to evaluate 
		this.hint = hint;
	};

	/*Objects of 'Question'*/

	questionGroup = new Array(); //Array of Objects
	questionGroup[0] = new Question(
		//question
		"Which spice is known for it’s versatility usage in savory and sweet foods?",
		//arrayOptions
		['Cinnamon','Paprika','Rosemary','Vanilla','Wasabi'], 
		//CorrectIndex
		0,
		//hint
		'In the famous Mexican dessert: “arroz con leche” or “rice pudding” is the main spice.'
		);
	questionGroup[1] = new Question(
		"India produces 90% of the global production of this spice, which is a known antioxidant, anti-inflammatory and anti-carcinogenic agent:",
		['Cardamom', 'Star Anise', 'Turmeric', 'Ginger', 'Pequin'],
		2,
		'It is yellow and it is an essential ingredient in curry powder.'
		);
	questionGroup[2] = new Question(
		'Which spice is well known for its strong flavoring and aromatic agent, mostly used in its dried form in Mediterranean and Mexican cuisines for preparation of pizzas, chicken, fish and meat dishes?',
		['Paprika', 'Black Pepper', 'Salt', 'Thyme', 'Oregano'],
		4,
		'It’s popularity in the US began in the 1940s.  US servicemen returning from Italy after World War II developed a fondness of the herb used to flavor pizza.'
		);
	questionGroup[3] = new Question(
		'It is one of the finest flavoring bases used exclusively in sweet cookery, it is added to cakes, biscuits, desserts, and puddings:',
		['Clove','Vanilla', 'Basil', 'Garlic', 'Nutmeg'],
		1,
		'This highly prized bean (only after saffron), is native to the tropical rain forests of Central America. Ancient Mayans believed that adding it to drinks would give aphrodisiac effects.'
		);
	questionGroup[4] = new Question(
		'Cooking food with this spice dramatically decreases the condiments "pungency". It is a rich source of oil and protein.',
		['Sage', 'Poppy Seeds', 'Dill', 'Mustard', 'Cumin'],
		3,
		'It is the second most-used spice in the U.S., following peppercorns.'
		);

	/*---------------------------------------------------------------------------------
	    Functions 
	---------------------------------------------------------------------------------*/

	/*Function to Render the Question[currentQuestion] values in the DOM*/


	function generateQuestionGroup(currentQuestion){
		question.text(questionGroup[currentQuestion].question);
		option1.text(questionGroup[currentQuestion].option[0]);
		option2.text(questionGroup[currentQuestion].option[1]);
		option3.text(questionGroup[currentQuestion].option[2]);
		option4.text(questionGroup[currentQuestion].option[3]);
		option5.text(questionGroup[currentQuestion].option[4]);

		hintContent.text(questionGroup[currentQuestion].hint);
	};

		/*Function to Restart the Game with Restart button*/

	function reStart(){
			gameSection.show();
			resultSection.hide('slow');	
			//Reseting Values 
			currentQuestion = 0;
			userAnswerArray = [];
			feedbackArea.text('');
			//Render the first object of the Array
			generateQuestionGroup(currentQuestion);

	};

			/*Hint display Button Function*/

	function hintDisplay(){
		hintContent.fadeToggle();

		// hintButton.mouseenter(function(){
		// 	hintContent.show();
		// });
		// hintButton.mouseleave(function(){
		// 	hintContent.hide();
		// });
	};


	/*Function to Sum all the userAnswers
	(elements) from the userAnswerArray*/
	 function addUpScore(questionGroup){
	 	return userAnswerArray.reduce(function(previousValue, currentValue, currentIndex, array){
	 		return previousValue + currentValue;
	 	});
	 }

	 /*Function to Evaluate user 
	 Answer Right or Wrong*/
	 function answerEvaluation(){
	 	if($("input[type='radio']:checked").val() == questionGroup[currentQuestion -1].correctAnswer){
	 		userAnswerArray.push(1); //this pushes userAnswer to the userAnswerArray
	 		feedbackArea.text("Your score is: " + addUpScore(questionGroup) + " correct out of " + questionGroup.length + ".");
	 	} else {
	 		userAnswerArray.push(0); //
	 		feedbackArea.text("Your score is: " + addUpScore(questionGroup) + " correct out of " + questionGroup.length + ".");
	 	}
	 };


	/*nextQuestion button Function to iterate the array
	of questions and render its content into the webpage*/

	function nextAnswer(){
		nextQButton.click(function(){
			if(currentQuestion < questionGroup.length -1) {
				currentQuestion++;
				answerEvaluation();
				generateQuestionGroup(currentQuestion);
			} else {
				endGame();
			}
			$('.answers-area>input').prop('checked', false);
		});
	};

	function endGame(){
				currentQuestion++;
				answerEvaluation();
				gameSection.hide();
				resultSection.show('slow');	

		/*------Click event for a new Game in Results Page------*/
				lastButton.click(function(){
					reStart();	
				});



				
			/*Switch statement to Render the 
			final Score and the Final feedback*/

		score = ((addUpScore(questionGroup) / questionGroup.length) * 100);
		
		switch(addUpScore(questionGroup)){
			case 0:
				finalScore.text("Your final Score is " + score + "%");
				complement.text("Cooking is a Human Thing, are you a human?!");
				break;
			case 1:
				finalScore.text("Your final Score is " + score + "%");
				complement.text("Cooking is part of Evolution, make it yours!");
				break;
			case 2:
				finalScore.text("Your final Score is " + score + "%");
				complement.text("Wow I see you cook a little, Way to GO!!");
				break;
			case 3:
				finalScore.text("Your final Score is "+ score + "%");
				complement.text("Mastering Culinary arts is possible, You can do it!!");
				break;
			case 4:
				finalScore.text("Your final Score is " + score + "%");
				complement.text("One day, you will be a Master Chef");
				break;
			case 5:
				finalScore.text("Your final Score is " + score + "%");
				complement.text("You are a Master Chef");
				break;
			default:
				break;
		};
	};


/*---------------------------------------------------------------------------------
	    Element Effects
	---------------------------------------------------------------------------------*/

		/*------Start Button Effects------*/


		function startEffects(){

		startButton.mouseenter(function(){
			startButton.addClass('game-start');
			startButton.removeClass('title');
			startButton.text('Start Game!');
			icons.effect('Puff');
		})
		startButton.mouseleave(function(){
			startButton.addClass('title');
			startButton.removeClass('game-start');
			startButton.text('Spices of the World');
			icons.effect('Puff');
		})
	};
});