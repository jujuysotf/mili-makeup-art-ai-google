import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: {
    health: 'server/handlers/health.ts',
    'calendar/status': 'server/handlers/calendarStatus.ts',
    'calendar/availability': 'server/handlers/calendarAvailability.ts',
    'calendar/book': 'server/handlers/calendarBook.ts',
    reels: 'server/handlers/reels.ts',
    'reels/login': 'server/handlers/reelsLogin.ts',
    'reels/logout': 'server/handlers/reelsLogout.ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  outdir: 'api',
});
