import http from "http"
import { app } from "./routes/routes.js"
const PORT = 5000


http.createServer(app).listen(PORT || 5001, () => console.log('server running on port ', PORT || 5001))
.on("error", e => console.error('server failed to run, error: ', e))