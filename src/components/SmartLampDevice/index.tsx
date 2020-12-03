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

interface Log {
  id: string;
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
  logs,
}) => {
  const theme = useTheme() as Theme;
  const { id: placeId } = useParams() as { id: string };

  const [status, setStatus] = useState<boolean>(() => {
    if (logs.length === 0) return false;

    return logs[logs.length - 1].value.status;
  });

  const onStatusChange = useCallback(async () => {
    api.post<Log>(`/places/${placeId}/devices/${deviceId}/logs`, {
      value: {
        status: !status,
      },
    });

    setStatus(!status);
  }, [deviceId, placeId, status]);

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
              type="monotone"
              dataKey="value"
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#fill)"
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
