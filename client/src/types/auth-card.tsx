type AuthCardProps = {
  title: string,
  description: string,
  fields: Field[],
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  type: "Login" | "SignUp",
}

type CredType = {
  email: string,
  password: string,
  username?: string
}

type Field = keyof CredType;

export type {AuthCardProps, CredType, Field};
