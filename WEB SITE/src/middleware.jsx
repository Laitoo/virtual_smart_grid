import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: [
    event => {
      console.log("src/middleware.jsx", event.request.url);
    }
  ]
});