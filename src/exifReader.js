import tagNames from './exifReader/tagNames';

export default class ExifReader {
  constructor() {
    this.MIN_DATA_BUFFER_LENGTH = 2;
    this.JPEG_ID_SIZE = 2;
    this.JPEG_ID = 0xffd8;
    this.APP_MARKER_SIZE = 2;
    this.APP0_MARKER = 0xffe0;
    this.APP1_MARKER = 0xffe1;
    this.APP15_MARKER = 0xffef;
    this.APP_ID_OFFSET = 4;
    this.BYTES_Exif = 0x45786966;
    this.TIFF_HEADER_OFFSET = 10;
    this.BYTE_ORDER_BIG_ENDIAN = 0x4949;
    this.BYTE_ORDER_LITTLE_ENDIAN = 0x4d4d;
    this.tagNames = tagNames;

    this.tagTypes = {
      BYTE: 1,
      ASCII: 2,
      SHORT: 3,
      LONG: 4,
      RATIONAL: 5,
      UNDEFINED: 7,
      SLONG: 9,
      SRATIONAL: 10,
    };

    this.typeSizes = {
      1: 1,
      2: 1,
      3: 2,
      4: 4,
      5: 8,
      7: 1,
      9: 4,
      10: 8,
    };

    this.getTagValueAt = {
      1: offset => this.getByteAt(offset),
      2: offset => this.getAsciiAt(offset),
      3: offset => this.getShortAt(offset),
      4: offset => this.getLongAt(offset),
      5: offset => this.getRationalAt(offset),
      7: offset => this.getUndefinedAt(offset),
      9: offset => this.getSlongAt(offset),
      10: offset => this.getSrationalAt(offset),
    };
    this.tiffHeaderOffset = 0;
  }

  load(data) {
    this.loadView(new DataView(data));
  }

  loadView(dataView) {
    this.dataView = dataView;
    this.tags = {};
    this.checkImageHeader();
    this.readTags();
    return (this.dataView = null);
  }

  hasExifData() {
    return this.tiffHeaderOffset !== 0;
  }

  isAppMarker(dataView, appMarkerPosition) {
    const appMarker = dataView.getUint16(appMarkerPosition, false);
    return appMarker >= this.APP0_MARKER && appMarker <= this.APP15_MARKER;
  }

  setByteOrder() {
    if (
      this.dataView.getUint16(this.tiffHeaderOffset) ===
      this.BYTE_ORDER_BIG_ENDIAN
    ) {
      return (this.littleEndian = true);
    } else if (
      this.dataView.getUint16(this.tiffHeaderOffset) ===
      this.BYTE_ORDER_LITTLE_ENDIAN
    ) {
      return (this.littleEndian = false);
    }

    throw new Error('Illegal byte order value. Faulty image.');
  }

  getIfdOffset() {
    return this.tiffHeaderOffset + this.getLongAt(this.tiffHeaderOffset + 4);
  }

  readExifIfd() {
    console.log('this.tags', this.tags);
    if (this.tags['Exif IFD Pointer'] != null) {
      const ifdOffset =
        this.tiffHeaderOffset + this.tags['Exif IFD Pointer'].value;
      return this.readIfd('exif', ifdOffset);
    }
    return undefined;
  }

  read0thIfd() {
    const ifdOffset = this.getIfdOffset();
    return this.readIfd('0th', ifdOffset);
  }

  isApp1ExifMarker(dataView, appMarkerPosition) {
    return (
      dataView.getUint16(appMarkerPosition, false) === this.APP1_MARKER &&
      dataView.getUint32(appMarkerPosition + this.APP_ID_OFFSET, false) ===
        this.BYTES_Exif &&
      dataView.getUint8(appMarkerPosition + this.APP_ID_OFFSET + 4, false) ===
        0x00
    );
  }

  readInteroperabilityIfd() {
    if (this.tags['Interoperability IFD Pointer'] != null) {
      const ifdOffset =
        this.tiffHeaderOffset + this.tags['Interoperability IFD Pointer'].value;
      return this.readIfd('interoperability', ifdOffset);
    }
    return undefined;
  }

  readGpsIfd() {
    if (this.tags['GPS Info IFD Pointer'] != null) {
      const ifdOffset =
        this.tiffHeaderOffset + this.tags['GPS Info IFD Pointer'].value;
      return this.readIfd('gps', ifdOffset);
    }
    return undefined;
  }

  readIfd(ifdType, offset) {
    const numberOfFields = this.getShortAt(offset);
    let tag;
    let i;
    const results = [];

    // eslint-disable-next-line
    offset += 2;

    for (
      i = 0;
      !numberOfFields ? i < numberOfFields : i > numberOfFields;
      // eslint-disable-next-line
      !numberOfFields ? ++i : --i
    ) {
      tag = this.readTag(ifdType, offset);
      // eslint-disable-next-line
      if (tag !== undefined) {
        this.tags[tag.name] = {
          value: tag.value,
          description: tag.description,
        };
      }
      // eslint-disable-next-line
      results.push((offset += 12));
    }
    return results;
  }

  checkImageHeader() {
    if (
      this.dataView.byteLength < this.MIN_DATA_BUFFER_LENGTH ||
      this.dataView.getUint16(0, false) !== this.JPEG_ID
    ) {
      throw new Error('Invalid image format');
    }

    this.parseAppMarkers(this.dataView);

    if (!this.hasExifData()) {
      throw new Error('No Exif data');
    }
  }

