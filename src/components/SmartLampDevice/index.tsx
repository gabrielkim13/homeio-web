import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Switch,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { typeToIcon } from '../../utils';
import api from '../../services/api';
import useEvent from '../../hooks/events';

interface Log {
  id: string;
  device_id: string;
  value: {
    status: boolean;
  };
  created_at: string;
}

interface LightSensorDeviceProps {
  id: string;
  name: string;
  ip: string;
  logs: Log[];
}

const LightSensorDevice: React.FC<LightSensorDeviceProps> = ({
  id: deviceId,
  name,
  ip,
  logs: initialLogs,
}) => {
  const theme = useTheme() as Theme;
  const { id: placeId } = useParams() as { id: string };

  const [status, setStatus] = useState<boolean>(() => {
    if (initialLogs.length === 0) return false;

    return initialLogs[initialLogs.length - 1].value.status;
  });

  const [logs, setLogs] = useState<Log[]>(initialLogs);

  const onStatusChange = useCallback(async () => {
    api.post<Log>(`/places/${placeId}/devices/${deviceId}/logs`, {
      value: {
        status: !status,
      },
    });

    setStatus(!status);
  }, [deviceId, placeId, status]);

  useEvent('log', (log: Log) => {
    if (log.device_id !== deviceId) return;

    setStatus(log.value.status);

    if (logs.length < 20) setLogs(logs.concat(log));
    else setLogs(logs.splice(1, 19).concat(log));
  });

  return (
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
            {typeToIcon('0')}
            <Typography variant="h6">{name}</Typography>
          </Grid>
        }
        subheader={ip}
      />

      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={logs.map(log => ({
              value: log.value.status ? 1 : 0,
              date: new Date(log.created_at).getTime(),
            }))}
            margin={{
              left: -28,
            }}
          >
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              domain={['dataMin', 'dataMax']}
              type="number"
              scale="time"
              hide
            />
            <YAxis />
            <Tooltip labelStyle={{ color: theme.palette.primary.main }} />
            <Area
              type="stepAfter"
              dataKey="value"
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#fill)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>

      <CardActions>
        <FormControlLabel
          label={status ? 'Aceso' : 'Apagado'}
          control={<Switch checked={status} onChange={onStatusChange} />}
          style={{ marginLeft: 0 }}
        />
      </CardActions>
    </Card>
  );
};

export default LightSensorDevice;
