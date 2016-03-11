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
			reStartButton,
			hintButton,
			nextQButton;

/*---------------------------------------------------------------------------------
   Declaring variables with Jquery values to fetch html elements
---------------------------------------------------------------------------------*/
			/*Page section values*/
			gameSection = $('#quizApp');
			resultSection = $('#score-page');
			welcomePage = $('#init-page');

			/*Init Page Elements*/
			bubbles = $('#bubbles');

			/*Display areas values for Questions, Answers & Hints*/
			answersArea = $('#answers-area'); //div id='answers-area' wrapping all the spans; line 44 index.html
			
				question = $('#question-area');
				option1 = $('#option1');
				option2 = $('#option2');
				option3 = $('#option3');
				option4 = $('#option4');
				option5 = $('#option5');

				hintContent = $('#hint-content');

			/*Buttons values*/
			startButton = $('#start-button');
			reStartButton = $('#restart');
			hintButton =$('#hint');
			nextQButton = $('#nextQuestion');
			
			// icons = bubbles.find('.img-logo');

			/*---------------------------------------------------------------------------------
    			END of Declaring variables 
			---------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------
    Initial Page 
---------------------------------------------------------------------------------*/

$(document).ready(pageLoad);

function pageLoad(){

	/*What to show and what to hide*/

		//Animation and Effects of Elements
		startEffects();

		//Hide Other Sections of the App
		gameSection.hide();
		resultSection.hide();
		
	// New Game Load With Page
		newGame();

	

};





	/*------Start Button Effects------*/

function startEffects(){

	startButton.mouseenter(function(){
		startButton.addClass('game-start');
		startButton.removeClass('title');
		startButton.text('Start Game!');
	})
	startButton.mouseleave(function(){
		startButton.addClass('title');
		startButton.removeClass('game-start');
		startButton.text('Spices of the World');
	})
};

	/*------Start Game Function------*/

function newGame(){

	startButton.click(function(){
		/*change Pages*/
		welcomePage.hide();
		gameSection.show();

		/*Hiding hint*/
		hintContent.hide();

		/*Initial values of questions and score*/

		currentQuestion = 0;

		/*Display of Question Groups*/
		generateQuestionGroup(currentQuestion);

		/*Re Start Game Button*/
		reStart()
		/*Next Question button*/
		nextAnswer();
		/*hint content show/hide function*/
		hintDisplay();
	});
};

/*---------------------------------------------------------------------------------
    Question Object (Data Base)
---------------------------------------------------------------------------------*/

function Question(question, arrayOptions,CorrectIndex, hint){
	this.question = question;
	this.option = arrayOptions;
	this.correctAnswer = arrayOptions[CorrectIndex];
	this.hint = hint;
};

	/*Objects of 'Question'*/

	questionGroup = new Array();
	questionGroup[0] = new Question(
		//question
		"Which spice is known for it’s versatility usage in savory and sweet foods?",
		//arrayOptions
		['Cinnamon','Paprika','Rosemery','Vanilla','Wasabi'], 
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
		'It’s popularity in the US began in the 1940s.  US servicemen returning from Italy after World War II developed a fondness of the herb used to flavor pizza.'
		);
	questionGroup[3] = new Question(
		'It is one of the finest flavoring bases used exclusively in sweet cookery, it is added to cakes, biscuits, desserts, and puddings:',
		['Clove','Vanilla', 'Basil', 'Garlic', 'Nutmeg'],
		1,
		'This highly prized bean (only after saffron), is native to the tropical rain forests of Central America. Ancient Mayans believed that adding it to drinks would give aphrodisiac effects.'
		);
	questionGroup[4] = new Question(
		'Cooking food with this spice dramatically decreases the condiments "pungency". It is a rich source of oil and protein.',
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

			/*Hint display Function*/


	function hintDisplay(){
		hintButton.click(function(){
			hintContent.toggle('slow');
		});
	};

	// function hintDisplay(){
	// 	hintButton.mouseenter(function(){
	// 		hintContent.show();
	// 	});
	// 	hintButton.mouseleave(function(){
	// 		hintContent.hide();
	// 	});
	// };

	console.log('smile!');

	/*nextQuestion button Function*/

	// function nextAnswer(){
	// 	nextQButton.on('click', function(){
	// 		if(currentQuestion < questionGroup.length -1){
	// 			currentQuestion++;
	// 		}
	// 		generateQuestionGroup(currentQuestion);
	// 	})
	// };


	function nextAnswer(){
		nextQButton.click(function(){
			if(currentQuestion < questionGroup.length -1) {
				currentQuestion++;
			}
		generateQuestionGroup(currentQuestion);
		});
	};

	/*Function to iterate over the question objects when clicking on the submit button*/

	function reStart(){
		reStartButton.click(function(){
			currentQuestion = 0;
			generateQuestionGroup(currentQuestion);
		});

	};