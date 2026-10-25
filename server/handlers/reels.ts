import { reelsListHandler, reelsSaveHandler } from '../createApp';
import { runNodeHandler } from './http';

export function GET(request: Request) {
  return runNodeHandler(request, reelsListHandler);
}

export function PUT(request: Request) {
  return runNodeHandler(request, reelsSaveHandler);
}
