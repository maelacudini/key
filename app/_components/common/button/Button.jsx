import { useFormStatus } from "react-dom";

export default function Button({ message }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="b-yellow"
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? "Loading..." : message}
    </button>
  );
}
//useFormStatus returns the status for a specific <form>, so it must be defined as a child of the <form> element.
//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
