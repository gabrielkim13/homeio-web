import React, { useCallback, useRef, useState } from 'react';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import CheckboxInput from '../../components/CheckboxInput';

import { Content } from './styles';

interface FormData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { signin } = useAuth();

  const onFormSubmit = useCallback(
    async (data: FormData) => {
      setErrors({} as FormData);

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail inválido'),
          password: Yup.string()
            .min(4, 'A senha deve ter entre 4 e 20 dígitos')
            .max(20, 'A senha deve ter entre 4 e 20 dígitos')
            .required('A senha deve ter entre 4 e 20 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        await signin({ email, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formErrors = err.inner.reduce<Partial<FormData>>(
            (accErrors, error) => {
              return Object.assign(accErrors, { [error.path]: error.message });
            },
            {},
          );

          setErrors(formErrors);
        }

        if (err.isAxiosError) {
          const apiErrors = err.response.data.errors as { message: string }[];

          alert(
            `API errors:
            ${apiErrors.map(error => `\r\n- ${error.message}`).join('')}`,
          );
        }
      }
    },
    [signin],
  );

  return (
    <Container>
      <Content>
        <Avatar style={{ width: 64, height: 64 }}>
          <Person fontSize="large" />
        </Avatar>

        <Typography variant="h6">Sign in</Typography>

        <Form ref={formRef} onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} />

            <Grid item xs={12} sm={6}>
              <TextInput
                id="email"
                label="E-mail"
                type="email"
                required
                hasError={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PasswordInput
                id="password"
                label="Senha"
                required
                hasError={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <CheckboxInput id="remember" label="Lembrar-me" />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Content>
    </Container>
  );
};

export default Signin;
