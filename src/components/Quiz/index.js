import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuestionQuiz } from '../QuestionQuiz';
import QuizOver from '../QuizOver';

// toast.configure();

 class Quiz extends Component {

    constructor(props) {
        super(props)
        this.initialState = {
            levelNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestion: [],
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score: 0,
            showWelcomeMsg: false,
            quizEnd: false,
            
        }
        this.storeDataRef = React.createRef()
        this.state = this.initialState;
    }
    

    

  

    loadQuestions = level => {
        //console.log(level)
       const fetchQuiz =  QuestionQuiz[0].quizz[level];

       //On vérifie si le nombre de question est supérieure ou égal à 10
       if(fetchQuiz.length >= this.state.maxQuestions) {

           this.storeDataRef.current = fetchQuiz
   
           const newArray =  fetchQuiz.map(({answer, ...keepRest}) => keepRest);

           this.setState({
               storedQuestion : newArray
           })
       }
    }
    showToastMsg = pseudo => {

        if(!this.state.showWelcomeMsg) {
            
            this.setState({ showWelcomeMsg: true })
            toast.info(`Bienvenue  😁`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
      
    }
    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.storedQuestion !== prevState.storedQuestion) {
            this.setState({
                question: this.state.storedQuestion[this.state.idQuestion].question,
                options: this.state.storedQuestion[this.state.idQuestion].options
            })
        }
        if(this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestion[this.state.idQuestion].question,
                options: this.state.storedQuestion[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
        if(this.props.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }
    }
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }
    //récupérer le pourcentage d'évolution des questions
    getPercentage = (maxQuest, ourscore) => (ourscore / maxQuest) * 100;

    gameOver = () => {
        const greatPercent = this.getPercentage(this.state.maxQuestions, this.state.score) 

        if(greatPercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: greatPercent,
                quizEnd: true
            })
        }
        else {
            this.setState({
                percent: greatPercent,
                quizEnd: true
            })
        }
        this.setState({ quizEnd: true })
    }
    nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver();
        }else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }
        //Incrémenter score
       const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;
       if(this.state.userAnswer === goodAnswer) {
           this.setState( prevState => ({ score: prevState.score + 1 }))

           toast.success('Bonne réponse + 1', {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false,
               bodyClassName: "toastify-color"
           });
       }else {
           toast.error('Mauvaise réponse', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false, 
                bodyClassName: "toastify-color"
           })
       }
    }

    loadLevelQuestions = param => {
        this.setState({...this.initialState, quizLevel: param})
        this.loadQuestions(this.state.levelNames[param])
    } 
    render() {
      const displayOptions= this.state.options.map((option, index) => {
            return (
                <p key={index} 
                    className={`answerOptions ${this.state.userAnswer === option ? "selected"  : null}`}
                    onClick={() => this.submitAnswer(option)}
                > 
                 {option}
                </p>
            )
        })
        return this.state.quizEnd ? (
            <QuizOver 
                ref={this.storeDataRef}
                levelNames={this.state.levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
                />
        )
        :
        (
            <>
                <ToastContainer />
                <Levels />
                <ProgressBar 
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                { displayOptions }
                <button 
                    disabled={this.state.btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                    >
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}   
                </button>
              
            </>
        )
      //  const { pseudo} = this.props.userData
        
    }
    }
   

export default Quiz; 
