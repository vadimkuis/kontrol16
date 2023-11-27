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

            if (testId) {
                this.getQuiz(testId);
                this.getCorrectAnswers(testId);
            }
            this.showQuiz();
            this.checkQuiz();
        },
        getQuiz(testId) {
            const url = `https://testologia.site/get-quiz?id=${testId}`;
            const response = this.doRequest(url)
            try {
                this.quiz = JSON.parse(response) || null;
            } catch (error) {
                console.error(error);
            }
        },
        getCorrectAnswers(testId) {
            const url = `https://testologia.site/get-quiz-right?id=${testId}`;
            const response = this.doRequest(url)
            try {
                this.correctAnswers = JSON.parse(response) || null;
            } catch (error) {
                console.error(error);
            }
        },
        doRequest(url, method = 'GET') {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, false);
            xhr.send();
            if (xhr.status === 200 && xhr.responseText) {
                return xhr.responseText;
            }
        },
        showQuiz() {
            document.getElementById('pre-title').innerText = this.quiz.name;
            this.optionsElement = document.getElementById('answers');

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
        },
        checkQuiz(inputId) {
            this.quiz.questions.forEach(question => {
                question.answers.forEach(answer => {

                    if (this.userResults === inputId) {
                        inputElement.setAttribute('style', 'border: 6px solid #dc3333');
                        labelElement.setAttribute('style', 'color: #dc3333');
                    }
                    if (this.userResults === inputId && this.correctAnswers === inputId) {
                        inputElement.setAttribute('style', 'border: 6px solid #5fdc33');
                        labelElement.setAttribute('style', 'color: #5fdc33');
                    }
                });
            });
        },
    }
    Answers.init();
})();