import styled from 'styled-components';
import { Button, Typography, TypographyProps } from '@material-ui/core';

import backgroundImg from '../../assets/landing.jpeg';

interface TitleProps extends TypographyProps {
  subscriptColor?: string;
}

export const Background = styled.div`
  &::after {
    content: '';
    background: url(${backgroundImg}) no-repeat center;
    background-size: cover;
    opacity: 0.3;
    filter: blur(4px);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 93vh;
`;

export const Title = styled(Typography).withConfig({
  shouldForwardProp: prop => !['subscriptColor'].includes(prop),
})<TitleProps>`
  position: relative;

  margin-bottom: 64px;

  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 3px;
    background: ${props => props.subscriptColor || 'transparent'};
    bottom: -12px;
    left: 10%;
  }
`;

export const Description = styled(Typography)`
  margin-bottom: 32px;
`;

export const RegisterButton = styled(Button)`
  padding: 24px 64px;
`;
