#!/usr/bin/env node

import { clientSendMock, httpRequest } from "../cluster/client.mjs";

clientSendMock(httpRequest.bind(null, "http://127.0.0.1:8081", "spawn"));