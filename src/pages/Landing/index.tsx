import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Theme } from '@material-ui/core';

import { useTheme } from '@material-ui/styles';
import {
  Background,
  Content,
  Description,
  RegisterButton,
  Title,
} from './styles';

const Landing: React.FC = () => {
  const theme = useTheme() as Theme;
  const history = useHistory();

  const onRegisterButtonClick = useCallback(() => {
    history.push('/signup');
  }, [history]);

  return (
    <Background>
      <Container>
        <Content>
          <Title
            variant="h2"
            align="center"
            subscriptColor={theme.palette.primary.main}
          >
            Sua casa na palma da sua mão
          </Title>

          <Description variant="h6" align="center">
            O controle total sobre o seu lar está a apenas um clique de
            distância
          </Description>

          <RegisterButton
            variant="contained"
            color="primary"
            onClick={onRegisterButtonClick}
            size="large"
          >
            Registre-se
          </RegisterButton>
        </Content>
      </Container>
    </Background>
  );
};

export default Landing;
