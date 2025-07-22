// Импорты из NestJS
import { Module } from '@nestjs/common'; // Декоратор для создания модуля
import { ConfigModule } from '@nestjs/config'; // Модуль для работы с .env файлом
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
    ContactModule, // Подключаем наш модуль контактов
  ],
  controllers: [
    AppController, // Основной контроллер (обычно для корневых маршрутов)
  ],
  providers: [
    AppService, // Основной сервис приложения
  ],
})
export class AppModule {
  // Пустой класс - вся конфигурация в декораторе @Module()
}
