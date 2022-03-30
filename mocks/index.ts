export default async function runMockServer(browser: boolean) {
  if (browser) {
    const { default: worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  } else {
    const { default: server } = await import('./server');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
  }
}
