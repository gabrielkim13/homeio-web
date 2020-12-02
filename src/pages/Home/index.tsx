import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  WbIncandescent,
  Brightness7,
  DeviceUnknown,
  Add,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

import api from '../../services/api';

interface Place {
  id: string;
  name: string;
  hub_ip: string;
  devices: {
    id: string;
    name: string;
    type: string;
  }[];
}

const Home: React.FC = () => {
  const theme = useTheme() as Theme;
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const history = useHistory();

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      const response = await api.get<Place[]>('/places');

      setPlaces(response.data);
    }

    fetchPlaces();
  }, []);

  const onAddButtonClick = useCallback(() => history.push('/places'), [
    history,
  ]);

  const onViewButtonClick = useCallback(
    (id: string) => history.push(`/places/${id}`),
    [history],
  );

  function typeToIcon(type: string) {
    switch (type) {
      case '0':
        return (
          <WbIncandescent
            fontSize="large"
            spacing={3}
            style={{ marginRight: 8 }}
          />
        );

      case '1':
        return (
          <Brightness7
            fontSize="large"
            spacing={3}
            style={{ marginRight: 8 }}
          />
        );

      default:
        return (
          <DeviceUnknown
            fontSize="large"
            spacing={3}
            style={{ marginRight: 8 }}
          />
        );
    }
  }

  return (
    <Container>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        style={{ padding: '16px 0' }}
      >
        <Grid item>
          <Typography variant="h4" component="h1">
            Meus Locais
          </Typography>
        </Grid>

        <Grid item>
          {matches ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              style={{ borderRadius: '50vh' }}
              onClick={onAddButtonClick}
            >
              Adicionar
            </Button>
          ) : (
            <IconButton color="secondary" onClick={onAddButtonClick}>
              <Add />
            </IconButton>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {places.map(({ id, name, hub_ip, devices }) => (
          <Grid item xs={12} sm={6} key={id}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CardHeader title={name} subheader={hub_ip} />

              <CardContent>
                {devices.map(device => typeToIcon(device.type))}
              </CardContent>

              <CardActions style={{ marginTop: 'auto' }}>
                <Button color="secondary" onClick={() => onViewButtonClick(id)}>
                  Acessar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
