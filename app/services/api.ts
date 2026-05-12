export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiService {
  protected get token(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  protected set token(value: string | null) {
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem('token', value);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  protected async fetchData<T>(
    route: string,
    init: RequestInit = {},
  ): Promise<ApiResponse<T> | null> {
    let reqInit: RequestInit = {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    };

    if (this.token) {
      reqInit.headers = {
        ...reqInit.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI || "http://localhost"}:${import.meta.env.VITE_API_PORT || "8080"}/${route}`,
        reqInit,
      );
      
      const data: ApiResponse<T> = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
