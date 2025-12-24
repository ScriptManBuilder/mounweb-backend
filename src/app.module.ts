// Импорты из NestJS
import { Module } from '@nestjs/common'; // Декоратор для создания модуля
import { ConfigModule } from '@nestjs/config'; // Модуль для работы с .env файлом
import { APP_GUARD } from '@nestjs/core'; // Токен для глобальных guard'ов
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'; // Модуль для rate limiting
import { AppController } from './app.controller'; // Основной контроллер приложения
import { AppService } from './app.service'; // Основной сервис приложения
import { ContactModule } from './contact/contact.module'; // Наш модуль контактов

/**
 * Главный модуль приложения - корневой модуль, который объединяет все остальные модули
 * NestJS начинает работу именно с этого модуля
 */
@Module({
  imports: [
    // ConfigModule.forRoot() - настраивает глобальный доступ к переменным окружения
    ConfigModule.forRoot({
      isGlobal: true, // Делает ConfigService доступным во всех модулях без повторного импорта
    }),
    // ThrottlerModule - модуль для защиты от спама/DDoS атак
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time to live - 60 секунд (время жизни счетчика запросов)
      limit: 10, // Максимум 10 запросов за ttl период (по умолчанию для всех эндпоинтов)
    }]),
    ContactModule, // Подключаем наш модуль контактов
  ],
  controllers: [
    AppController, // Основной контроллер (обычно для корневых маршрутов)
  ],
  providers: [
    AppService, // Основной сервис приложения
    // Регистрируем ThrottlerGuard глобально для всего приложения
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  // Пустой класс - вся конфигурация в декораторе @Module()
}
