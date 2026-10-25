import { reelsLogoutHandler } from '../createApp';
import { runNodeHandler } from './http';

export function POST(request: Request) {
  return runNodeHandler(request, reelsLogoutHandler);
}
