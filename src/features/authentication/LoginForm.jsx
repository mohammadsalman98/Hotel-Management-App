import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';
import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");//try adminadmin@gmail.com
  const [password, setPassword] = useState("");// try adminadmin
  const { login, isLogingIN } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password }, {
      onSettled: () => {
        setPassword("");
        setEmail("");
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogingIN}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogingIN}

        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogingIN}
        >{!isLogingIN ? 'Login' : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
