import { useState } from "react";

const QUESTIONS = [
  {
    question: "What is the best way to manage stress?",
    options: ["Exercise regularly", "Ignore it", "Procrastinate"],
    answers: 0,
  },
  {
    question: "How can you improve your communication skills?",
    options: ["Listen actively", "Talk over others", "Avoid conversations"],
    answers: 0,
  },
  {
    question: "What is essential for maintaining a healthy lifestyle?",
    options: ["Balanced diet", "Skipping meals", "Eating fast food daily"],
    answers: 0,
  },
];

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [curQuestion, setCurQuestion] = useState(QUESTIONS[index]);
  const [isFinish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0);

  const finalText = () => {
    return `Quiz completed! You scored ${score} out of ${QUESTIONS.length}.`;
  };

  const handleClick = (answer) => {
    console.log("click", answer);
    if (index === QUESTIONS.length - 1) {
      setIsFinish(true);
    }

    if (curQuestion.answers == curQuestion.options.indexOf(answer)) {
      setScore((pre) => pre + 1);
    }
    const newIdx = index + 1;
    setIndex(newIdx);
    setCurQuestion(QUESTIONS[newIdx]);
  };

  return (
    <>
      {isFinish ? (
        <div>{finalText()}</div>
      ) : (
        <div className="flex flex-col mt-5 max-w-3xl">
          <div className="font-bold text-3xl">{curQuestion.question}</div>

          <div className="flex flex-col gap-2 mt-5">
            {curQuestion.options &&
              curQuestion.options.map((item) => {
                return (
                  <button
                    className="bg-blue-400 p-4 rounded-lg hover:bg-blue-300"
                    onClick={() => {
                      handleClick(item);
                    }}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPage;
