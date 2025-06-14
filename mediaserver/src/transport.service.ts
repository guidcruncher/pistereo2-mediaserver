import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class TransportService {
  constructor(private readonly baseUrl: string) {}

  public async request(
    method: string,
    url: string,
    options: any,
  ): Promise<any> {
    let defaults = {
      body: (any = undefined),
      query: (Record<string, any> = {}),
      header: (Record<string, string> = {
        'Content-Type': 'application/json',
      }),
    };
    let opt = { ...defaults, ...options };

    const fullUrl = () => {
      let apiurl = this.baseUrl + url;
      const params = new URLSearchParams();
      for (const key in opt.query) {
        params.append(key, (opt.query[key] ?? '').toString());
      }
      if (params.length > 0) {
        return `${fullUrl}?${params.toString()}`;
      }
      return fullUrl;
    };

    const makeRequest = () => {
      if (opt.body && ['PUT', 'POST'].includes(method.toUpperCase())) {
        return fetch(fullUrl(), {
          method: method.toUpperCase(),
          headers: opt.headers,
          body: JSON.stringify(opt.body),
        });
      }

      return fetch(fullUrl(), {
        method: method,
        headers: opt.headers,
      });
    };

    const response = await makeRequest();

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
      this.logger.error('Error occured making http request', err);
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
