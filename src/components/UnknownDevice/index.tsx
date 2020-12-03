import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

import { typeToIcon } from '../../utils';

interface UnknownDeviceProps {
  name: string;
  ip: string;
}

const UnknownDevice: React.FC<UnknownDeviceProps> = ({ name, ip }) => {
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
            {typeToIcon('-1')}
            <Typography variant="h6">{name}</Typography>
          </Grid>
        }
        subheader={ip}
      />

      <CardContent>
        <Typography variant="h5">Sem dados</Typography>
      </CardContent>
    </Card>
  );
};

export default UnknownDevice;
