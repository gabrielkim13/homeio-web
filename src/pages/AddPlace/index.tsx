import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import { Place } from '@material-ui/icons';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import TextInput from '../../components/TextInput';
import MaskedInput from '../../components/MaskedInput';

import { Content } from './styles';

interface FormData {
  name: string;
  hub_ip: string;
}

const AddPlace: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const onFormSubmit = useCallback(
    async (data: FormData) => {
      setErrors({} as FormData);

      try {
        const schema = Yup.object().shape({
          name: Yup.string().trim().required('Nome inválido'),
          hub_ip: Yup.string()
            .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
              message: 'Endereço IP inválido',
              excludeEmptyString: true,
            })
            .test('ip', 'Endereço IP inválido', value => {
              if (!value || value.trim() === '') return true;

              return (
                value.split('.').find(i => parseInt(i, 10) > 255) === undefined
              );
            })
            .required('Endereço IP inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, hub_ip } = data;

        const stripLeadingZeros = hub_ip
          .split('.')
          .map(ipSubstring => parseInt(ipSubstring, 10))
          .join('.');

        console.log({ name, hub_ip: stripLeadingZeros });

        await api.post('/places', { name, hub_ip: stripLeadingZeros });

        history.push('/');
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
    [history],
  );

  return (
    <Container>
      <Content>
        <Avatar style={{ width: 64, height: 64 }}>
          <Place fontSize="large" />
        </Avatar>

        <Typography variant="h6">Novo local</Typography>

        <Form ref={formRef} onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} />

            <Grid item xs={12} sm={6}>
              <TextInput
                id="name"
                label="Nome"
                required
                hasError={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MaskedInput
                id="hub_ip"
                label="Endereço IP (Hub)"
                mask="999.999.999.999"
                required
                hasError={!!errors.hub_ip}
                helperText={errors.hub_ip}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Content>
    </Container>
  );
};

export default AddPlace;
