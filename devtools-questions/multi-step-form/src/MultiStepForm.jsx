import * as React from "react";

const steps = [
  {
    id: "personal",
    title: "Personal Details",
    fields: [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone" },
    ],
  },
  {
    id: "review",
    title: "Review & Submit",
    fields: [],
  },
];

export function MultiStepForm() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const currentStep = steps[stepIndex];

  const updateField = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
  };

  const next = () => setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  const back = () => setStepIndex((index) => Math.max(index - 1, 0));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-app">
      <header>
        <h1>Build a Multi Step Form</h1>
        <p>Collect data across multiple steps with navigation controls and a progress indicator.</p>
      </header>

      <section className="card">
        <Progress stepIndex={stepIndex} />
        <form onSubmit={handleSubmit}>
          <h2>{currentStep.title}</h2>
          <div className="grid">
            {currentStep.fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input
                  name={field.name}
                  value={data[field.name]}
                  onChange={updateField}
                  type={field.type ?? "text"}
                  required
                />
              </label>
            ))}
            {currentStep.id === "review" && (
              <div className="review">
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
          </div>
          <div className="actions">
            {stepIndex > 0 && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            {stepIndex < steps.length - 1 ? (
              <button type="button" onClick={next}>
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
        {submitted && <p className="success">Form submitted! Check the review data above.</p>}
      </section>
    </div>
  );
}

function Progress({ stepIndex }) {
  return (
    <ol className="progress" role="list">
      {steps.map((step, index) => (
        <li key={step.id} data-complete={index < stepIndex} data-current={index === stepIndex}>
          <span className="step-index">{index + 1}</span>
          <span>{step.title}</span>
        </li>
      ))}
    </ol>
  );
}
