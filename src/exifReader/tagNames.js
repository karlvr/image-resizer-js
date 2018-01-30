export default {
  '0th': {
    0x0100: 'ImageWidth',
    0x0101: 'ImageLength',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x010e: 'ImageDescription',
    0x010f: 'Make',
    0x0110: 'Model',
    0x0111: 'StripOffsets',
    0x0112: {
      name: 'Orientation',
      description: value => {
        switch (value) {
          case 1:
            return 'top-left';
          case 2:
            return 'top-right';
          case 3:
            return 'bottom-right';
          case 4:
            return 'bottom-left';
          case 5:
            return 'left-top';
          case 6:
            return 'right-top';
          case 7:
            return 'right-bottom';
          case 8:
            return 'left-bottom';
          default:
            return 'Undefined';
        }
      },
    },
    0x0115: 'SamplesPerPixel',
    0x0116: 'RowsPerStrip',
    0x0117: 'StripByteCounts',
    0x011a: 'XResolution',
    0x011b: 'YResolution',
    0x011c: 'PlanarConfiguration',
    0x0128: {
      name: 'ResolutionUnit',
      description: value => {
        switch (value) {
          case 2:
            return 'inches';
          case 3:
            return 'centimeters';
          default:
            return 'Unknown';
        }
      },
    },
    0x012d: 'TransferFunction',
    0x0131: 'Software',
    0x0132: 'DateTime',
    0x013b: 'Artist',
    0x013e: 'WhitePoint',
    0x013f: 'PrimaryChromaticities',
    0x0201: 'JPEGInterchangeFormat',
    0x0202: 'JPEGInterchangeFormatLength',
    0x0211: 'YCbCrCoefficients',
    0x0212: 'YCbCrSubSampling',
    0x0213: {
      name: 'YCbCrPositioning',
      description: value => {
        switch (value) {
          case 1:
            return 'centered';
          case 2:
            return 'co-sited';
          default:
            return `undefied ${value}`;
        }
      },
    },
    0x0214: 'ReferenceBlackWhite',
    0x8298: {
      name: 'Copyright',
      description: value => {
        return value.join('; ');
      },
    },
    0x8769: 'Exif IFD Pointer',
    0x8825: 'GPS Info IFD Pointer',
  },
  exif: {
    0x829a: 'ExposureTime',
    0x829d: 'FNumber',
    0x8822: {
      name: 'ExposureProgram',
      description: value => {
        switch (value) {
          case 0:
            return 'Undefined';
          case 1:
            return 'Manual';
          case 2:
            return 'Normal program';
          case 3:
            return 'Aperture priority';
          case 4:
            return 'Shutter priority';
          case 5:
            return 'Creative program';
          case 6:
            return 'Action program';
          case 7:
            return 'Portrait mode';
          case 8:
            return 'Landscape mode';
          default:
            return 'Unknown';
        }
      },
    },
    0x8824: 'SpectralSensitivity',
    0x8827: 'ISOSpeedRatings',
    0x8828: {
      name: 'OECF',
      description: () => {
        return '[Raw OECF table data]';
      },
    },
    0x9000: {
      name: 'ExifVersion',
      description: value => {
        let charCode;
        let string = '';
        let i;
        let len;

        // eslint-disable-next-line no-plusplus
        for (i = 0, len = value.length; i < len; i++) {
          charCode = value[i];
          string += String.fromCharCode(charCode);
        }
        return string;
      },
    },
    0x9003: 'DateTimeOriginal',
    0x9004: 'DateTimeDigitized',
    0x9101: {
      name: 'ComponentsConfiguration',
      description: value => {
        let character;
        let string;
        let i;
        let len;

        string = '';

        // eslint-disable-next-line no-plusplus
        for (i = 0, len = value.length; i < len; i++) {
          character = value[i];
          switch (character) {
            case 0x31:
              string += 'Y';
              break;
            case 0x32:
              string += 'Cb';
              break;
            case 0x33:
              string += 'Cr';
              break;
            case 0x34:
              string += 'R';
              break;
            case 0x35:
              string += 'G';
              break;
            case 0x36:
              string += 'B';
              break;
            default:
              string += '';
          }
        }
        return string;
      },
    },
    0x9102: 'CompressedBitsPerPixel',
    0x9201: 'ShutterSpeedValue',
    0x9202: 'ApertureValue',
    0x9203: 'BrightnessValue',
    0x9204: 'ExposureBiasValue',
    0x9205: 'MaxApertureValue',
    0x9206: 'SubjectDistance',
    0x9207: {
      name: 'MeteringMode',
      description: value => {
        switch (value) {
          case 1:
            return 'Average';
          case 2:
            return 'CenterWeightedAverage';
          case 3:
            return 'Spot';
          case 4:
            return 'MultiSpot';
          case 5:
            return 'Pattern';
          case 6:
            return 'Partial';
          case 255:
            return 'Other';
          default:
            return 'Unknown';
        }
      },
    },
    0x9208: {
      name: 'LightSource',
      description: value => {
        switch (value) {
          case 1:
            return 'Daylight';
          case 2:
            return 'Fluorescent';
          case 3:
            return 'Tungsten (incandescent light)';
          case 4:
            return 'Flash';
          case 9:
            return 'Fine weather';
          case 10:
            return 'Cloudy weather';
          case 11:
            return 'Shade';
          case 12:
            return 'Daylight fluorescent (D 5700 – 7100K)';
          case 13:
            return 'Day white fluorescent (N 4600 – 5400K)';
          case 14:
            return 'Cool white fluorescent (W 3900 – 4500K)';
          case 15:
            return 'White fluorescent (WW 3200 – 3700K)';
          case 17:
            return 'Standard light A';
          case 18:
            return 'Standard light B';
          case 19:
            return 'Standard light C';
          case 20:
            return 'D55';
          case 21:
            return 'D65';
          case 22:
            return 'D75';
          case 23:
            return 'D50';
          case 24:
            return 'ISO studio tungsten';
          case 255:
            return 'Other light source';
          default:
            return 'Unknown';
        }
      },
    },
    0x9209: {
      name: 'Flash',
      description: value => {
        switch (value) {
          case 0x00:
            return 'Flash did not fire';
          case 0x01:
            return 'Flash fired';
          case 0x05:
            return 'Strobe return light not detected';
          case 0x07:
            return 'Strobe return light detected';
          case 0x09:
            return 'Flash fired, compulsory flash mode';
          case 0x0d:
            return 'Flash fired, compulsory flash mode, return light not detected';
          case 0x0f:
            return 'Flash fired, compulsory flash mode, return light detected';
          case 0x10:
            return 'Flash did not fire, compulsory flash mode';
          case 0x18:
            return 'Flash did not fire, auto mode';
          case 0x19:
            return 'Flash fired, auto mode';
          case 0x1d:
            return 'Flash fired, auto mode, return light not detected';
          case 0x1f:
            return 'Flash fired, auto mode, return light detected';
          case 0x20:
            return 'No flash function';
          case 0x41:
            return 'Flash fired, red-eye reduction mode';
          case 0x45:
            return 'Flash fired, red-eye reduction mode, return light not detected';
          case 0x47:
            return 'Flash fired, red-eye reduction mode, return light detected';
          case 0x49:
            return 'Flash fired, compulsory flash mode, red-eye reduction mode';
          case 0x4d:
            return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected';
          case 0x4f:
            return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected';
          case 0x59:
            return 'Flash fired, auto mode, red-eye reduction mode';
          case 0x5d:
            return 'Flash fired, auto mode, return light not detected, red-eye reduction mode';
          case 0x5f:
            return 'Flash fired, auto mode, return light detected, red-eye reduction mode';
          default:
            return 'Unknown';
        }
      },
    },
    0x920a: 'FocalLength',
    0x9214: {
      name: 'SubjectArea',
      description: value => {
        switch (value.length) {
          case 2:
            return `Location; X: ${value[0]}, Y: ${value[1]}`;
          case 3:
            return `Circle; X: ${value[0]}, Y: ${value[1]}, diameter: ${
              value[2]
            }`;
          case 4:
            return `Rectangle; X: ${value[0]}, Y: ${value[1]}, width: ${
              value[2]
            }, height: ${value[3]}`;
          default:
            return 'Unknown';
        }
      },
    },
    0x927c: {
      name: 'MakerNote',
      description: () => {
        return '[Raw maker note data]';
      },
    },
    0x9286: {
      name: 'UserComment',
      description: value => {
        switch (value
          .slice(0, 8)
          .map(charCode => String.fromCharCode(charCode))
          .join('')) {
          case 'ASCII\x00\x00\x00':
            return value
              .slice(8, value.length)
              .map(charCode => String.fromCharCode(charCode))
              .join('');
          case 'JIS\x00\x00\x00\x00\x00':
            return '[JIS encoded text]';
          case 'UNICODE\x00':
            return '[Unicode encoded text]';
          case '\x00\x00\x00\x00\x00\x00\x00\x00':
            return '[Undefined encoding]';
          default:
            return '';
        }
      },
    },
    0x9290: 'SubSecTime',
    0x9291: 'SubSecTimeOriginal',
    0x9292: 'SubSecTimeDigitized',
    0xa000: {
      name: 'FlashpixVersion',
      description: value => {
        let charCode;
        let string;
        let i;
        let len;

        string = '';

        // eslint-disable-next-line no-plusplus
        for (i = 0, len = value.length; i < len; i++) {
          charCode = value[i];
          string += String.fromCharCode(charCode);
        }
        return string;
      },
    },
    0xa001: {
      name: 'ColorSpace',
      description: value => {
        switch (value) {
          case 1:
            return 'sRGB';
          case 0xffff:
            return 'Uncalibrated';
          default:
            return 'Unknown';
        }
      },
    },
    0xa002: 'PixelXDimension',
    0xa003: 'PixelYDimension',
    0xa004: 'RelatedSoundFile',
    0xa005: 'Interoperability IFD Pointer',
    0xa20b: 'FlashEnergy',
    0xa20c: {
      name: 'SpatialFrequencyResponse',
      description: () => {
        return '[Raw SFR table data]';
      },
    },
    0xa20e: 'FocalPlaneXResolution',
    0xa20f: 'FocalPlaneYResolution',
    0xa210: {
      name: 'FocalPlaneResolutionUnit',
      description: value => {
        switch (value) {
          case 2:
            return 'inches';
          case 3:
            return 'centimeters';
          default:
            return 'Unknown';
        }
      },
    },
    0xa214: {
      name: 'SubjectLocation',
      description: value => `X: ${value[0]}, Y: ${value[1]}`,
    },
    0xa215: 'ExposureIndex',
    0xa217: {
      name: 'SensingMethod',
      description: value => {
        switch (value) {
          case 1:
            return 'Undefined';
          case 2:
            return 'One-chip color area sensor';
          case 3:
            return 'Two-chip color area sensor';
          case 4:
            return 'Three-chip color area sensor';
          case 5:
            return 'Color sequential area sensor';
          case 7:
            return 'Trilinear sensor';
          case 8:
            return 'Color sequential linear sensor';
          default:
            return 'Unknown';
        }
      },
    },
    0xa300: {
      name: 'FileSource',
      description: value => {
        switch (value) {
          case 3:
            return 'DSC';
          default:
            return 'Unknown';
        }
      },
    },
    0xa301: {
      name: 'SceneType',
      description: value => {
        switch (value) {
          case 1:
            return 'A directly photographed image';
          default:
            return 'Unknown';
        }
      },
    },
    0xa302: {
      name: 'CFAPattern',
      description: () => {
        return '[Raw CFA pattern table data]';
      },
    },
    0xa401: {
      name: 'CustomRendered',
      description: value => {
        switch (value) {
          case 0:
            return 'Normal process';
          case 1:
            return 'Custom process';
          default:
            return 'Unknown';
        }
      },
    },
    0xa402: {
      name: 'ExposureMode',
      description: value => {
        switch (value) {
          case 0:
            return 'Auto exposure';
          case 1:
            return 'Manual exposure';
          case 2:
            return 'Auto bracket';
          default:
            return 'Unknown';
        }
      },
    },
    0xa403: {
      name: 'WhiteBalance',
      description: value => {
        switch (value) {
          case 0:
            return 'Auto white balance';
          case 1:
            return 'Manual white balance';
          default:
            return 'Unknown';
        }
      },
    },
    0xa404: {
      name: 'DigitalZoomRatio',
      description: value => {
        switch (value) {
          case 0:
            return 'Digital zoom was not used';
          default:
            return value;
        }
      },
    },
    0xa405: {
      name: 'FocalLengthIn35mmFilm',
      description: value => {
        switch (value) {
          case 0:
            return 'Unknown';
          default:
            return value;
        }
      },
    },
    0xa406: {
      name: 'SceneCaptureType',
      description: value => {
        switch (value) {
          case 0:
            return 'Standard';
          case 1:
            return 'Landscape';
          case 2:
            return 'Portrait';
          case 3:
            return 'Night scene';
          default:
            return 'Unknown';
        }
      },
    },
    0xa407: {
      name: 'GainControl',
      description: value => {
        switch (value) {
          case 0:
            return 'None';
          case 1:
            return 'Low gain up';
          case 2:
            return 'High gain up';
          case 3:
            return 'Low gain down';
          case 4:
            return 'High gain down';
          default:
            return 'Unknown';
        }
      },
    },
    0xa408: {
      name: 'Contrast',
      description: value => {
        switch (value) {
          case 0:
            return 'Normal';
          case 1:
            return 'Soft';
          case 2:
            return 'Hard';
          default:
            return 'Unknown';
        }
      },
    },
    0xa409: {
      name: 'Saturation',
      description: value => {
        switch (value) {
          case 0:
            return 'Normal';
          case 1:
            return 'Low saturation';
          case 2:
            return 'High saturation';
          default:
            return 'Unknown';
        }
      },
    },
    0xa40a: {
      name: 'Sharpness',
      description: value => {
        switch (value) {
          case 0:
            return 'Normal';
          case 1:
            return 'Soft';
          case 2:
            return 'Hard';
          default:
            return 'Unknown';
        }
      },
    },
    0xa40b: {
      name: 'DeviceSettingDescription',
      description: () => '[Raw device settings table data]',
    },
    0xa40c: {
      name: 'SubjectDistanceRange',
      description: value => {
        switch (value) {
          case 1:
            return 'Macro';
          case 2:
            return 'Close view';
          case 3:
            return 'Distant view';
          default:
            return 'Unknown';
        }
      },
    },
    0xa420: 'ImageUniqueID',
  },
  gps: {
    0x0000: {
      name: 'GPSVersionID',
      description: value => {
        const ref = value[1];
        const ref1 = value[3];

        if (
          value[0] === ref &&
          ref === 2 &&
          (value[2] === ref1 && ref1 === 0)
        ) {
          return 'Version 2.2';
        }

        return 'Unknown';
      },
    },
    0x0001: {
      name: 'GPSLatitudeRef',
      description: value => {
        switch (value.join('')) {
          case 'N':
            return 'North latitude';
          case 'S':
            return 'South latitude';
          default:
            return 'Unknown';
        }
      },
    },
    0x0002: {
      name: 'GPSLatitude',
      description: value => {
        return value[0] + value[1] / 60 + value[2] / 3600;
      },
    },
    0x0003: {
      name: 'GPSLongitudeRef',
      description: value => {
        switch (value.join('')) {
          case 'E':
            return 'East longitude';
          case 'W':
            return 'West longitude';
          default:
            return 'Unknown';
        }
      },
    },
    0x0004: {
      name: 'GPSLongitude',
      description: value => {
        return value[0] + value[1] / 60 + value[2] / 3600;
      },
    },
    0x0005: {
      name: 'GPSAltitudeRef',
      description: value => {
        switch (value) {
          case 0:
            return 'Sea level';
          case 1:
            return 'Sea level reference (negative value)';
          default:
            return 'Unknown';
        }
      },
    },
    0x0006: {
      name: 'GPSAltitude',
      description: value => {
        return `${value} m`;
      },
    },
    0x0007: {
      name: 'GPSTimeStamp',
      description: value => {
        const padZero = num => {
          // eslint-disable-next-line
          let i;

          return (
            (() => {
              let i2;
              let ref;
              const results = [];

              for (
                // eslint-disable-next-line
                i = i2 = 0, ref = 2 - ('' + Math.floor(num)).length;
                // eslint-disable-next-line
                0 <= ref ? i2 < ref : i2 > ref;
                // eslint-disable-next-line
                i = 0 <= ref ? ++i2 : --i2
              ) {
                results.push('0');
              }
              return results;
            })() + num
          );
        };
        return value.map(padZero).join(':');
      },
    },
    0x0008: 'GPSSatellites',
    0x0009: {
      name: 'GPSStatus',
      description: value => {
        switch (value.join('')) {
          case 'A':
            return 'Measurement in progress';
          case 'V':
            return 'Measurement Interoperability';
          default:
            return 'Unknown';
        }
      },
    },
    0x000a: {
      name: 'GPSMeasureMode',
      description: value => {
        switch (value.join('')) {
          case '2':
            return '2-dimensional measurement';
          case '3':
            return '3-dimensional measurement';
          default:
            return 'Unknown';
        }
      },
    },
    0x000b: 'GPSDOP',
    0x000c: {
      name: 'GPSSpeedRef',
      description: value => {
        switch (value.join('')) {
          case 'K':
            return 'Kilometers per hour';
          case 'M':
            return 'Miles per hour';
          case 'N':
            return 'Knots';
          default:
            return 'Unknown';
        }
      },
    },
    0x000d: 'GPSSpeed',
    0x000e: {
      name: 'GPSTrackRef',
      description: value => {
        switch (value.join('')) {
          case 'T':
            return 'True direction';
          case 'M':
            return 'Magnetic direction';
          default:
            return 'Unknown';
        }
      },
    },
    0x000f: 'GPSTrack',
    0x0010: {
      name: 'GPSImgDirectionRef',
      description: value => {
        switch (value.join('')) {
          case 'T':
            return 'True direction';
          case 'M':
            return 'Magnetic direction';
          default:
            return 'Unknown';
        }
      },
    },
    0x0011: 'GPSImgDirection',
    0x0012: 'GPSMapDatum',
    0x0013: {
      name: 'GPSDestLatitudeRef',
      description: value => {
        switch (value.join('')) {
          case 'N':
            return 'North latitude';
          case 'S':
            return 'South latitude';
          default:
            return 'Unknown';
        }
      },
    },
    0x0014: {
      name: 'GPSDestLatitude',
      description: value => {
        return value[0] + value[1] / 60 + value[2] / 3600;
      },
    },
    0x0015: {
      name: 'GPSDestLongitudeRef',
      description: value => {
        switch (value.join('')) {
          case 'E':
            return 'East longitude';
          case 'W':
            return 'West longitude';
          default:
            return 'Unknown';
        }
      },
    },
    0x0016: {
      name: 'GPSDestLongitude',
      description: value => {
        return value[0] + value[1] / 60 + value[2] / 3600;
      },
    },
    0x0017: {
      name: 'GPSDestBearingRef',
      description: value => {
        switch (value.join('')) {
          case 'T':
            return 'True direction';
          case 'M':
            return 'Magnetic direction';
          default:
            return 'Unknown';
        }
      },
    },
    0x0018: 'GPSDestBearing',
    0x0019: {
      name: 'GPSDestDistanceRef',
      description: value => {
        switch (value.join('')) {
          case 'K':
            return 'Kilometers';
          case 'M':
            return 'Miles';
          case 'N':
            return 'Knots';
          default:
            return 'Unknown';
        }
      },
    },
    0x001a: 'GPSDestDistance',
    0x001b: {
      name: 'GPSProcessingMethod',
      description: value => {
        if (value === 0) {
          return 'Undefined';
        }
        switch (value
          .slice(0, 8)
          .map(charCode => {
            return String.fromCharCode(charCode);
          })
          .join('')) {
          case 'ASCII\x00\x00\x00':
            return value
              .slice(8, value.length)
              .map(charCode => {
                return String.fromCharCode(charCode);
              })
              .join('');
          case 'JIS\x00\x00\x00\x00\x00':
            return '[JIS encoded text]';
          case 'UNICODE\x00':
            return '[Unicode encoded text]';
          case '\x00\x00\x00\x00\x00\x00\x00\x00':
            return '[Undefined encoding]';
          default:
            return '';
        }
      },
    },
    0x001c: {
      name: 'GPSAreaInformation',
      description: value => {
        if (value === 0) {
          return 'Undefined';
        }
        switch (value
          .slice(0, 8)
          .map(charCode => {
            return String.fromCharCode(charCode);
          })
          .join('')) {
          case 'ASCII\x00\x00\x00':
            return value
              .slice(8, value.length)
              .map(charCode => {
                return String.fromCharCode(charCode);
              })
              .join('');
          case 'JIS\x00\x00\x00\x00\x00':
            return '[JIS encoded text]';
          case 'UNICODE\x00':
            return '[Unicode encoded text]';
          case '\x00\x00\x00\x00\x00\x00\x00\x00':
            return '[Undefined encoding]';
          default:
            return '';
        }
      },
    },
    0x001d: 'GPSDateStamp',
    0x001e: {
      name: 'GPSDifferential',
      description: value => {
        switch (value) {
          case 0:
            return 'Measurement without differential correction';
          case 1:
            return 'Differential correction applied';
          default:
            return 'Unknown';
        }
      },
    },
  },
  interoperability: {
    0x0001: 'InteroperabilityIndex',
    0x0002: 'UnknownInteroperabilityTag0x0002',
    0x1001: 'UnknownInteroperabilityTag0x1001',
    0x1002: 'UnknownInteroperabilityTag0x1002',
  },
};
