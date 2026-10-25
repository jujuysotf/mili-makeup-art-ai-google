type NodeHandler = (req: any, res: any) => unknown;

export async function runNodeHandler(request: Request, handler: NodeHandler) {
  const url = new URL(request.url);
  let statusCode = 200;
  let payload: unknown = null;
  const responseHeaders = new Headers();

  const req = {
    url: `${url.pathname}${url.search}`,
    query: Object.fromEntries(url.searchParams.entries()),
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: undefined as unknown,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      req.body = await request.json();
    } catch {
      req.body = {};
    }
  }

  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(body: unknown) {
      payload = body;
    },
    setHeader(name: string, value: string) {
      responseHeaders.set(name, value);
    },
  };

  await handler(req, res);
  responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(payload), { status: statusCode, headers: responseHeaders });
}
