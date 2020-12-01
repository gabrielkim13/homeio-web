import React from 'react';
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

          <RegisterButton variant="contained" color="primary">
            Registre-se
          </RegisterButton>
        </Content>
      </Container>
    </Background>
  );
};

export default Landing;
