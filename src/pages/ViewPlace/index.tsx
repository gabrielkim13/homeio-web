import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

import api from '../../services/api';
import { typeToIcon } from '../../utils';

interface Place {
  id: string;
  name: string;
  hub_ip: string;
  devices: {
    id: string;
    name: string;
    ip: string;
    type: string;
    logs: {
      id: string;
      value: Record<string, unknown>;
    }[];
  }[];
}

const ViewPlace: React.FC = () => {
  const theme = useTheme() as Theme;
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const history = useHistory();
  const { id: placeId } = useParams() as { id: string };

  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    async function fetchPlace() {
      const response = await api.get<Place>(`/places/${placeId}`);

      setPlace(response.data);
    }

    fetchPlace();
  }, [placeId]);

  const onAddButtonClick = useCallback(
    () => history.push(`/places/${placeId}/devices`),
    [history, placeId],
  );

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
            {!!place && place.name}
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
              Dispositivo
            </Button>
          ) : (
            <IconButton color="secondary" onClick={onAddButtonClick}>
              <Add />
            </IconButton>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {!!place &&
          place.devices.map(({ id, name, ip, type }) => (
            <Grid item xs={12} sm={6} key={id}>
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardHeader
                  title={
                    <Grid container alignItems="center">
                      {typeToIcon(type)}
                      <Typography variant="h6">{name}</Typography>
                    </Grid>
                  }
                  subheader={ip}
                />

                <CardContent>Oi</CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ViewPlace;
