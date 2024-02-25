import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
//  schema for form validation

export default function Signup() {
  const {
    register, // registers state with their respective parameters
    handleSubmit,
    setError, // set errors  if any are found
    formState: {
      errors /* this catches errors , is an object */,
      isSubmitting /* for loading */,
    },
  } = useForm({
    defaultValues: {}, //edit
    resolver: zodResolver(schema), // validation check
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // server delay prototype
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        // error recieved at root
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} type="text" placeholder="Email" />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
