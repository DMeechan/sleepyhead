import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleSecurity
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleCors,
  handleSecurity,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs
];
