import {
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor {
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next) {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          url: context.getArgs()[0].originalUrl,
          method: context.getArgs()[0].method,
          requestDuration: `${Date.now() - now} ms`,
        });
      }),
      catchError((error) => {
        this.logger.error({
          url: context.getArgs()[0].originalUrl,
          method: context.getArgs()[0].method,
          status: error?.message || error?.detail || 'Something went wrong',
          message: error?.response?.message,
        });

        return throwError(
          () =>
            new HttpException(
              {
                message: error?.response?.message,
                timestamp: new Date().toISOString(),
                route: context.getArgs()[0].originalUrl,
                method: context.getArgs()[0].method,
              },
              error.response.statusCode || 500,
            ),
        );
      }),
    );
  }
}
