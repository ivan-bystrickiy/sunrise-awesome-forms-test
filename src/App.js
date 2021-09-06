import { useState } from "react";
import { Button } from "./components/button/Button";
import { Input } from "./components/input/Input";
import { Questions } from "./components/questions/questions";
import { Select } from "./components/select/Select";

function App() {
  /**
   * State
   */

  // Common form data
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    country: "",
    state: "",
    city: "",
  });

  // Questions data
  const [questions, setQuestions] = useState([
    /**
     * {
     *   id: "0.1231313",
     *   question: '',
     *   answerType: '', // radio, checkbox, custom
     *   requireAnswer: false,
     *   answers: []
     * }
     */
  ]);

  // Errors
  const [errors, setErrors] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  /**
   * Methods
   */

  const changeField = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const changeQuestion = (idx, newData) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions.slice(0, idx),
      {
        ...prevQuestions[idx],
        ...newData,
      },
      ...prevQuestions.slice(idx + 1),
    ]);
  };

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: Math.random().toString(),
        question: "",
        answerType: "",
        requireAnswer: false,
        answers: [],
      },
    ]);
  };

  const deleteQuestion = (idx) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions.slice(0, idx),
      ...prevQuestions.slice(idx + 1),
    ]);
  };

  // Я понимаю что это не лучшее и громоздкое решение, но пока что своими силами делаю так. Только для тетового.))
  const validateData = () => {
    const newErrors = {};

    const { title, category, country, city } = formData;

    if (!title.trim()) newErrors.title = "Enter title";
    if (!category.trim()) newErrors.category = "Select category";
    if (!country.trim()) newErrors.country = "Select country";
    if (!city.trim()) newErrors.city = "Enter city";
    if (questions.length === 0) newErrors.questionsError = "Add questions";

    const questionsErrors = (newErrors.questions = {});

    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];
      const { id, question, answerType, answers } = questionData;
      const questionErrors = (questionsErrors[id] = {});

      if (!question.trim()) questionErrors.question = "Enter question";
      if (!answerType.trim()) questionErrors.answerType = "Select answer type";

      if (answerType !== "custom" && answers.length === 0)
        questionErrors.answersError = "Add answers";

      const answersErrors = (questionErrors.answers = {});

      if (answerType !== "custom") {
        for (let a = 0; a < answers.length; a++) {
          const answer = answers[a];

          if (!answer.value.trim()) answersErrors[answer.id] = "Enter answer";
        }
      }

      if (Object.keys(answersErrors).length === 0)
        delete questionErrors.answers;

      if (Object.keys(questionErrors).length === 0) delete questionsErrors[id];
    }

    if (Object.keys(questionsErrors).length === 0) delete newErrors.questions;

    setErrors(newErrors);
    console.log(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmitData = (e) => {
    e.preventDefault();

    if (validateData()) {
      setLoading(true);

      fetch({
        url: "https://domain.com/spa/sunrise/",
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          questions,
        }),
      })
        .then(
          () =>
            new Promise((resolve) => {
              setTimeout(resolve, 3000);
            })
        )
        .then(() => {
          setFormData({
            title: "",
            category: "",
            country: "",
            state: "",
            city: "",
          });

          setQuestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Render

  return (
    <div className="App">
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 className="display-4 mt-3">Awesome Forms</h1>
        <form className="mt-5 mb-4" onSubmit={onSubmitData}>
          {/* Common data */}

          <h3 className="h3 mb-3">Details</h3>

          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-3 col-form-label">
              Title<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => changeField("title", e.target.value)}
                className={errors.title ? "is-invalid" : ""}
              />
              {errors.title && (
                <div className="invalid-feedback d-block">{errors.title}</div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="category" className="col-sm-3 col-form-label">
              Category<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <Select
                id="category"
                name="category"
                placeholder="Select category"
                defaultValue={formData.category}
                onChange={(val) => changeField("category", val)}
                className={errors.category ? "is-invalid" : ""}
              >
                <Select.Option label="Gaming" value="gaming" />
                <Select.Option label="Films" value="films" />
                <Select.Option label="Finance" value="finance" />
              </Select>
              {errors.category && (
                <div className="invalid-feedback d-block">
                  {errors.category}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="country" className="col-sm-3 col-form-label">
              Country<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <Select
                id="country"
                name="country"
                placeholder="Select country"
                defaultValue={formData.country}
                onChange={(val) => changeField("country", val)}
                className={errors.country ? "is-invalid" : ""}
              >
                <Select.Option label="Russia" value="ru" />
                <Select.Option label="Kyrgyzstan" value="kg" />
                <Select.Option label="USA" value="us" />
              </Select>
              {errors.country && (
                <div className="invalid-feedback d-block">{errors.country}</div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="state" className="col-sm-3 col-form-label">
              State
            </label>
            <div className="col-sm-9">
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => changeField("state", e.target.value)}
                className={errors.state ? "is-invalid" : ""}
              />
              {errors.state && (
                <div className="invalid-feedback d-block">{errors.state}</div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-3 col-form-label">
              City<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => changeField("city", e.target.value)}
                className={errors.city ? "is-invalid" : ""}
              />
              {errors.city && (
                <div className="invalid-feedback d-block">{errors.city}</div>
              )}
            </div>
          </div>

          {/* Questions */}

          <h3 className="h3 mb-3">Questions</h3>

          {errors.questionsError && (
            <div className="invalid-feedback d-block">
              {errors.questionsError}
            </div>
          )}

          <Questions
            questions={questions}
            onChangeQuestion={changeQuestion}
            onAddQuestion={addNewQuestion}
            onDeleteQuestion={deleteQuestion}
            errors={errors.questions || {}}
          />

          {/* Subimt */}

          <br />
          <Button
            type="submit"
            label={loading ? "Loading..." : "Submit"}
            disabled={loading}
            color="secondary"
          />
        </form>
      </div>
    </div>
  );
}

export default App;
