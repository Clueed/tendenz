import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class RateLimitedAxios {
  private axiosInstance: AxiosInstance;
  private requestQueue: (() => Promise<any>)[] = [];
  private isRequesting: boolean = false;

  constructor() {
    this.axiosInstance = axios.create();
  }

  public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      const wrappedRequest = async () => {
        try {
          const response = await this.axiosInstance.request<T>(config);
          resolve(response);
        } catch (error) {
          reject(error);
        } finally {
          this.isRequesting = false;
          this.processQueue();
        }
      };

      this.requestQueue.push(wrappedRequest);
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.isRequesting || this.requestQueue.length === 0) return;

    this.isRequesting = true;
    const nextRequest = this.requestQueue.shift();
    nextRequest && nextRequest();
  }
}
