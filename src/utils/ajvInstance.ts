import ajv from 'ajv';
import addFormat from 'ajv-formats'

const ajvInstance = new ajv({allErrors: true, strict: false});
addFormat(ajvInstance);

export default ajvInstance;