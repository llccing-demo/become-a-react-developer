import { useMemo, useState } from "react";

function FeedbackPage() {
  // const [isAgree, setIsAgree] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    agreement: false,
  });

  const feedbackLen = useMemo(() => {
    return formData.feedback.length;
  }, [formData.feedback]);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;

    setFormData((preState) => ({
      ...preState,
      [name]: type === "checkout" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setIsSubmit(true);
    handleReset();
    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      feedback: "",
    });
  };

  return (
    <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-bold">name:</label>
          <input
            required
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="Write your name"
            className="border border-gray-200 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">email:</label>
          <input
            required
            value={formData.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Write your email address"
            className="border border-gray-200 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">feedback:</label>
          <textarea
            value={formData.feedback}
            name="feedback"
            onChange={handleChange}
            cols="40"
            rows="4"
            placeholder="Please provide your valuable feedback"
            className="border border-gray-200 p-2 rounded-md"
            type="textarea"
          ></textarea>
        </div>
        <div className="mt-4">
          Character Count: <span>{feedbackLen}</span>
        </div>
        <div className="mt-5">
          <label className="flex gap-2 font-bold " htmlFor="agree">
            <input
              id="agree"
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
            />
            <span>I agree to the terms and conditions</span>
          </label>
        </div>
        <div className="flex gap-1 mt-4">
          <button disabled={!formData.agreement} type="submit">
            Submit
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {isSubmit && (
          <div className="mt-4">
            <p>Form submit successfully!</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default FeedbackPage;
