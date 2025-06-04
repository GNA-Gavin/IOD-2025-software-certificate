import { useState } from "react";
import { useFormInput } from "./hooks/useFormInput";

export default function SubscribeForm() {
  const [status, setStatus] = useState("");

  // use our custom hook instead of useState directly
  const [nameInputProps, resetName] = useFormInput("Mary");
  const [emailInputProps, resetEmail] = useFormInput("mary@pop.com");
  function handleSubscribe() {
    resetName();
    resetEmail();
    setStatus("Thanks for subscribing!");
  }

  return (
    <div className="SubscribeForm componentBox">
      <label>
        First name: <input {...nameInputProps} />
      </label>
      <label>
        Email: <input {...emailInputProps} />
      </label>

      <button onClick={handleSubscribe}>Subscribe</button>
      <div>{status}</div>
    </div>
  );
}
// ++ Try adding another form input using the custom hook
// ++ Try creating another form component using the custom hook
