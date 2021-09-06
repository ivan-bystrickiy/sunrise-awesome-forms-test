import { Button } from "../button/Button";
import { Input } from "../input/Input";
import deleteIco from "./trash.svg";

function AnswerItem({ idx, value, onChange, onDelete, error }) {
  return (
    <div className="mb-3 row">
      <label htmlFor="question" className="col-sm-3 col-form-label">
        Answer <b># {idx}</b>
      </label>
      <div className="col-sm-9">
        <div className="input-group">
          <Input
            type="text"
            id="answer"
            name="answer"
            defaultValue={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "is-invalid" : ""}
          />

          <Button
            color="danger"
            type="button"
            label={<img src={deleteIco} alt="delete icon" width="24" />}
            onClick={onDelete}
          />
        </div>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
}

export { AnswerItem };
