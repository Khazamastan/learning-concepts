export class ApiClient {
  constructor({ baseURL, headers = {}, fetchImpl = fetch } = {}) {
    if (!baseURL) {
      throw new Error("ApiClient requires a baseURL");
    }
    this.baseURL = baseURL.replace(/\/+$/, "");
    this.defaultHeaders = headers;
    this.fetchImpl = fetchImpl;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  useRequest(interceptor) {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter((fn) => fn !== interceptor);
    };
  }

  useResponse(interceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter((fn) => fn !== interceptor);
    };
  }

  async request(path, options = {}) {
    const requestConfig = await this.applyRequestInterceptors({
      method: "GET",
      headers: { ...this.defaultHeaders },
      ...options,
    });

    if (requestConfig.body && typeof requestConfig.body === "object" && !(requestConfig.body instanceof FormData)) {
      requestConfig.headers["Content-Type"] = "application/json";
      requestConfig.body = JSON.stringify(requestConfig.body);
    }

    const response = await this.fetchImpl(`${this.baseURL}${path}`, requestConfig);
    const enriched = await this.applyResponseInterceptors(response);
    if (!enriched.ok) {
      const message = await safeJson(enriched);
      throw new Error(message?.error || enriched.statusText || "API error");
    }
    return safeJson(enriched);
  }

  get(path, config = {}) {
    return this.request(path, { ...config, method: "GET" });
  }

  post(path, body, config = {}) {
    return this.request(path, { ...config, method: "POST", body });
  }

  async applyRequestInterceptors(config) {
    let current = config;
    for (const interceptor of this.requestInterceptors) {
      current = await interceptor(current);
    }
    return current;
  }

  async applyResponseInterceptors(response) {
    let current = response;
    for (const interceptor of this.responseInterceptors) {
      current = await interceptor(current);
    }
    return current;
  }
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    return { raw: text };
  }
}
