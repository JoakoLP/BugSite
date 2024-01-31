"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { dbFunctions } from "@/app/utils/dbFunctions";

// interface IssueForm {
//   // interface que especifica los campos y sus tipos dentro del formulario
//   title: String;
//   description: String;
// }
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    // a useForm se le da la <interface> creada, devuelve la funcion 'register'
    resolver: zodResolver(createIssueSchema),
  });
  // console.log(register);
  // {name: 'title', onChange: ƒ, onBlur: ƒ, ref: ƒ} => Propiedades que se le asginan a los inputs para modificar las variables de 'title' en 'IssueForm'
  // console.log(register("title"));
  // {name: 'description', onChange: ƒ, onBlur: ƒ, ref: ƒ} => Propiedades que se le asginan a los inputs para modificar las variables de 'description' en 'IssueForm'
  // console.log(register("description"));

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      dbFunctions.postIssue(data);
      setError("");
      router.push("/issues");
      setSubmitting(false);
    } catch (error) {
      setError("An unexpected error ocurred.");
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} /> {/* Se hace Spread a 'register('title')' asignando las funciones 'onChange', 'onBlur' y 'ref' */}
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
