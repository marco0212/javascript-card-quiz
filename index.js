const questions = [
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'number'", "NaN", "'object'", "'string'"],
    "code": "typeof NaN",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'number'", "NaN", "'object'", "'string'"],
    "code": "typeof null",
    "correctAnswer": 2
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["true", "false"],
    "code": "null === null",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'102'", "102", "'732'", "12"],
    "code": "7 + 3 + '2'",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'2-10'", "2", "NaN", "-2"],
    "code": "'2' - 7 + 3",
    "correctAnswer": 3
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["true", "false"],
    "code": "[] === []",
    "correctAnswer": 1
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["true", "false"],
    "code": "typeof([]) === typeof([])",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'hello'", "'bye'"],
    "code": "true ? 'hello' : 'bye'",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'hello'", "'bye'"],
    "code": "'' ? 'hello' : 'bye'",
    "correctAnswer": 1
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'hello'", "'bye'"],
    "code": "[] ? 'hello' : 'bye'",
    "correctAnswer": 0
  },
  {
    "question": "예제 코드의 결과값은 무엇입니까?",
    "choices": ["'hello'", "'bye'"],
    "code": "-0 ? 'hello' : 'bye'",
    "correctAnswer": 1
  },
  {
    "question": "예제 코드를 실행했을때 콘솔에 출력되는 값은 무엇입니까?",
    "choices": ["1", "2", "undefined", "ReferenceError"],
    "code": "var a = 1;\n\nfunction foo() {\n  console.log(a);\n  var a = 2;\n}\n\nfoo();",
    "correctAnswer": 2
  },
  {
    "question": "예제 코드를 실행했을때 콘솔에 출력되는 d의 값은 무엇입니까?",
    "choices": ["3", "'3'", "undefined", "'undefined'"],
    "code": "function foo(a, b) {\n  var c = a + b;\n  console.log(c);\n}\n\nvar d = typeof foo(1, 2);\nconsole.log(d);",
    "correctAnswer": 3
  },
  {
    "question": "예제 코드를 실행했을때 콘솔에 출력되는 값은 무엇입니까?",
    "choices": ["[1, 2]", "[1, 2, undefined]", "ReferenceError", "'object'"],
    "code": "function foo(a, b, c) {\n  return [a, b, c];\n}\n\nvar result = foo(1, 2);\nconsole.log(result);",
    "correctAnswer": 1
  },
  {
    "question": "예제 코드를 실행했을때 콘솔에 출력되는 값은 무엇입니까?",
    "choices": ["'number'", "'object'", "undefined", "'undefined'"],
    "code": "function foo(number) {\n  return\n  {\n    age: number\n  };\n}\n\nvar result = foo(21);\nconsole.log(typeof result);",
    "correctAnswer": 3
  },
  {
    "question": "예제 코드를 실행했을때 콘솔에 출력되는 값은 무엇입니까?",
    "choices": ["null", "undefined", "ReferenceError", "None of the above"],
    "code": "var report = {\n  date: new Date(),\n  content: 'secret report'\n};\n\nfunction shred(doc) {\n  doc = null;\n}\n\nshred(report);\nconsole.log(report);",
    "correctAnswer": 3
  },
];