  parseAppMarkers(dataView) {
    let appMarkerPosition;
    let fieldLength;
    const results = [];

    appMarkerPosition = this.JPEG_ID_SIZE;
    while (true) {
      if (dataView.byteLength < appMarkerPosition + this.APP_ID_OFFSET + 5) {
        break;
      }
      if (this.isApp1ExifMarker(dataView, appMarkerPosition)) {
        fieldLength = dataView.getUint16(
          appMarkerPosition + this.APP_MARKER_SIZE,
          false,
        );
        this.tiffHeaderOffset = appMarkerPosition + this.TIFF_HEADER_OFFSET;
      } else if (this.isAppMarker(dataView, appMarkerPosition)) {
        fieldLength = dataView.getUint16(
          appMarkerPosition + this.APP_MARKER_SIZE,
          false,
        );
      } else {
        break;
      }
      results.push((appMarkerPosition += this.APP_MARKER_SIZE + fieldLength));
    }
    return results;
  }

  getTagValue(offset, type, count) {
    let tagValue;
    console.log('oo');
    const valueGetter = () => {
      let i;
      const results = [];

      // eslint-disable-next-line
      for (i = 0; !count ? i < count : i > count; !count ? ++i : --i) {
        console.log('i', i);
        tagValue = this.getTagValueAt[type](offset);
        // eslint-disable-next-line
        offset += this.typeSizes[type];
        results.push(tagValue);
      }
      return results;
    };

    const value = valueGetter();
    let returnValue;

    console.log('value', value);

    if (value.length === 1) {
      returnValue = value[0];
    } else if (type === this.tagTypes['ASCII']) {
      returnValue = this.getAsciiValue(value);
    }
    return returnValue;
  }

  getAsciiValue(charArray) {
    var charCode, newCharArray;

    return (newCharArray = (function() {
      var _i, _len, _results;

      _results = [];
      for (_i = 0, _len = charArray.length; _i < _len; _i++) {
        charCode = charArray[_i];
        _results.push(String.fromCharCode(charCode));
      }
      return _results;
    })());
  }

  readTags() {
    this.setByteOrder();
    this.read0thIfd();
    this.readExifIfd();
    this.readGpsIfd();
    return this.readInteroperabilityIfd();
  }

  splitNullSeparatedAsciiString(string) {
    let character;
    let i;
    let i2;
    let len;

    const tagValue = [];

    i = 0;

    // eslint-disable-next-line
    for (i2 = 0, len = string.length; i2 < len; i2++) {
      character = string[i2];
      if (character === '\x00') {
        // eslint-disable-next-line
        i++;

        // eslint-disable-next-line
        continue;
      }
      if (tagValue[i] == null) {
        tagValue[i] = '';
      }
      tagValue[i] += character;
    }
    return tagValue;
  }

  getByteAt(offset) {
    return this.dataView.getUint8(offset);
  }

  getAsciiAt(offset) {
    return this.dataView.getUint8(offset);
  }
  getShortAt(offset) {
    return this.dataView.getUint16(offset, this.littleEndian);
  }
  getLongAt(offset) {
    return this.dataView.getUint32(offset, this.littleEndian);
  }
  getRationalAt(offset) {
    return this.getLongAt(offset) / this.getLongAt(offset + 4);
  }
  getUndefinedAt(offset) {
    return this.getByteAt(offset);
  }
  getSlongAt(offset) {
    return this.dataView.getInt32(offset, this.littleEndian);
  }
  getSrationalAt(offset) {
    return this.getSlongAt(offset) / this.getSlongAt(offset + 4);
  }

  getAllTags() {
    return this.tags;
  }
  deleteTag(name) {
    return delete this.tags[name];
  }

  getTagDescription(name) {
    if (this.tags[name] != null) {
      return this.tags[name].description;
    }

    return undefined;
  }

  readTag(ifdType, offset) {
    let tagDescription;
    let tagName;
    let tagValue;
    let tagValueOffset;

    const tagCode = this.getShortAt(offset);
    const tagType = this.getShortAt(offset + 2);
    const tagCount = this.getLongAt(offset + 4);

    if (this.typeSizes[tagType] === undefined) {
      return undefined;
    }
    if (this.typeSizes[tagType] * tagCount <= 4) {
      tagValue = this.getTagValue(offset + 8, tagType, tagCount);
    } else {
      tagValueOffset = this.getLongAt(offset + 8);
      tagValue = this.getTagValue(
        this.tiffHeaderOffset + tagValueOffset,
        tagType,
        tagCount,
      );
    }
    if (tagType === this.tagTypes['ASCII']) {
      tagValue = this.splitNullSeparatedAsciiString(tagValue);
    }
    if (this.tagNames[ifdType][tagCode] != null) {
      if (
        this.tagNames[ifdType][tagCode]['name'] != null &&
        this.tagNames[ifdType][tagCode]['description'] != null
      ) {
        tagName = this.tagNames[ifdType][tagCode]['name'];
        tagDescription = this.tagNames[ifdType][tagCode]['description'](
          tagValue,
        );
      } else {
        tagName = this.tagNames[ifdType][tagCode];
        if (tagValue instanceof Array) {
          tagDescription = tagValue.join(', ');
        } else {
          tagDescription = tagValue;
        }
      }
      return {
        name: tagName,
        value: tagValue,
        description: tagDescription,
      };
    }

    return {
      name: `undefined-${tagCode}`,
      value: tagValue,
      description: tagValue,
    };
  }
}
