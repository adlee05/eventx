type AuthCardProps = {
  title: string,
  description: string,
  fields: Field[],
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  onChangeElem: React.ChangeEventHandler<HTMLInputElement>,
  type: "Login" | "SignUp",
  value: CredType,
}

type CredType = {
  email: string,
  password: string,
  username?: string
}

type Field = keyof CredType;

export type {AuthCardProps, CredType, Field};
