import React from 'react';
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

interface Log {
  id: string;
  value: {
    luminosity: number;
  };
  created_at: string;
}

interface LightSensorDeviceProps {
  name: string;
  ip: string;
  logs: Log[];
}

const LightSensorDevice: React.FC<LightSensorDeviceProps> = ({
  name,
  ip,
  logs,
}) => {
  const theme = useTheme() as Theme;

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
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LightSensorDevice;
