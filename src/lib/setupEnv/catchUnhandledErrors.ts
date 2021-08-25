/* eslint-disable no-console */

export const catchUnhandledErrors = (): void => {
  if (typeof window === 'undefined') {
    process.on('unhandledRejection', (err) => {
      console.error('>>> Unhandled Rejection in Next Server (this should never happen)');
      console.error(err);
    });

    process.on('uncaughtException', (err) => {
      console.error('>>> Uncaught Exception in Next Server (this should never happen)');
      console.error(err);
    });
  }
};
