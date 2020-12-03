import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
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
import useEvent from '../../hooks/events';

interface Log {
  id: string;
  device_id: string;
  value: {
    luminosity: number;
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

  const [logs, setLogs] = useState<Log[]>(initialLogs);

  useEvent('log', (log: Log) => {
    if (log.device_id !== deviceId) return;

    if (logs.length < 20) setLogs(state => state.concat([log]));
    else setLogs(state => state.splice(1, 20).concat([log]));
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
            {typeToIcon('1')}
            <Typography variant="h6">{name}</Typography>
          </Grid>
        }
        subheader={ip}
      />

      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={logs.map(log => ({
              value: log.value.luminosity,
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
                  stopOpacity={0.2}
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
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LightSensorDevice;
