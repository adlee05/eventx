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
import type { AuthCardProps } from "@/types/auth-card.tsx";
import { Link } from "react-router-dom";

function AuthCard(props: AuthCardProps) {

  const goTo: "signup" | "login" = props.type == "Login" ? "signup" : "login";

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
          <Button asChild>
            <Link to={`/${goTo}`}>{goTo.charAt(0).toUpperCase() + goTo.slice(1)}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={props.onSubmit} className="flex flex-col gap-[30px]">
          {props.fields.map((elem) => (
            <div key={elem} className="flex flex-col gap-[10px]">
              <Label htmlFor="{elem}">{elem.charAt(0).toUpperCase() + elem.slice(1)}</Label>
              <Input
                name={elem}
                value={props.value[elem]}
                type={elem == "username" ? "text" : elem}
                placeholder={elem == "email" ? "adlee05@gmail.com" : (elem == "username" ? "adlee05" : "")}
                required
                onChange={props.onChangeElem}
              />
            </div>
          ))}
          <Button className="w-full cursor-pointer" type="submit">{props.type}</Button>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  </>);
}

export default AuthCard;
