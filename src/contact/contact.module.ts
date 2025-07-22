// Импорты из NestJS
import { Module } from '@nestjs/common'; // Декоратор для создания модуля
import { ConfigModule } from '@nestjs/config'; // Модуль для работы с конфигурацией (.env)
import { ContactController } from './contact.controller'; // Наш контроллер
import { ContactService } from './contact.service'; // Наш сервис

/**
 * @Module() - декоратор, который определяет модуль в NestJS
 * Модуль - это способ организации кода, группировка связанных компонентов
 * 
 * Структура модуля:
 * - imports: другие модули, которые нужны этому модулю
 * - controllers: контроллеры, которые обрабатывают HTTP запросы
 * - providers: сервисы и другие провайдеры, которые можно внедрять
 * - exports: что этот модуль экспортирует для других модулей (здесь не используется)
 */
@Module({
  imports: [
    ConfigModule, // Импортируем ConfigModule для доступа к переменным окружения
  ],
  controllers: [
    ContactController, // Регистрируем наш контроллер
  ],
  providers: [
    ContactService, // Регистрируем наш сервис
  ],
})
export class ContactModule {
  // Пустой класс - вся логика определяется в декораторе @Module()
}
