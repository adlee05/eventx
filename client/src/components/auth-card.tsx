import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./ui/card.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Button } from "../components/ui/button.tsx";
import { useState } from "react";
import type { AuthCardProps, CredType } from "@/types/auth-card.tsx";

function AuthCard(props: AuthCardProps) {
  const [credentials, setCredentials] = useState<CredType>({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  };

  return (<>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {props.title}
        </CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
        <CardAction>
          <Button>{props.type == "Login" ? "Login" : "SignUp"}</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={props.onSubmit} className="flex flex-col gap-[30px]">
          {props.fields.map((elem) => (
            <div key={elem} className="flex flex-col gap-[10px]">
              <Label htmlFor="{elem}">{elem}</Label>
              <Input
                name={elem}
                value={credentials[elem]}
                type={elem}
                placeholder={elem == "email" ? "adlee05@gmail.com" : ""}
                required
                onChange={handleChange}
              />
            </div>
          ))}
          <Button className="w-full" type="submit">{props.type}</Button>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  </>);
}

export default AuthCard;
