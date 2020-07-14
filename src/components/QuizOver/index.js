import React, { useEffect, useState } from 'react'


const QuizOver = React.forwardRef((props, ref) => {

    const {levelNames, maxQuestions, score, quizLevel, percent, loadLevelQuestions} = props
  
    const [asked, setAsked] = useState([]);
    //console.log(asked);

    useEffect (() => {
        setAsked(ref.current)
    }, [ref])

    const average = maxQuestions / 2
    const decision = score >= average ? (
        <>
        <div className="stepsBtnContainer">
           {
               quizLevel < levelNames.length ? 
               (
                <>  
                    <p className="successMsg">Bravo, passez au niveau suivant! </p>
                    <button 
                        className="btnResult success"
                        onClick={()=> loadLevelQuestions(quizLevel)}
                    >
                        Niveau suivant 
                    </button>
            
                </>
               ): 
               (
                <>
                    <p className="successMsg">Bien joué </p>
                    <button className="btnResult gameOver">Niveau suivant </button>
                </>
               )
           }
        </div>
        <div className="percentage">
            <div className="progressPercent">Réussite: {percent}%</div>
            <div className="progressPercent">Note :{score}/{maxQuestions}</div>
        </div>
        </>
    ): 
    (
      <>
        <div className="stepsBtnContainer">
            <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
            <div className="progressPercent">Réussite: {percent}%</div>
            <div className="progressPercent">Note :  {score}/{maxQuestions}</div>
        </div>
      </>
    )
    const questionAnswer =  score >= average ? 
    (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question} </td>
                    <td>{question.answer} </td>
                    <td><button className="btnInfo">Infos</button> </td>
                </tr>
            )
        })
    ):
    (
        <tr>
            <td colSpan="3">
                <p style={{textAlign: "center", color: "red"}}>
                    Pas de réponses
                </p>
            </td>
        </tr>
    )
   
    return (
        <>
            { decision }

            <hr />
            <b>Les réponses aux questions posées</b>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </>
    )
})


export default React.memo(QuizOver);