function Renderer({ quiz }) {
  this.quiz = quiz;
  
  this.setup = () => {
    const $button = this.createElement('button');
    const handleStartButtonClick = () => {
      this.renderProblem(this.quiz.turnIndex);
    }

    this.setInnerText($button, 'Start Quiz');
    this.addEventListener($button, {
      eventName: 'click',
      handler: handleStartButtonClick
    });
    this.appendToApp($button);
  }

  this.renderProblem = (index) => {
    const { question, code, choices } = this.quiz.questions[index];
    const $question = this.createQuestion(question);
    const $code = this.createCode(code);
    const $choices = choices.map((choice, index) => {
      const $choice = this.createChoice(choice, index);
      const handleFieldsetClick = () => {
        this.quiz.setAnswer(index);
      };

      this.addEventListener($choice, {
        eventName: 'click',
        handler: handleFieldsetClick
      });
      return $choice;
    });
    const $submitButton = this.createSubmitButton(index);

    this.clear();
    this.appendToApp($question, $code, ...$choices, $submitButton);
  }

  this.renderResult = () => {
    const correctRatio = this.quiz.score / this.quiz.questions.length;
    const message = this.quiz.getMessage(correctRatio);
    const $heading = this.createElement('h3');
    const $paragraph = this.createElement('p');

    this.addClassName($heading, 'message');
    this.setInnerText($heading, message);

    this.addClassName($paragraph, 'score');
    this.setInnerText($paragraph, `You got ${correctRatio * 100}% of the questions correct.`);

    this.clear();
    this.appendToApp($heading, $paragraph);
  }
  this.createQuestion = (question) => {
    const $paragraph = this.createElement('p');

    this.addClassName($paragraph, 'question');
    this.setInnerText($paragraph, question);
    return $paragraph;
  }

  this.createCode = (code) => {
    const $code = this.createElement('code');

    this.setInnerText($code, code);
    return $code;
  }

  this.createChoice = (choice, index) => {
    const $fieldset = this.createElement('fieldset');
    const $input = this.createElement('input');
    const $label = this.createElement('label');

    $input.type = 'radio';
    $input.name = 'answer';
    $input.value = index;
    $input.id = `answer-${index}`;
    $label.htmlFor = `answer-${index}`;
    $label.innerText = choice;

    this.appendElement($fieldset, $input, $label);
    return $fieldset;
  }

  this.createSubmitButton = (index) => {
    const $button = this.createElement('button');
    const handleButtonClick = () => {
      const isSelected = !!this.selectElement('input[type="radio"]:checked');

      try {
        if (!isSelected) {
          throw new Error('You should select answer');
        }

        this.quiz.submit();

        if (index === this.quiz.questions.length - 1) {
          this.renderResult();
        } else {
          this.renderProblem(index + 1);
        }
      } catch (err) {
        alert(err.message);
      }
    };

    this.setInnerText($button, 'Submit');
    this.addEventListener($button, {
      eventName: 'click',
      handler: handleButtonClick
    });
    return $button;
  }

  this.selectElement = (selector) => {
    return document.querySelector(selector);
  }

  this.createElement = (tagName) => {
    return document.createElement(tagName);
  }

  this.addClassName = (target, className) => {
    target.classList.add(className);
  }

  this.setInnerText = (target, text) => {
    target.innerText = text;
  }

  this.appendElement = (target, ...element) => {
    target.append(...element);
  }

  this.appendToApp = (...element) => {
    const $app = this.selectElement('#app');
    this.appendElement($app, ...element);
  }

  this.addEventListener = (target, { eventName, handler }) => {
    target.addEventListener(eventName, handler);
  }

  this.clear = () => {
    this.selectElement('#app').innerHTML = '';
  }
}

function Quiz({ questions }) {
  this.questions = questions;
  this.messages = ['You should better!', 'Well done', 'What a genius!'];
  this.turnIndex = 0;
  this.score = 0;
  this.selectedAnswer = null;

  this.setAnswer = (value) => {
    this.selectedAnswer = value;
  }

  this.getMessage = (correctRatio) => {
    if (correctRatio < 0.3) {
      return this.messages[0];
    } else if (correctRatio < 0.6) {
      return this.messages[1];
    } else {
      return this.messages[2];
    }
  }

  this.submit = () => {
    const { correctAnswer } = this.questions[this.turnIndex];
    
    if (this.selectedAnswer === correctAnswer) {
      this.score++;
    }

    this.selectedAnswer = null;
    this.turnIndex++;
  }
}

const quiz = new Quiz({ questions });
const renderer = new Renderer({ quiz });

renderer.setup();