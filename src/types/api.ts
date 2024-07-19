// types/api.ts

import { NextApiRequest, NextApiResponse } from 'next';

export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phoneNumber?: string;
  }
}

export type ApiResponse<T = any> = NextApiResponse<{
  success: boolean;
  data?: T;
  error?: string;
}>;