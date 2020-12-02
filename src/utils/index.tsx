import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Brightness7, DeviceUnknown, WbIncandescent } from '@material-ui/icons';

export function typeToIcon(
  type: string,
  size: 'inherit' | 'default' | 'small' | 'large' = 'default',
): JSX.Element {
  switch (type) {
    case '0':
      return (
        <Tooltip title="Lâmpada inteligente" placement="top">
          <WbIncandescent
            fontSize={size}
            spacing={3}
            style={{ marginRight: 8 }}
          />
        </Tooltip>
      );

    case '1':
      return (
        <Tooltip title="Sensor de luminosidade" placement="top">
          <Brightness7 fontSize={size} spacing={3} style={{ marginRight: 8 }} />
        </Tooltip>
      );

    default:
      return (
        <Tooltip title="Dispositivo desconhecido" placement="top">
          <DeviceUnknown
            fontSize={size}
            spacing={3}
            style={{ marginRight: 8 }}
          />
        </Tooltip>
      );
  }
}
