import { Select } from "../select/Select";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";
import { AnswerItem } from "./answer-item";

function QuestionItem({ idx, data, onDelete, onChange, errors = {} }) {
  const [changes, setChanges] = useState({ answers: data.answers });
  const { answers = [] } = changes;

  /**
   * Methods
   */
  const saveChanges = () => {
    onChange(changes);
  };

  useEffect(saveChanges, [changes]);

  const changeField = (fieldName, value) => {
    if (fieldName === "type" && value === "custom") {
      setChanges((prevData) => ({
        ...prevData,
        [fieldName]: value,
        answers: [],
      }));
    } else {
      setChanges((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const changeAnswer = (idx, value) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      answers: [
        ...prevChanges.answers.slice(0, idx),
        { ...prevChanges.answers[idx], value },
        ...prevChanges.answers.slice(idx + 1),
      ],
    }));
  };

  const deleteAnswer = (idx) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      answers: [
        ...prevChanges.answers.slice(0, idx),
        ...prevChanges.answers.slice(idx + 1),
      ],
    }));
  };

  const addNewAnswer = () => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      answers: [
        ...prevChanges.answers,
        { id: Math.random().toString(), value: "" },
      ],
    }));
  };

  // Render

  const showAnswersFields =
    (changes.answerType === undefined
      ? data.answerType
      : changes.answerType) !== "custom";

  return (
    <div className="card mb-3">
      <h5 className="card-header">
        <div className="row align-items-center">
          <div className="col-sm-6">#{idx}</div>
          <div className="col-sm-6 text-end">
            <Button
              color="danger"
              label="Delete"
              size="sm"
              type="button"
              onClick={onDelete}
            />
          </div>
        </div>
      </h5>
      <div className="card-body" onChange={saveChanges}>
        <div className="mb-3 row">
          <label htmlFor="question" className="col-sm-3 col-form-label">
            Question<span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <Input
              type="text"
              id="question"
              name="question"
              multiline
              defaultValue={data.question}
              onChange={(e) => changeField("question", e.target.value)}
              className={errors.question ? "is-invalid" : ""}
            />
            {errors.question && (
              <div className="invalid-feedback d-block">{errors.question}</div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="type" className="col-sm-3 col-form-label">
            Answer Type<span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <Select
              id="answerType"
              name="answerType"
              placeholder="Select answer type"
              defaultValue={data.answerType}
              onChange={(newVal) => changeField("answerType", newVal)}
              className={errors.answerType ? "is-invalid" : ""}
            >
              <Select.Option label="Radio Buttons" value="radio" />
              <Select.Option label="Checkbox Buttons" value="checkbox" />
              <Select.Option label="Custom Input" value="custom" />
            </Select>
            {errors.answerType && (
              <div className="invalid-feedback d-block">
                {errors.answerType}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-9 offset-sm-3">
            <Checkbox
              label="Require answer"
              defaultChecked={data.requireAnswer}
              onChange={(e) => changeField("requireAnswer", e.target.checked)}
            />
          </div>
        </div>

        {errors.answersError && (
          <div className="invalid-feedback d-block">{errors.answersError}</div>
        )}

        {showAnswersFields && (
          <div>
            {answers.map((answer, idx) => (
              <AnswerItem
                key={answer.id}
                idx={idx + 1}
                value={answer.value}
                onChange={(newVal) => changeAnswer(idx, newVal)}
                onDelete={() => deleteAnswer(idx)}
                error={errors.answers[answer.id] || null}
              />
            ))}

            <Button
              type="button"
              size="sm"
              label="+ Add Another Answer"
              color="secondary"
              onClick={addNewAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export { QuestionItem };
