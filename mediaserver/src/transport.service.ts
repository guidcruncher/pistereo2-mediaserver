import { HttpException, Injectable } from '@nestjs/common';

export class TransportService {
  constructor(private readonly baseUrl: string) {}

  public async request(
    method: string,
    url: string,
    options: any = {},
    body: any = {},
  ): Promise<any> {
    let defaults = {
      query: {},
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let opt = { ...defaults, ...options };
    const fullUrl = () => {
      let apiurl = this.baseUrl + url;
      const params = new URLSearchParams();
      for (const key in opt.query) {
        params.append(key, (opt.query[key] ?? '').toString());
      }
      if (params.size > 0) {
        return `${apiurl}?${params.toString()}`;
      }
      return apiurl;
    };

    const makeRequest = (fullUrl) => {
      if (body && ['PUT', 'POST'].includes(method.toUpperCase())) {
        return fetch(fullUrl, {
          method: method.toUpperCase(),
          headers: opt.headers,
          body: JSON.stringify(body),
        });
      }

      return fetch(fullUrl, {
        method: method,
        headers: opt.headers,
      });
    };

    const response = await makeRequest(fullUrl());

    if (!response.ok) {
      let txt = '';
      const resp: string = await response.text();
      try {
        const obj: any = JSON.parse(resp);
        txt = obj.error.message;
      } catch (err) {
        txt = resp;
      }

      throw new HttpException(txt, response.status);
    }

    if (response.status == 204) {
      return this.wrapResponse(response.statusText, response.status, {});
    }

    try {
      return this.wrapResponse(
        response.statusText,
        response.status,
        await response.json(),
      );
    } catch (err) {
      return this.wrapResponse(response.statusText, response.status, {});
    }
  }

  private wrapResponse(statusText: string, status: number, json) {
    if (json) {
      return {
        status: status,
        statusText: statusText,
        value: json,
      };
    }

    return { status: status, statusText: statusText };
  }
}
