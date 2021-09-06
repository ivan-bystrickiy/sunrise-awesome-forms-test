import { Button } from "../button/Button";
import { QuestionItem } from "./question-item";

function Questions({
  questions,
  onChangeQuestion,
  onAddQuestion,
  onDeleteQuestion,
  errors,
}) {
  return (
    <div>
      {questions.map((questionData, idx) => (
        <QuestionItem
          key={questionData.id}
          idx={idx + 1}
          data={questionData}
          onDelete={() => onDeleteQuestion(idx)}
          onChange={(newQuestionData) => onChangeQuestion(idx, newQuestionData)}
          errors={errors[questionData.id] || {}}
        />
      ))}

      <Button
        type="button"
        label="Add a Question"
        size="lg"
        className="mb-4 mt-3"
        onClick={onAddQuestion}
      />
    </div>
  );
}

export { Questions };
