import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
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

import SmartLampDevice from '../../components/SmartLampDevice';
import LightSensorDevice from '../../components/LightSensorDevice';
import UnknownDevice from '../../components/UnknownDevice';

interface Log {
  id: string;
  value: any;
  created_at: string;
}

interface Device {
  id: string;
  name: string;
  ip: string;
  type: string;
  logs: Log[];
}

interface Place {
  id: string;
  name: string;
  hub_ip: string;
  devices: Device[];
}

const ViewPlace: React.FC = () => {
  const theme = useTheme() as Theme;
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const history = useHistory();
  const { id: placeId } = useParams() as { id: string };

  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    async function fetchPlaceDevicesLogs() {
      const response = await api.get<Place>(`/places/${placeId}`);

      const placeData = response.data;

      const promises = [];

      for (let i = 0; i < placeData.devices.length; i += 1) {
        const deviceId = placeData.devices[i].id;

        const promise = api
          .get<Log[]>(`/places/${placeId}/devices/${deviceId}/logs`)
          .then(responseLogs => {
            placeData.devices[i].logs = responseLogs.data;
          });

        promises.push(promise);
      }

      await Promise.all(promises);

      setPlace(placeData);
    }

    fetchPlaceDevicesLogs();
  }, [placeId]);

  const onAddButtonClick = useCallback(
    () => history.push(`/places/${placeId}/devices`),
    [history, placeId],
  );

  function renderDevice({ id, name, ip, type, logs }: Device) {
    switch (type) {
      case '0':
        return <SmartLampDevice id={id} name={name} ip={ip} logs={logs} />;

      case '1':
        return <LightSensorDevice name={name} ip={ip} logs={logs} />;

      default:
        return <UnknownDevice name={name} ip={ip} />;
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
          place.devices.map(device => (
            <Grid item xs={12} sm={6} key={device.id}>
              {renderDevice(device)}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ViewPlace;
