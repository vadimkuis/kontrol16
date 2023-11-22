(function () {
        const Answers = {
            optionsElement: null,
            questionTitleElement: null,
            currentQuestionIndex: 1,
            quiz: null,
            correctAnswers: null,
            userResults: null,
            init() {
                const url = new URL(location.href);
                const testId = url.searchParams.get('testId');
                this.userResults = url.searchParams.get('results').split(',').map((item) => +item);

                if (testId) {// тут вобще с разбора не понял как делать
                if (testId) {// 2 отдельных метода сделать
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        this.quiz = JSON.parse(xhr.responseText);
                    }
                }
                if (testId) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        this.right = JSON.parse(xhr.responseText);
                    }
                }
                this.showQuiz();
            },
            showQuiz() {
                document.getElementById('pre-title').innerText = this.quiz.name;
                this.optionsElement = document.getElementById('answers');

                const url = new URL(location.href);

                this.quiz.questions.forEach(question => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answers-question-options';

                    this.questionTitleElement = document.createElement('h2');
                    this.questionTitleElement.className = 'answers-question-title';

                    this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + question.question;
                    this.currentQuestionIndex++;
                    optionElement.appendChild(this.questionTitleElement);

                    question.answers.forEach(answer => {
                        const answerItem = document.createElement('div');
                        answerItem.className = 'answer-question-option';

                        const inputId = answer.id;

                        const inputElement = document.createElement('input');
                        inputElement.className = 'option-answer';
                        inputElement.setAttribute('id', inputId);
                        inputElement.setAttribute('type', 'radio');
                        inputElement.setAttribute('name', 'answer');
                        inputElement.setAttribute('value', answer.id);

                        const labelElement = document.createElement('label');
                        labelElement.setAttribute('for', inputId);
                        labelElement.innerText = answer.answer;

                        answerItem.appendChild(inputElement);
                        answerItem.appendChild(labelElement);
                        optionElement.appendChild(answerItem);
                    })

                    this.optionsElement.appendChild(optionElement);
                })

                console.log(this.correctAnswers);
                console.log(this.userResults);

                this.quiz.questions.forEach(question => {
                    question.answers.forEach(answer => {
                        document.getElementById(answer.id);
                        const isUserChoice = userResults.answer.id ? 'true' : 'false'; // тут ошибки
                        const isCorrectAnswer = correctAnswers.answer.id ? 'true' : 'false';
                        if (isUserChoice) {
                            element.classList.add(isCorrectAnswer ? 'correct' : 'wrong');
                        }
                    })
                })
            },
        }
        Answers.init();
    }
)
();