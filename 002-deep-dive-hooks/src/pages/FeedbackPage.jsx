import { useEffect, useMemo, useRef, useState } from "react"

function FeedbackPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const feedbackLen = useMemo(() => {
    return feedback.length
  }, [feedback])

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    setIsSubmit(true)
    handleReset();
    setTimeout(() => {
      setIsSubmit(false)
    }, 2000);
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setFeedback('')
  }

  return (
    <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-bold">name:</label>
          <input required value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Write your name" className="border border-gray-200 p-2 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">email:</label>
          <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Write your email address" className="border border-gray-200 p-2 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">feedback:</label>
          <textarea value={feedback} onChange={(e) => { setFeedback(e.target.value) }} cols="40" rows="4" placeholder="Please provide your valuable feedback" className="border border-gray-200 p-2 rounded-md" type="textarea" ></textarea>
        </div>
        <div className="mt-4">
          Character Count: <span>{feedbackLen}</span>
        </div>
        <div className="mt-5">
          <label className="flex gap-2 font-bold " htmlFor="agree">
            <input id="agree" type="checkbox" checked={isAgree} onChange={() => { setIsAgree(agree => !agree) }} />
            <span>I agree to the terms and conditions</span>
          </label>
        </div>
        <div className="flex gap-1 mt-4">
          <button disabled={!isAgree} type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>

        {isSubmit && (<div className="mt-4">
          <p>Form submit successfully!</p>
        </div>)}
      </form>
    </div>
  )
}

export default FeedbackPage
