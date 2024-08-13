import { useCallback, useState } from "react";

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
  const [isFinish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0);
  const curQuestion = QUESTIONS[index];

  const finalText = () => {
    return `Quiz completed! You scored ${score} out of ${QUESTIONS.length}.`;
  };

  const handleClick = useCallback(
    (answer) => {
      if (curQuestion.answers == curQuestion.options.indexOf(answer)) {
        setScore((pre) => pre + 1);
      }
      const newIdx = index + 1;
      if (newIdx >= QUESTIONS.length) {
        setIsFinish(true);
      } else {
        setIndex(newIdx);
      }
    },
    [index, curQuestion]
  );


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
